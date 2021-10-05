const models = require('../models/statement.model');
const myFunction = require('../myFunction');

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
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                const content = req.body.content;
                models.add(req).then(
                    models.searchID().then(statement => {
                        content.forEach(account => {
                            models.addContent(statement, account).catch(err => {
                                res.status(500).json({ "result": err });
                                return new Promise((resolve, reject) => {});
                            });
                        })
                    }).catch(err => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    })
                ).then(() => {
                    res.status(201).json({ "result": true });
                    return new Promise((resolve, reject) => {});
                }).catch(err => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    }
                });
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    }
    addByCategory = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                const category = req.body.category;
                models.addByCategory(req).then(
                    models.searchID().then(statement => {

                        models.fetchAccountByCategory(category).then(accountArray => {
                            accountArray.forEach(account => {
                                models.addContent(statement, account.ID).catch(err => {
                                    res.status(500).json({ "result": err });
                                    return new Promise((resolve, reject) => {});
                                });
                            })
                        }).catch(err => {
                            res.status(500).json({ "result": err })
                            return new Promise((resolve, reject) => {})
                        }).then(accountArray => {
                            res.status(201).json({ "result": true })
                            return new Promise((resolve, reject) => {})
                        });

                    }).catch(err => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {})
                    })
                ).catch(err => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                });
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    }
    addByMonth = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                const Month = new Date(req.body.date);
                models.addByMonth(req).then(
                    models.searchID().then(statement => {

                        models.fetchAccountByMonth(Month.getMonth() + 1).then(accountArray => {
                            accountArray.forEach(account => {
                                models.addContent(statement, account.ID).catch(err => {
                                    res.status(500).json({ "result": err });
                                    return new Promise((resolve, reject) => {});
                                });
                            })
                        }).catch(err => {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => {});
                        }).then(accountArray => {
                            res.status(201).json({ "result": true })
                            return new Promise((resolve, reject) => {});
                        });

                    }).catch(err => {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    })
                ).catch(err => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                });
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })

    }
    delete = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                models.delete(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ 'result': err });
                        return new Promise((resolve, reject) => {});
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ 'result': "Can't find statement." });
                        return new Promise((resolve, reject) => {});
                    }
                    res.status(200).json({ 'result': true });
                    return new Promise((resolve, reject) => {});
                })
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    }
    update = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                models.update(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ 'result': err });
                        return new Promise((resolve, reject) => {});
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ 'result': "Can't find statement." });
                        return new Promise((resolve, reject) => {});
                    }
                    res.status(200).json({ 'result': true });
                    return new Promise((resolve, reject) => {});
                })
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })
    }
    updateStatus = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                models.updateStatus(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ 'result': err });
                        return new Promise((resolve, reject) => {});
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ 'result': "Can't find statement." });
                        return new Promise((resolve, reject) => {});
                    }
                    res.status(200).json({ 'result': true });
                    return new Promise((resolve, reject) => {});
                })
            } else {
                res.status(400).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => {});
            }
        }).catch(() => {
            res.status(403).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => {});
        })

    }
    fetchAll = (req, res) => {

        models.fetchAll(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => {});
        });

    }
    fetchByName = (req, res) => {

        models.fetchByName(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => {});
        })

    }
    fetchByStatus = (req, res) => {

        models.fetchByStatus(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => {});
        })

    }
    fetchByWhom = (req, res) => {

        models.fetchByWhom(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => {});
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
                return new Promise((resolve, reject) => {});
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => {});
            });
        })

    }
    fetchByDate = (req, res) => {

        models.fetchByDate(req, (err, results) => {
            if (err) {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            }
            if (!results.length) {
                res.status(404).json({ 'result': "There is nothing to show." });
                return new Promise((resolve, reject) => {});
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => {});
        });

    }
}

module.exports = new StatementController();