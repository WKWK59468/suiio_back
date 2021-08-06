const models = require('../models/account');

class AccountController {

    add = (req, res) => { // 8/11 02:51 做到這裡
        models.add(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }

            res.status(200).json({ "result": true });
        })
    }
    delete = (req, res) => {
        models.delete(req, (err, results) => {
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
}

module.exports = new AccountController();