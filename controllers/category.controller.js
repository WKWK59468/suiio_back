const models = require('../models/category.model');
const myFunction = require('../myFunction');

class categoryController {

    addCategory = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                models.add(req, (err, results) => {
                    if (err) {
                        if (err.sqlState == "23000") {
                            res.status(500).json({ "result": "Duplicate primary key" });
                            return new Promise((resolve, reject) => { });
                        }
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    }
                    res.status(201).json({ "result": true });
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
    listCategory = (req, res) => {

        let arr = [];
        models.list(req, (err, results) => {
            if (err) {
                res.status(500).json({ "result": err })
                return new Promise((resolve, reject) => { });
            }
            if (!results.length) {
                res.status(404).json({ "result": "There is nothing to show." });
                return new Promise((resolve, reject) => { });
            }
            results.forEach(element => {
                if (element.ID != 0) {
                    arr.push(element);
                }
            });
            res.status(200).json(arr);
            return new Promise((resolve, reject) => { });
        });

    }
    fetchStatusOn = (req, res) => {

        const body = req.params;
        const status = body.status;
        let arr = [];
        if (status == "0" || status == "1") {
            models.StatusOn(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": err })
                    return new Promise((resolve, reject) => { });
                }
                if (!results.length) {
                    res.status(404).json({ "result": "There is nothing to show." });
                    return new Promise((resolve, reject) => { });
                }
                results.forEach(element => {
                    if (element.ID != 0) {
                        arr.push(element);
                    }
                });
                res.status(200).json(arr);
                return new Promise((resolve, reject) => { });
            });
        } else {
            res.status(400).json({ "result": "Please Enter 0 or 1." });
            return new Promise((resolve, reject) => { });
        }

    }
    delCategory = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                models.del(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ "result": err });
                        return new Promise((resolve, reject) => { });
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ "result": "Can't find category." });
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
    patchStatus = (req, res) => {
        myFunction.check_permission(req).then((permission) => {
            if (permission !== '組織成員') {
                const status = req.body.status;
                if (status == 0 || status == 1) {
                    models.setStatus(req, function (err, results, fields) {
                        if (err) {
                            res.status(500).json({ "result": err });
                            return new Promise((resolve, reject) => { });
                        }
                        if (!results.affectedRows) {
                            res.status(404).json({ "result": "Can't find category." });
                            return new Promise((resolve, reject) => { });
                        }
                        res.status(200).json({ "result": true });
                        return new Promise((resolve, reject) => { });
                    });
                } else {
                    res.status(400).json({ "result": "Please Enter 0 or 1." });
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

}

module.exports = new categoryController();