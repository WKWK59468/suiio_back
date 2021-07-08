let models = require('../models/category');

class categoryController {

    addCategory = (req, res) => {
        models.add(req, (err, results) => {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            res.json(results.insertId);
        })
    }
    patchCategory = (req, res) => {
        models.patch(req, function(err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }

            if (!results.affectedRows) {
                res.sendStatus(410);
                console.log(err);
                return;
            }

            res.json(req.body);
        });
    }

}

module.exports = new categoryController();