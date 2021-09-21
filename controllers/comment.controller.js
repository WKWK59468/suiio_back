const session = require('express-session');
const commentModels = require('../models/comment.model');
const myFunction = require('../myFunction');

class Comment {
    add = (req, res) => {
        const params = req.params;
        const tables = params.tables;
        const body = req.body;
        const content = body.content;
        const tableID = body.tableID;

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
            "isHide": false,
            "sID": req.session.sID
        }

        myFunction.check_session(req).then(() => {
            if (req.session.permission !== '組織成員') {
                commentModels.addComment(comment).then(() => {
                    commentModels.searchID().then((commentID) => {
                        commentModels.addTables(tables, tableID, commentID).then(() => {
                            res.status(200).json({ "result": true });
                            return new Promise((resolve, reject) => {});
                        }).catch((err) => {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => {});
                        });
                    }).catch((err) => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    });
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                });
            } else {
                res.status(500).json({ "result": "Permission denied." });
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        });
    }
    fetchByID = (req, res) => {
        const params = req.params;
        const tables = params.tables;
        const tableID = params.tableID;

        myFunction.check_session(req).then(() => {

            commentModels.fetchByID(tables, tableID).then((result) => {
                res.status(200).json(result);
                return new Promise((resolve, reject) => {});
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {});
            });

        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        });
    }
    fetchByMember = (req, res) => {
        const sID = req.session.sID;

        myFunction.check_session(req).then(() => {

            commentModels.fetchByMember(sID).then((result) => {
                res.status(200).json(result);
                return new Promise((resolve, reject) => {});
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {});
            })

        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        })
    }
    fetchAll = (req, res) => {
        myFunction.check_session(req).then(() => {
            const tables = ["account", "statement", "conference"];
            let json = {};
            let tableID;

            tables.forEach(async(element, index, array) => {
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
                                    return new Promise((resolve, reject) => {});
                                }
                            }
                        }).catch((err) => {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => {});
                        });
                    });
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                });
            })
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        });
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
        myFunction.check_session(req).then(() => {
            commentModels.searchSID(commentID).then((ID) => {
                if (ID == req.session.sID) {

                    commentModels.update(comment).then(() => {
                        res.status(200).json({ "result": true });
                        return new Promise((resolve, reject) => {});
                    }).catch((err) => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    });

                } else {
                    res.status(500).json({ "result": "Permission denied." });
                    return new Promise((resolve, reject) => {});
                }
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {});
            })
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        });
    }
    delete = (req, res) => {
        const body = req.body;
        const commentID = body.commentID;

        myFunction.check_permission(req).then(() => {
            if (req.session.permission !== '組織成員') {
                commentModels.delete(commentID, 1).then(() => {
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => {});
                }).catch((err) => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                })
            } else {
                res.status(500).json({ "result": "Permission denied." });
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        })
    }
}

module.exports = new Comment();