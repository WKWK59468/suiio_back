const models = require('../models/account');

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.date.getFullYear();
        const Month = ((element.date.getMonth() + 1) < 10) ? "0" + (element.date.getMonth() + 1) : (element.date.getMonth() + 1);
        const Date = (element.date.getDate() < 10) ? "0" + element.date.getDate() : element.date.getDate();
        element.date = Year + "-" + Month + "-" + Date;
    });
    return res;
}

class AccountController {

    add = (req, res) => { // 8/11 02:51 做到這裡
        const position = req.body.uploadBy;
        models.checkOfficer(position, (err, results) => {
            const check = results[0].num;
            if (check) {
                models.add(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return console.error(err);
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ "result": err });
                        return console.error(err);
                    }
                    res.status(200).json({ "result": true });
                })
            } else {
                res.status(500).json({ "result": "Position does not exist." });
            }
        });
    }
    delete = (req, res) => {
        models.delete(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ "result": "The account is not exist." });
                return console.error(err);
            }
            res.status(200).json({ "result": true });
        })
    }
    update = (req, res) => {
        models.update(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ "result": "Can't find account." });
                return console.error(err);
            }
            res.status(200).json({ "result": true });
        })
    }
    updateStatus = (req, res) => {
        const status = req.body.status;
        if (status == "0" || status == "1" || status == "2" || status == "3" || status == "4") {
            models.updateStatus(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": err });
                    return console.error(err);
                }
                if (!results.affectedRows) {
                    res.status(404).json({ "result": "Can't find account." });
                    return console.error(err);
                }
                res.status(200).json({ "result": true });
            })
        } else {
            res.status(500).json({ "result": "Please Enter 0 ~ 4." });
        }
    }
    fetchAll = (req, res) => { //OK
        models.fetchAll(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": err });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByStatus = (req, res) => {
        const status = req.params.status;
        if (status == "0" || status == "1" || status == "2" || status == "3" || status == "4") {
            models.fetchByStatus(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": err });
                    return console.error(err);
                }
                if (!results.length) {
                    res.status(404).json({ "result": "There is nothing to show." });
                    return;
                }
                results = dateFormat(results);
                res.status(200).json(results);
            })
        } else {
            res.status(500).json({ "result": "Please Enter 0 ~ 4." });
        }
    }
    fetchByName = (req, res) => {
        models.fetchByName(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByWhom = (req, res) => {
        models.fetchByWhom(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByDate = (req, res) => {
        models.fetchByDate(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByID = (req, res) => {
        models.fetchByID(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
}

module.exports = new AccountController();