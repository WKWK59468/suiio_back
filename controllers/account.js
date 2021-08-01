const models = require('../models/account');

class AccountController {

    addAccount = (req, res) => { // 8/11 02:51 做到這裡
        models.add(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }

            res.status(200).json({ "result": true });
        })
    }
    searchAccount = (req, res) => {
        models.search(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
            if (!results.length) {
                res.sendStatus(404);
                console.log(err);
                return;
            }
            res.json(results);
        })
    }
    fetchAll = (req, res) => {
        models.fetchAll(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
            if (!results.length) {
                res.sendStatus(404);
                console.log(err);
                return;
            }
            res.json(results);
        })
    }
}

module.exports = new AccountController();