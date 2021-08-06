const models = require('../models/category');

class categoryController {

    addCategory = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                if (err.sqlState == "23000") {
                    res.status(500).json({ "result": "Duplicate primary key" });
                    return console.error(err);
                }
                res.status(500).json({ "result": err });
                return console.error(err);
            }

            res.json({ "result": true });
        })
    }
    listCategory = (req, res) => {
        models.list(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err })
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            res.json(results);
        });
    }
    fetchStatusOn = (req, res) => {
        models.StatusOn(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err })
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return;
            }
            res.json(results);
        });
    }
    delCategory = (req, res) => {
        models.del(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ "result": "Can't find category." });
                return console.error(err);
            }
            res.json({ "result": true });
        })
    }
    patchStatus = (req, res) => {
        const status = req.body.status;
        if (status == 0 || status == 1) {
            models.setStatus(req, function(err, results, fields) {
                if (err) {
                    res.status(500).json({ "result": err });
                    return console.error(err);
                }

                if (!results.affectedRows) {
                    res.status(404).json({ "result": "Can't find category." });
                    console.log(err);
                    return;
                }
                res.status(200).json({ "result": true });
            });
        } else {
            res.status(500).json({ "result": "Please Enter 0 or 1." });
        }
    }

}

module.exports = new categoryController();