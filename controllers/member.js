const models = require('../models/member');
const bcrypt = require('bcrypt');

const check_sID = (sID) => {
    if (sID.length == 10) {
        const sIDArray = sID.split("");
        if (sIDArray[0] == "1" || sIDArray[0] == "2" || sIDArray[0] == "3" || sIDArray[0] == "4") {
            if (sIDArray[1] == "1" || sIDArray[1] == "2" || sIDArray[1] == "3" || sIDArray[1] == "4" || sIDArray[1] == "6" || sIDArray[1] == "7" || sIDArray[1] == "8") {
                switch (sIDArray[5]) {
                    case "0":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4" || sIDArray[6] == "5" || sIDArray[6] == "6" || sIDArray[6] == "7" || sIDArray[6] == "8") {
                            return true;
                        } else {
                            return false;
                        }
                    case "2":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                    case "3":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                    case "4":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                    case "5":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                    default:
                        return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

const dateFormat = (res) => {
    res.forEach((element, index) => {
        const Year = element.birth.getFullYear();
        const Month = ((element.birth.getMonth() + 1) < 10) ? "0" + (element.birth.getMonth() + 1) : (element.birth.getMonth() + 1);
        const Date = (element.birth.getDate() < 10) ? "0" + element.birth.getDate() : element.birth.getDate();
        element.birth = Year + "-" + Month + "-" + Date;
    });
    return res;
}

class UserController {
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
                results = dateFormat(results);
                res.json(results);
            })
        }
        //新增
    addMember = (req, res) => {
            const sID = req.body.sID;
            if (check_sID(sID)) {
                models.add(req, (err, results) => {
                    if (err) {
                        if (err.sqlState == "23000") {
                            res.status(500).json({ "result": "Duplicate primary key" });
                            return console.error(err);
                        }
                        res.status(500).json({ "result": "false" });
                        return console.error(err);
                    }

                    res.json({ "result": "true" });
                })
            } else {
                res.status(500).json({ "result": "format error" });
            }
        }
        //刪除user
    delMember = (req, res) => {
            const sID = req.body.sID;
            if (check_sID(sID)) {
                models.del(req, (err, results) => {
                    if (err) {
                        res.status(500).json({ 'result': err });
                        return console.error(err);
                    }
                    if (!results.affectedRows) {
                        res.status(404).json({ 'result': "Can't find member." });
                        console.log(err);
                        return;
                    }
                    res.status(200).json({ 'result': 'true' });
                });
            } else {
                res.status(500).json({ "result": "format error" });
            }
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
    login = (req, res) => {
        const body = req.body;
        const sID = body.sID;
        const userPWD = body.password;

        models.login(body).then((dbPWD) => {

            bcrypt.compare(userPWD, dbPWD).then((checkpwd) => {
                if (checkpwd) {
                    models.find(sID).then((result) => {
                        req.session.sID = sID;
                        req.session.position = result[0].position;
                        req.session.permission = result[0].permission;

                        res.status(200).json({
                            'result': true,
                            "sID": req.session.sID,
                            "position": req.session.position,
                            "permission": req.session.permission
                        });
                        return new Promise((resolve, reject) => {});
                    }).catch((err) => {
                        res.status(500).json({ 'result': err });
                        return new Promise((resolve, reject) => {});
                    })
                } else {
                    res.status(500).json({ 'result': "Password Error." });
                    return new Promise((resolve, reject) => {});
                }
            }).catch(err => {
                res.status(500).json({ 'result': err });
                return new Promise((resolve, reject) => {});
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ 'result': err })
        });
    }
    logout = (req, res) => {
        if (req.session.sID) {
            req.session.destroy();
            res.status(200).json({ 'result': true })
        } else(
            res.status(500).json({ 'result': 'Not Login' })
        )
    }
    check = (req, res) => {
        if (req.session.sID === req.body.sID) {
            res.status(200).json({
                'result': true,
                "sID": req.session.sID,
                "position": req.session.position,
                "permission": req.session.permission
            })
        } else {
            res.status(500).json({ 'result': 'Not Login' });
        }
    }
}
module.exports = new UserController();