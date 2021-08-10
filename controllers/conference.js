const models = require("../models/conference");
const officerModels = require('../models/officer.model');

const errMessage = (status, err) => {
    if (status == 500) {
        return { result: err };
    }
    if (status == 404) {
        return { result: "Not Found" };
    }
};

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.date.getFullYear();
        const Month = ((element.date.getMonth() + 1) < 10) ? "0" + (element.date.getMonth() + 1) : (element.date.getMonth() + 1);
        const Date = (element.date.getDate() < 10) ? "0" + element.date.getDate() : element.date.getDate();
        element.date = Year + "-" + Month + "-" + Date;
    });
    return res;
}

const successMessage = {
    result: true,
};

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
            results = dateFormat(results);
            res.status(200).json(results);
        });
    };

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
            results = dateFormat(results)
            res.status(200).json(results);
        });
    };

    fetchContent = (req, res) => {

        models.fetchOne(req, async(err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }
            await models.fetchAbsentees(req, (err, absentees) => {
                let arr = [];
                absentees.forEach((element) => {
                    arr.push(element.absentees);
                });
                results[0]["absentees"] = arr;

            });
            await models.fetchAttendees(req, (err, attendees) => {
                let arr2 = [];
                attendees.forEach((element) => {
                    arr2.push(element.attendees);
                });
                results[0]["attendees"] = arr2;
                res.status(200).json(results);
            });
        });
    };

    upload = async(req, res) => {
        let ConferenceID;
        let position = [];
        const attendees = JSON.parse(req.body.attendees);
        await models.upload(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }

        });

        await officerModels.fetchAll(req, (err, positionArray) => {

            positionArray.forEach(element => {
                position.push(element.position);
            });

            const absentees = position.concat(attendees).filter((element, index, arr) => {
                return arr.indexOf(element) === arr.lastIndexOf(element);
            });

            //GET ConferenceID
            models.getConferenceID(req, async(err, results) => {

                ConferenceID = results[0].ID;

                //attendees
                const attendees = JSON.parse(req.body.attendees);
                for (let k in attendees) {
                    await models.addAttendees(ConferenceID, attendees[k]);
                }

                //absentees
                for (let k in absentees) {
                    await models.addAbsentees(ConferenceID, absentees[k]);
                }

                res.status(200).json(successMessage);

            });
        });
    };

    updateStatus = (req, res) => {
        if (req.body.status == 0 || req.body.status == 1 || req.body.status == 2 || req.body.status == 3 || req.body.status == 4) {
            models.updateStatus(req, (err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return console.error(err);
                }
                if (!results.affectedRows) {
                    res.status(404).json(errMessage(404, err));
                    return console.error(err);
                }
                res.status(200).json(successMessage);
            });
        } else {
            res.status(500).json({ "result": "Please Enter 0 ~ 4." });
        }

    };

    updateContent = (req, res) => {
        models.updateContent(req, (err, results) => {
            if (err) {
                res.status(500).json(errMessage(500, err));
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json(errMessage(404, err));
                return console.error(err);
            }
            res.status(200).json(successMessage);
        });
    };
}

module.exports = new Conference();