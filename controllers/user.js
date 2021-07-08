let models = require('../models/user');

class UserController {
    getLogin = (req, res) => {
        models.check(req, (err, results) => {
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
    getUser = (req, res) => {
        models.find(req, (err, results) => {
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
    addUser = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            res.json(results.insertId);
        })
    }
    patchUser = (req, res) => {
        models.patch(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.affectedRows) {
                // res.status(410).json(results);
                res.sendStatus(410);
                console.log(err);
                return;
            }

            res.json(results);
        })
    }
    patchPassword = (req, res) => {
        models.patchPwd(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.affectedRows) {
                res.sendStatus(410);
                console.log(err);
                return;
            }

            res.status(200).json({ 'status': 'true' });
        })
    }
}
module.exports = new UserController();