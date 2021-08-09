const models = require('../models/account');

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
            results.forEach(element => {
                element.date = element.date.getFullYear() + "-" + ((element.date.getMonth()) + 1) + "-" + element.date.getDate();
            });
            res.status(200).json(results);
        })
    }
    fetchStatus = (req, res) => {
        const status = req.params.status;
        if (status == "0" || status == "1" || status == "2" || status == "3" || status == "4") {
            models.fetchStatus(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": err });
                    return console.error(err);
                }
                if (!results.length) {
                    res.status(404).json({ "result": "There is nothing to show." });
                    return;
                }
                results.forEach(element => {
                    element.date = element.date.getFullYear() + "-" + ((element.date.getMonth()) + 1) + "-" + element.date.getDate();
                });
                res.status(200).json(results);
            })
        } else {
            res.status(500).json({ "result": "Please Enter 0 ~ 4." });
        }
    }
}

module.exports = new AccountController();