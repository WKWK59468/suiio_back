const models = require('../models/account');

class AccountController {

    addAccount = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            res.json(results.insertId);
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
    getAccount = (req, res) => {
        models.get(req, (err, results) => {
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