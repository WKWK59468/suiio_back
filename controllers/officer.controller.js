const Officer = require('../models/officer.model');

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
    Officer.add(req, (error, results) => {
        if (error || !results.affectedRows)
            return sendErrorMsg(res, 500, error);
        res.send("Add Officer Successfully.");
    });
};

// delete officer
exports.delete = (req, res) => {
    Officer.delete(req, (error, results) => {
        console.log("res: " + results);
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.affectedRows)
            return sendErrorMsg(res, 404, "The condition is not exist.");
        res.send("Delete Officer Successfully.");
    });
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
exports.fetchByAuthority = (req, res) => {
    Officer.fetchByAuthority(req, (error, results) => {
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
    Officer.updateOfficer(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.affectedRows)
            return sendErrorMsg(res, 404, "The condition is not exist.");
        res.send(results);
    });
};

// update authority by position
exports.updateAuthorities = (req, res) => {
    Officer.updateAuthority(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.affectedRows)
            return sendErrorMsg(res, 404, "The condition is not exist.");
        res.send(results);
    });
};