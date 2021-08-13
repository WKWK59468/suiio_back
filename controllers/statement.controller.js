const models = require('../models/statement.model');


class StatementController {
    add = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                if (err.sqlState == "23000") {
                    res.status(500).json({ "result": "Duplicate primary key" });
                    return console.error(err);
                }
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            models.addContent(statement, account, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": err });
                    return console.error(err);
                }
                res.json({ "result": "true" });
            })
        })
    }
    delete = (req, res) => {
        models.delete(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ 'result': "Can't find statement." });
                console.log(err);
                return;
            }
            res.status(200).json({ 'result': 'true' });
        })
    }
    update = (req, res) => {
        models.delete(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ 'result': "Can't find statement." });
                console.log(err);
                return;
            }
            res.status(200).json({ 'result': 'true' });
        })
    }
}

module.exports = new StatementController();