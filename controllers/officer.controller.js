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

// fetch all officers
exports.fetchAll = (req, res) => {
    Officer.fetchAll(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.length)
            return sendErrorMsg(res, 404, "There is nothing to show.");
        res.send(results);
    });
};

// update officer
exports.update = (req, res) => {
    Officer.update(req, (error, results) => {
        if (error)
            return sendErrorMsg(res, 500, error);
        if (!results.affectedRows)
            return sendErrorMsg(res, 404, "The condition is not exist.");
        res.send(results);
    });
};