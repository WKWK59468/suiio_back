const models = require('../models/statement.model');

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.date.getFullYear();
        const Month = ((element.date.getMonth() + 1) < 10) ? "0" + (element.date.getMonth() + 1) : (element.date.getMonth() + 1);
        const Date = (element.date.getDate() < 10) ? "0" + element.date.getDate() : element.date.getDate();
        element.date = Year + "-" + Month + "-" + Date;
    });
    return res;
}

class StatementController {
    add = (req, res) => {
        const content = req.body.content;
        models.add(req).then(
            models.searchID().then(statement => {
                content.forEach(account => {
                    models.addContent(statement, account).catch(err => {
                        res.status(500).json({ "result": err });
                    });
                })
            }).catch(err => {
                res.status(500).json({ "result": err });
            })
        ).then(
            res.status(200).json({ "result": true })
        ).catch(err => {
            if (err) {
                res.status(500).json({ "result": err });
            }
        });
    }
    addByCategory = (req, res) => {
        const category = req.body.category;
        models.addByCategory(req).then(
            models.searchID().then(statement => {

                models.fetchAccountByCategory(category).then(accountArray => {
                    accountArray.forEach(account => {
                        models.addContent(statement, account.ID).catch(err => {
                            res.status(500).json({ "result": err });
                        });
                    })
                }).catch(err => {
                    res.status(500).json({ "result": err })
                    return new Promise((resolve, reject) => {})
                }).then(accountArray => {
                    res.status(200).json({ "result": true })
                    return new Promise((resolve, reject) => {})
                });

            }).catch(err => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {})
            })
        ).catch(err => {
            res.status(500).json({ "result": err });
        });
    }
    addByMonth = (req, res) => {
        const Month = new Date(req.body.date);
        models.addByMonth(req).then(
            models.searchID().then(statement => {

                models.fetchAccountByMonth(Month.getMonth() + 1).then(accountArray => {
                    accountArray.forEach(account => {
                        models.addContent(statement, account.ID).catch(err => {
                            res.status(500).json({ "result": err });
                        });
                    })
                }).catch(err => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                }).then(accountArray => {
                    res.status(200).json({ "result": true })
                    return new Promise((resolve, reject) => {});
                });

            }).catch(err => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {});
            })
        ).catch(err => {
            res.status(500).json({ "result": err });
        });
    }
    delete = (req, res) => {
        models.delete(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ 'result': "Can't find statement." });
                return console.log(err);
            }
            res.status(200).json({ 'result': true });
        })
    }
    update = (req, res) => {
        models.update(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ 'result': "Can't find statement." });
                return console.log(err);
            }
            res.status(200).json({ 'result': true });
        })
    }
    updateStatus = (req, res) => {
        models.updateStatus(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.affectedRows) {
                res.status(404).json({ 'result': "Can't find statement." });
                return console.log(err);
            }
            res.status(200).json({ 'result': true });
        })
    }
    fetchAll = (req, res) => {
        models.fetchAll(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        });
    }
    fetchByName = (req, res) => {
        models.fetchByName(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByStatus = (req, res) => {
        models.fetchByStatus(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByWhom = (req, res) => {
        models.fetchByWhom(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return console.error(err);
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return;
            }
            results = dateFormat(results);
            res.status(200).json(results);
        })
    }
    fetchByID = (req, res) => {
        const body = req.params;
        const StatementID = body.ID
        models.fetchByID(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            models.fetchAccountByStatement(StatementID).then((accounts) => {
                results[0].accounts = accounts;
                res.status(200).json(results[0]);
            }).catch((err) => {
                res.status(500).json({ "result": err });
            });
        })
    }
    fetchByDate = (req, res) => {
            models.fetchByDate(req, (err, results) => {
                if (err) {
                    res.status(500).json({ 'result': err });
                    return console.error(err);
                }
                if (!results.length) {
                    res.status(404).json({ 'result': "There is nothing to show." });
                    return;
                }
                results = dateFormat(results);
                res.status(200).json(results);
            })
        }
        // fetchContent = (req, res) => {
        //     const body = req.params;
        //     const StatementID = body.ID
        //     let array = [];
        //     models.fetchAccountByStatement(StatementID, (err, results) => {
        //         if (err) {
        //             res.status(500).json({ 'result': err });
        //             return console.error(err);
        //         }
        //         if (!results.length) {
        //             res.status(404).json({ 'result': "There is nothing to show." });
        //             return;
        //         }
        //         results = dateFormat(results);
        //         models.fetchByID(req, (err, result) => {
        //             array.push(result[0]);
        //             results.forEach(element => {
        //                 array.push(element);
        //             })
        //             res.status(200).json(array);
        //         })
        //     })
        // }
}

module.exports = new StatementController();