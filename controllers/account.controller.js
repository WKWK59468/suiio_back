const models = require('../models/account.model');
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

class AccountController {

    add = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                const position = req.body.uploadBy;
                models.checkOfficer(position).then(check => {
                    if (check) {
                        models.add(req, (err, results) => {
                            if (err) {
                                res.status(500).json({ "result": err });
                                return new Promise((resolve, reject) => { });
                            }
                            if (!results.affectedRows) {
                                res.status(404).json({ "result": "The account is not add." });
                                return new Promise((resolve, reject) => { });
                            }
                            res.status(201).json({ "result": true });
                            return new Promise((resolve, reject) => { });
                        })
                    } else {
                        res.status(404).json({ "result": "Position does not exist." });
                        return new Promise((resolve, reject) => { });
                    }
                }).catch(err => {
                    res.status(500).json({ "result": err });
                    return new Promise((resolve, reject) => { });
                });
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => { });
            }
        }).catch(() => {
            res.status(401).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => { });
        })
    }
    delete = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                models.delete(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ "result": "The account is not exist." });
                        return new Promise((resolve, reject) => { });
                    }
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => { });
                })
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => { });
            }
        }).catch(() => {
            res.status(401).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => { });
        })
    }
    update = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                models.update(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ "result": "Can't find account." });
                        return new Promise((resolve, reject) => { });
                    }
                    res.status(200).json({ "result": true });
                    return new Promise((resolve, reject) => { });
                })
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => { });
            }
        }).catch(() => {
            res.status(401).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => { });
        })
    }
    updateStatus = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission == '組織負責人' || permission == '財務負責人') {
                const status = req.body.status;
                if (status == "0" || status == "1" || status == "2" || status == "3" || status == "4") {
                    models.updateStatus(req, (err, results) => {
                        if (err) {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => { });
                        }
                        if (!results.affectedRows) {
                            res.status(404).json({ "result": "Can't find account." });
                            return new Promise((resolve, reject) => { });
                        }
                        res.status(200).json({ "result": true });
                        return new Promise((resolve, reject) => { });
                    })
                } else {
                    res.status(400).json({ "result": "Please Enter 0 ~ 4." });
                    return new Promise((resolve, reject) => { });
                }
            } else {
                res.status(403).json({ 'result': 'Permission denied.' })
                return new Promise((resolve, reject) => { });
            }
        }).catch(() => {
            res.status(401).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => { });
        })
    }
    fetchAll = (req, res) => {

        models.fetchAll(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => { });
        })

    }
    fetchByStatus = (req, res) => {
        myFunction.check_session(req).then(() => {
            const status = req.params.status;
            if (status == "0" || status == "1" || status == "2" || status == "3" || status == "4") {
                models.fetchByStatus(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    }
                    if (!results.length) {
                        res.status(404).json({ "result": "There is nothing to show." });
                        return new Promise((resolve, reject) => { });
                    }
                    results = dateFormat(results);
                    res.status(200).json(results);
                    return new Promise((resolve, reject) => { });
                })
            } else {
                res.status(400).json({ "result": "Please Enter 0 ~ 4." });
                return new Promise((resolve, reject) => { });
            }
        }).catch(() => {
            res.status(401).json({ 'result': 'Not Login' })
            return new Promise((resolve, reject) => { });
        })
    }
    fetchByName = (req, res) => {

        models.fetchByName(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => { });
        })

    }
    fetchByWhom = (req, res) => {

        models.fetchByWhom(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => { });
        })

    }
    fetchByDate = (req, res) => {

        models.fetchByDate(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => { });
        })

    }
    fetchByID = (req, res) => {

        models.fetchByID(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results = dateFormat(results);
            res.status(200).json(results);
            return new Promise((resolve, reject) => { });
        })

    }
    diagram = (req, res) => {
        const params = req.params;
        const year = params.year;
        const now_month = params.month;
        let last_month;

        if (now_month == 1) {
            last_month = 10;
        } else if (now_month == 2) {
            last_month = 11;
        } else if (now_month == 3) {
            last_month = 12;
        } else {
            last_month = now_month - 3;
        }
        if (now_month <= 12) {
            models.diagram(year, now_month, last_month).then((result) => {
                res.status(200).json(result);
                return new Promise((resolve, reject) => { });
            }).catch((err) => {
                res.status(500).json({ "result": err });
                return new Promise((resolve, reject) => { });
            })
        } else {
            res.status(400).json({ "result": "Month Enter Error." });
            return new Promise((resolve, reject) => { });
        }
    }
    diagram_compare = (req, res) => {
        const params = req.params;
        const year = parseInt(params.year) + 1911;
        const next_year = year + 1;
        let income = 0;
        let cost = 0;
        let gains_and_losses = 0;

        models.diagram_compare(year, next_year).then(async (result) => {
            await result.forEach((element) => {
                if (element.amount < 0) {
                    cost += element.amount;
                } else if (element.amount > 0) {
                    income += element.amount;
                }
            })
            gains_and_losses = cost + income;

            res.status(200).json({ "income": income, "cost": cost, "net_total": gains_and_losses });
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            res.status(500).json(err);
            return new Promise((resolve, reject) => { });
        })
    }
    diagram_category = (req, res) => {
        const params = req.params;
        const year = parseInt(params.year) + 1911;
        const next_year = year + 1;
        let jsonObj = {};

        models.diagram_compare(year, next_year).then(async (result) => {

            await result.forEach((element) => {
                jsonObj[element.category] = { "cost": 0, "income": 0, "net_total": 0 };
            })
            await result.forEach((element) => {
                if (element.amount < 0) {
                    jsonObj[element.category].cost += element.amount;
                } else if (element.amount > 0) {
                    jsonObj[element.category].income += element.amount;
                }
                jsonObj[element.category].net_total += element.amount;
            })
            res.status(200).json(jsonObj);
            return new Promise((resolve, reject) => { });
        }).catch((err) => {
            res.status(500).json({ "result": err });
            return new Promise((resolve, reject) => { });
        })
    }
}

module.exports = new AccountController();