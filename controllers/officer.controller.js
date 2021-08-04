const { check } = require('../models/officer.model');
const officerModel = require('../models/officer.model');
const Officer = require('../models/officer.model');

let check_sID = (sID) => {
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

let sendErrorMsg = (res, statusCode, error) => {
    if (!error)
        error = "Some error occurred in the api of officer.";
    if (typeof(error) == "object")
        error = error.message;
    res.status(statusCode).send(error);
    return console.error(error);
};

// add officer
exports.add = (req, res) => {
    const sID = req.body.sID;
    if (check_sID(sID)) {
        Officer.check(sID, (error, results) => {
            if (error || !results.length) {
                res.status(500).json({ "result": error })
            }
            if (results[0].total == "0") {
                res.status(404).json({ "result": "Member Not Found" })
            }
            if (results[0].total == "1") {
                Officer.add(req, (error, results) => {
                    if (error || !results.affectedRows)
                        return sendErrorMsg(res, 500, error);
                    res.send("Add Officer Successfully.");
                });
            }
        });
    } else {
        res.status(500).json({ "result": "sID format error" });
    }
};

// delete officer
exports.delete = (req, res) => {
    const sID = req.body.sID;
    if (check_sID(sID)) {
        Officer.delete(req, (error, results) => {
            if (error)
                return sendErrorMsg(res, 500, error);
            if (!results.affectedRows)
                return sendErrorMsg(res, 404, "The condition is not exist.");
            res.send("Delete Officer Successfully.");
        });
    } else {
        res.status(500).json({ "result": "sID format error" });
    }

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
        res.send(results);
    });
};

// fetch by position
exports.fetchByPosition = (req, res) => {
    Officer.fetchByPosition(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.send(results);
    });
};

// fetch by authority
exports.fetchByPermission = (req, res) => {
    Officer.fetchByPermission(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.send(results);
    });
};

/****************
 *    update    *
 ****************/

// update officer by position
exports.updateOfficer = (req, res) => {
    const sID = req.body.sID;
    if (check_sID(sID)) {
        Officer.updateOfficer(req, (error, results) => {
            if (error)
                return sendErrorMsg(res, 500, error);
            if (!results.affectedRows)
                return sendErrorMsg(res, 404, "The condition is not exist.");
            res.json({ "result": true });
        });
    } else {
        res.status(500).json({ "result": "sID format error" });
    }

};

// update authority by position
exports.updatePermission = (req, res) => {
    Officer.updatePermission(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.affectedRows)
            return sendErrorMsg(res, 404, "The condition is not exist.");
        res.json({ "result": true });
    });
};