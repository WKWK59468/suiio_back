const session = require('express-session');
const commentModels = require('../models/comment.model');
const myFunction = require('../myFunction');

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.date.getFullYear();
        const Month = ((element.date.getMonth() + 1) < 10) ? "0" + (element.date.getMonth() + 1) : (element.date.getMonth() + 1);
        const Date = (element.date.getDate() < 10) ? "0" + element.date.getDate() : element.date.getDate();
        element.date = Year + "-" + Month + "-" + Date;
    });
    return res;
}

class Comment {
    add = (req, res) => {
        const params = req.params;
        const tables = params.tables;
        const body = req.body;
        const content = body.content;
        const tableID = body.tableID;
        const sID = body.sID;
        let isHide;
        if (body.isHide == true || body.isHide == false) {
            isHide = body.isHide;
        } else {
            res.status(400).json({ "result": "isHide Error." });
            return new Promise((resolve, reject) => { });
        }

        const time = new Date();
        const year = time.getFullYear()
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();

        const comment = {
            "date": year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s,
            "content": content,
            "status": 0,
            "isHide": isHide,
            "sID": sID
        }

        if (tables == "account" || tables == "statement" || tables == "conference") {
            commentModels.addComment(comment).then(() => {
                commentModels.searchID().then((commentID) => {
                    commentModels.addTables(tables, tableID, commentID).then(() => {
                        res.status(201).json({ "result": true });
                        return new Promise((resolve, reject) => { });
                    }).catch((err) => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    });
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => { });
                });
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            });
        } else {
            res.status(404).json({ "result": "No this table." });
            return new Promise((resolve, reject) => { });
        }

    }
    fetchByID = (req, res) => {
        const params = req.params;
        const tables = params.tables;
        const tableID = params.tableID;


        if (tables == "account" || tables == "statement" || tables == "conference") {
            commentModels.fetchByID(tables, tableID).then((result) => {
                res.status(200).json(result);
                return new Promise((resolve, reject) => { });
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            });
        } else {
            res.status(404).json({ "result": "No this table." });
            return new Promise((resolve, reject) => { });
        }

    }
    fetchByMember = (req, res) => {
        const sID = req.params.sID;

        commentModels.fetchByMember(sID).then((result) => {
            result = dateFormat(result);
            res.status(200).json(result);
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            if(err=="There is nothing to show."){
                res.status(404).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }else{
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
        })

    }
    fetchAll = (req, res) => {

        const tables = ["account", "statement", "conference"];
        let json = {};
        let tableID;

        tables.forEach((element, index, array) => {
            let arr = [];
            commentModels.fetch(element).then((table) => {
                table.forEach((element2, index2, array2) => {
                    if (Object.keys(element2) == "accountID") {
                        tableID = element2.accountID;
                    }
                    if (Object.keys(element2) == "statementID") {
                        tableID = element2.statementID;
                    }
                    if (Object.keys(element2) == "conferenceID") {
                        tableID = element2.conferenceID;
                    }

                    commentModels.fetchByID(element, tableID).then((result) => {
                        arr.push(result);
                        json[element] = arr;
                        if (index == array.length - 1) {
                            if (index2 == array2.length - 1) {
                                res.status(200).json(json);
                                return new Promise((resolve, reject) => { });
                            }
                        }
                    }).catch((err) => {
                        if (err == "Comment does not exist.") {
                            res.status(404).json({ "result": err });
                            return new Promise((resolve, reject) => { });
                        } else {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => { });
                        }
                    });
                });
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            });
        })

    }
    update = (req, res) => {
        const time = new Date();
        const year = time.getFullYear()
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();

        const body = req.body;
        const commentID = body.commentID;
        const content = body.content;
        const comment = {
            "commentID": commentID,
            "date": year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s,
            "content": content,
            "status": 1,
        }

        commentModels.searchSID(commentID).then((ID) => {
            if (ID == req.body.sID) {

                commentModels.update(comment).then(() => {
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => { });
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => { });
                });

            } else {
                res.status(403).json({ "result": "Permission denied." });
                return new Promise((resolve, reject) => { });
            }
        }).catch((error) => {
            if (error == "comment not found.") {
                res.status(404).json({ "result": error });
                return new Promise((resolve, reject) => { });
            } else {
                res.status(500).json({ "result": error });
                return new Promise((resolve, reject) => { });
            }
        })

    }
    delete = (req, res) => {
        const body = req.body;
        const commentID = body.commentID;

        commentModels.searchSID(commentID).then((sID) => {
            if (req.body.permission !== '組織成員' || req.body.sID == sID) {
                commentModels.delete(commentID).then(() => {
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => { });
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => { });
                })
            } else {
                res.status(403).json({ "result": "Permission denied." });
                return new Promise((resolve, reject) => { });
            }
        }).catch((error) => {
            if (error == "comment not found.") {
                res.status(404).json({ "result": error });
                return new Promise((resolve, reject) => { });
            } else {
                res.status(500).json({ "result": error });
                return new Promise((resolve, reject) => { });
            }
        })

    }
}

module.exports = new Comment();