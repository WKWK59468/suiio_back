const models = require('../models/conference');

const errMessage = (status, err) => {
    if (status == 500) {
        return { "result": err }
    }
    if (status == 404) {
        return { "result": "Not Found" }
    }
    if (status == 401) {
        return { "result": "err" }
    }
    if (status == 403) {
        return { "result": "UPDATE ERROR" }
    }
}
const successMessage = {
    "result": "true"
}

class Conference {
    list = (req, res) => {
        models.list(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }
            res.status(200).json(results);
        })
    }
    fetchCategory = (req, res) => {
        models.fetchBycategory(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }
            res.status(200).json(results);
        })
    }
    fetchContent = (req, res) => {
        models.fetchOne(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }
            res.status(200).json(results);
        })
    }
    upload = (req, res) => {
        models.upload(req, (err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return console.error(err);
                }
                if (!results.affectedRows) {
                    res.status(404).json(errMessage(401, err));
                    return console.error(err);
                }
                res.status(200).json(successMessage);
            })
            //attendees
        models.addAttendees(req, (err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return console.error(err);
                }
                if (!results.affectedRows) {
                    res.status(404).json(errMessage(401, err));
                    return console.error(err);
                }
                res.status(200).json(successMessage);
            })
            //absentees
        models.addAbsentees(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json(errMessage(401, err));
                return console.error(err);
            }
            res.status(200).json(successMessage);
        })
    }
    updateStatus = (req, res) => {
        models.updateStatus(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json(errMessage(403, err));
                return console.error(err);
            }
            res.status(200).json(successMessage);
        })
    }
    updateContent = (req, res) => {
        models.updateContent(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json(errMessage(403, err));
                return console.error(err);
            }
            res.status(200).json(successMessage);
        })
    }
}

module.exports = new Conference();