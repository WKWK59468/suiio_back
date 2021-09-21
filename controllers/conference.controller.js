const models = require("../models/conference.model");
const officerModels = require('../models/officer.model');
const myFunction = require('../myFunction');

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
        myFunction.check_session(req).then(() => {
            models.list(req, (err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return new Promise((resolve, reject) => {});
                }
                if (!results.length) {
                    res.status(404).json(errMessage(404, err));
                    return new Promise((resolve, reject) => {});
                }
                results = dateFormat(results);
                res.status(200).json(results);
                return new Promise((resolve, reject) => {});
            });
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };

    fetchCategory = (req, res) => {
        myFunction.check_session(req).then(() => {
            models.fetchBycategory(req, (err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return new Promise((resolve, reject) => {});
                }
                if (!results.length) {
                    res.status(404).json(errMessage(404, err));
                    return new Promise((resolve, reject) => {});
                }
                results = dateFormat(results)
                res.status(200).json(results);
                return new Promise((resolve, reject) => {});
            });
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };

    fetchContent = (req, res) => {
        myFunction.check_session(req).then(() => {
            models.fetchOne(req, async(err, results) => {
                if (err) {
                    res.status(500).json(errMessage(500, err));
                    return new Promise((resolve, reject) => {});
                }
                if (!results.length) {
                    res.status(404).json(errMessage(404, err));
                    return new Promise((resolve, reject) => {});
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
                    return new Promise((resolve, reject) => {});
                });
            });
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };

    upload = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '會議負責人') {
                let position = [];
                const attendees = req.body.attendees;
                models.upload(req).then(
                    officerModels.fetchAll(req, (err, positionArray) => {
                        positionArray.forEach(element => {
                            position.push(element.position);
                        });
                        const absentees = position.concat(attendees).filter((element, index, arr) => {
                            return arr.indexOf(element) === arr.lastIndexOf(element);
                        });
                        //GET ConferenceID
                        models.getConferenceID().then(ConferenceID => {
                            //attendees
                            const attendees = req.body.attendees;
                            for (let k in attendees) {
                                models.addAttendees(ConferenceID, attendees[k]).catch(err => {
                                    console.log(errMessage(500, err));
                                });
                            }
                            //absentees
                            for (let k in absentees) {
                                models.addAbsentees(ConferenceID, absentees[k]).catch(err => {
                                    console.log(errMessage(500, err));
                                });
                            }
                        }).then(() => {
                            res.status(200).json(successMessage);
                            return new Promise((resolve, reject) => {});
                        });
                    })
                ).catch(err => {
                    res.status(500).json(errMessage(500, err));
                    return new Promise((resolve, reject) => {});
                })
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };

    updateStatus = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '會議負責人') {
                if (req.body.status == 0 || req.body.status == 1 || req.body.status == 2 || req.body.status == 3 || req.body.status == 4) {
                    models.updateStatus(req, (err, results) => {
                        if (err) {
                            res.status(500).json(errMessage(500, err));
                            return new Promise((resolve, reject) => {});
                        }
                        if (!results.affectedRows) {
                            res.status(404).json(errMessage(404, err));
                            return new Promise((resolve, reject) => {});
                        }
                        res.status(200).json(successMessage);
                        return new Promise((resolve, reject) => {});
                    });
                } else {
                    res.status(500).json({ "result": "Please Enter 0 ~ 4." });
                    return new Promise((resolve, reject) => {});
                }
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };

    updateContent = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                models.updateContent(req, (err, results) => {
                    if (err) {
                        res.status(500).json(errMessage(500, err));
                        return new Promise((resolve, reject) => {});
                    }
                    if (!results.affectedRows) {
                        res.status(404).json(errMessage(404, err));
                        return new Promise((resolve, reject) => {});
                    }
                    res.status(200).json(successMessage);
                    return new Promise((resolve, reject) => {});
                });
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    };
}

module.exports = new Conference();