let models = require('../models/member');
const bcrypt = require('bcrypt');

class UserController {

    //查證帳號密碼是否正確
    getLogin = (req, res) => {
            models.check(req, async(err, results) => {
                if (err) {
                    res.sendStatus(500);
                    return console.error(err);
                }
                if (!results.length) {
                    res.sendStatus(404);
                    console.log(err);
                    return;
                }
                const validPassword2 = await bcrypt.compare(req.body.password, results[0].password);
                res.json({ "result": validPassword2 });
            })
        }
        //取得單一user
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
        //列出所有user
    listMember = (req, res) => {
            models.list(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": "false" })
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
        //新增
    addMember = (req, res) => {
            const sID = req.body.sID;
            if (sID.length == 10) {
                const sIDArray = sID.split("");
                if (sIDArray[0] == "1" || sIDArray[0] == "2" || sIDArray[0] == "3" || sIDArray[0] == "4") {
                    if (sIDArray[1] == "1" || sIDArray[1] == "2" || sIDArray[1] == "3" || sIDArray[1] == "4" || sIDArray[1] == "6" || sIDArray[1] == "7" || sIDArray[1] == "8") {
                        switch (sIDArray[5]) {
                            case "0":
                                if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4" || sIDArray[6] == "5" || sIDArray[6] == "6" || sIDArray[6] == "7" || sIDArray[6] == "8") {
                                    models.add(req, (err, results) => {
                                        if (err) {
                                            res.status(500).json({ "result": "false" });
                                            return console.error(err);
                                        }

                                        res.json({ "result": "true" });
                                    })
                                } else {
                                    res.status(500).json({ "result": "format error" });
                                }
                                break;
                            case "2":
                                if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                                    models.add(req, (err, results) => {
                                        if (err) {
                                            res.status(500).json({ "result": "false" });
                                            return console.error(err);
                                        }

                                        res.json({ "result": "true" });
                                    })
                                } else {
                                    res.status(500).json({ "result": "format error" });
                                }
                                break;
                            case "3":
                                if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                                    models.add(req, (err, results) => {
                                        if (err) {
                                            res.status(500).json({ "result": "false" });
                                            return console.error(err);
                                        }

                                        res.json({ "result": "true" });
                                    })
                                } else {
                                    res.status(500).json({ "result": "format error" });
                                }
                                break;
                            case "4":
                                if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                                    models.add(req, (err, results) => {
                                        if (err) {
                                            res.status(500).json({ "result": "false" });
                                            return console.error(err);
                                        }

                                        res.json({ "result": "true" });
                                    })
                                } else {
                                    res.status(500).json({ "result": "format error" });
                                }
                                break;
                            case "5":
                                if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                                    models.add(req, (err, results) => {
                                        if (err) {
                                            res.status(500).json({ "result": "false" });
                                            return console.error(err);
                                        }

                                        res.json({ "result": "true" });
                                    })
                                } else {
                                    res.status(500).json({ "result": "format error" });
                                }
                                break;
                            default:
                                res.status(500).json({ "result": "format error" });
                        }
                    } else {
                        res.status(500).json({ "result": "format error" });
                    }
                } else {
                    res.status(500).json({ "result": "format error" });
                }

            } else {
                res.status(500).json({ "result": "format error" });
            }
        }
        //刪除user
    delMember = (req, res) => {
            models.check(req, async(err, results) => {
                if (err) {
                    res.sendStatus(500);
                    return console.error(err);
                }
                if (!results.length) {
                    res.status(404).json({ "result": "User Not Found" });
                    console.log(err);
                    return;
                }
                const validPassword2 = await bcrypt.compare(req.body.password, results[0].password);
                if (validPassword2) {
                    models.del(req, (err, results) => {
                        if (err) {
                            res.sendStatus(500);
                            return console.error(err);
                        }
                        res.json({ 'result': 'true' });
                    });
                } else {
                    res.json({ 'result': 'Password ERROR' });
                }
            });

        }
        //修改user資訊
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

                res.status(200).json({ 'result': 'true' });
            })
        }
        //修改密碼
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

            res.status(200).json({ 'result': 'true' });
        })
    }
}
module.exports = new UserController();