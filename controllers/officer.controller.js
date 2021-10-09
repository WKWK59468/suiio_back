const Officer = require('../models/officer.model');
const myFunction = require('../myFunction');

const check_sID = (sID) => {
    if (sID.length == 10) {
        const sIDArray = sID.split("");
        if (sIDArray[0] == "1" || sIDArray[0] == "2" || sIDArray[0] == "3" || sIDArray[0] == "4") {
            if (sIDArray[1] == "1" || sIDArray[1] == "2" || sIDArray[1] == "3" || sIDArray[1] == "4" || sIDArray[1] == "6" || sIDArray[1] == "7" || sIDArray[1] == "8") {
                switch (sIDArray[5]) {
                    case "0":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4" || sIDArray[6] == "5" || sIDArray[6] == "6" || sIDArray[6] == "7" || sIDArray[6] == "8") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "2":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "3":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "4":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "5":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    default:
                        return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

const sendErrorMsg = (res, statusCode, error) => {
    if (!error)
        error = "Some error occurred in the api of officer.";
    if (typeof (error) == "object")
        error = error.message;
    res.status(statusCode).send(error);
    return console.error(error);
};

// add officer
exports.add = (req, res) => {
    myFunction.check_permission(req).then((permission) => {
        if (permission == '組織負責人') {
            const sID = req.body.sID;
            if (check_sID(sID)) {
                Officer.check(sID, (error, results) => {
                    if (error || !results.length) {
                        res.status(500).json({ "result": error })
                        return new Promise((resolve, reject) => { });
                    }
                    if (results[0].total == "0") {
                        res.status(404).json({ "result": "Member Not Found" })
                        return new Promise((resolve, reject) => { });
                    }
                    if (results[0].total == "1") {
                        Officer.add(req, (error, results) => {
                            if (error || !results.affectedRows)
                                return sendErrorMsg(res, 500, error);
                            res.status(201).send("Add Officer Successfully.");
                            return new Promise((resolve, reject) => { });
                        });
                    }
                });
            } else {
                res.status(400).json({ "result": "sID format error" });
                return new Promise((resolve, reject) => { });
            }
        } else {
            res.status(403).json({ 'result': 'Permission denied.' })
            return new Promise((resolve, reject) => { });
        }
    }).catch(() => {
        res.status(401).json({ 'result': 'Not Login' })
        return new Promise((resolve, reject) => { });
    })

};

// delete officer
exports.delete = (req, res) => {
    myFunction.check_permission(req).then((permission) => {
        if (permission == '組織負責人') {
            const sID = req.body.sID;
            if (check_sID(sID)) {
                Officer.delete(req, (error, results) => {
                    if (error)
                        return sendErrorMsg(res, 500, error);
                    if (!results.affectedRows)
                        return sendErrorMsg(res, 404, "The condition is not exist.");
                    res.status(200).send("Delete Officer Successfully.");
                }).catch(error => sendErrorMsg(res, 500, error));
            } else {
                res.status(400).json({ "result": "sID format error" });
                return new Promise((resolve, reject) => { });
            }
        } else {
            res.status(403).json({ 'result': 'Permission denied.' })
            return new Promise((resolve, reject) => { });
        }
    }).catch(() => {
        res.status(401).json({ 'result': 'Not Login' })
        return new Promise((resolve, reject) => { });
    })


};

/***************
 *    fetch    *
 ***************/

// fetch all officer
exports.fetchAll = (req, res) => {

    Officer.fetchAll(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.status(200).send(results);
        return new Promise((resolve, reject) => { });
    });

};

// fetch by position
exports.fetchByPosition = (req, res) => {

    Officer.fetchByPosition(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.status(200).send(results);
        return new Promise((resolve, reject) => { });
    });

};

// fetch by authority
exports.fetchByPermission = (req, res) => {

    Officer.fetchByPermission(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.status(200).send(results);
        return new Promise((resolve, reject) => { });
    });

};

/****************
 *    update    *
 ****************/

// update officer by position
exports.updateOfficer = (req, res) => {
    myFunction.check_permission(req).then((permission) => {
        if (permission == '組織負責人') {
            const sID = req.body.sID;
            if (check_sID(sID)) {
                Officer.check(sID, (error, results) => {
                    if (error || !results.length) {
                        res.status(500).json({ "result": error })
                        return new Promise((resolve, reject) => { });
                    }
                    if (results[0].total == "0") {
                        res.status(404).json({ "result": "Member Not Found" })
                        return new Promise((resolve, reject) => { });
                    }
                    if (results[0].total == "1") {
                        Officer.updateOfficer(req, (error, results) => {
                            if (error)
                                return sendErrorMsg(res, 500, error);
                            if (!results.affectedRows)
                                return sendErrorMsg(res, 404, "The condition is not exist.");
                            res.status(200).json({ "result": true });
                            return new Promise((resolve, reject) => { });
                        });
                    }
                });
            } else {
                res.status(400).json({ "result": "sID format error" });
                return new Promise((resolve, reject) => { });
            }
        } else {
            res.status(403).json({ 'result': 'Permission denied.' })
            return new Promise((resolve, reject) => { });
        }
    }).catch(() => {
        res.status(401).json({ 'result': 'Not Login' })
        return new Promise((resolve, reject) => { });
    })
};

// update permission by position
exports.updatePermission = (req, res) => {
    myFunction.check_permission(req).then((permission) => {
        if (permission == '組織負責人') {
            const organize = req.body.organize;
            const finance = req.body.finance;
            const conference = req.body.conference;
            const data = [organize, finance, conference];
            let arr = [];
            let arr2 = [];
            let cnt = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    if (data[i][j]) {
                        arr.push(data[i][j]);
                        arr2.push(data[i][j]);
                    }
                }
            }
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr2.length; j++) {
                    if (arr[i] == arr2[j]) {
                        cnt += 1;
                    }
                }
            }
            if (cnt > 0) {
                res.status(500).json({ "result": "Permission cannot be repeated" });
                return new Promise((resolve, reject) => { });
            } else {
                Officer.updatePermission(req, (error, results) => {
                    if (error)
                        return sendErrorMsg(res, 500, error);
                    if (!results.affectedRows)
                        return sendErrorMsg(res, 404, "The condition is not exist.");
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => { });
                });
            }
        } else {
            res.status(403).json({ 'result': 'Permission denied.' })
            return new Promise((resolve, reject) => { });
        }
    }).catch(() => {
        res.status(401).json({ 'result': 'Not Login' })
        return new Promise((resolve, reject) => { });
    })

};