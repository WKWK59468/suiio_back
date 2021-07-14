let models = require('../models/category');

class categoryController {

    addCategory = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": "false" });
                return console.error(err);
            }

            res.json({ "result": "true" });
        })
    }
    listCategory = (req, res) => {
        models.list(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": "false" })
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "false" });
                console.log(err);
                return;
            }
            res.json(results);
        });
    }
    delCategory = (req, res) => {
        models.del(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": "false" });
                return console.error(err);
            }

            res.json({ "result": "true" });
        })
    }
    patchStatus = (req, res) => {
        models.setStatus(req, function(err, results, fields) {
            if (err) {
                res.status(500).json({ "result": "false" });
                return console.error(err);
            }

            if (!results.affectedRows) {
                res.status(404).json({ "result": "false" });
                console.log(err);
                return;
            }
            res.status(200).json({ "result": "true" });
        });
    }


}

module.exports = new categoryController();