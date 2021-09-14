const models = require('../models/member');
const bcrypt = require('bcrypt');
const myFunction = require('../myFunction');
const mail = require('../mail/mail');
const { Server } = require('http');

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
            myFunction.check_session(req).then(() => {
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
            }).catch(() => {
                res.status(404).json({ 'result': 'Not Login' })
            })
        }
        //新增
    addMember = (req, res) => {
            myFunction.check_permission(req).then((permission) => {
                if (permission == "組織負責人") {
                    const sID = req.body.sID;
                    if (check_sID(sID)) {
                        models.add(req).then(function(pwd) {
                            console.log(pwd);
                            mail.sendMail(req, pwd).then(() => {
                                res.status(200).json({ "result": true });
                            });
                        }).catch(function(err) {
                            res.status(500).json({ "result": err });
                            // console.log("sql：" + err)

                        })
                    } else {
                        res.status(500).json({ "result": "format error" });
                        return new Promise((resolve, reject) => {});
                    }
                } else {
                    res.status(403).json({ 'result': 'Permission denied.' })
                    return new Promise((resolve, reject) => {});
                }
            }).catch(() => {
                res.status(404).json({ 'result': 'Not Login' })
                return new Promise((resolve, reject) => {});
            });
        }
        //刪除user
    delMember = (req, res) => {
            myFunction.check_permission(req).then((permission) => {
                if (permission == "組織負責人") {
                    const sID = req.body.sID;
                    if (check_sID(sID)) {
                        models.del(req, (err, results) => {
                            if (err) {
                                res.status(500).json({ 'result': err });
                                return new Promise((resolve, reject) => {});
                            }
                            if (!results.affectedRows) {
                                res.status(404).json({ 'result': "Can't find member." });
                                return new Promise((resolve, reject) => {});
                            }
                            res.status(200).json({ 'result': true });
                            return new Promise((resolve, reject) => {});
                        });
                    } else {
                        res.status(500).json({ "result": "format error" });
                        return new Promise((resolve, reject) => {});
                    }
                } else {
                    res.status(403).json({ 'result': 'Permission denied.' })
                    return new Promise((resolve, reject) => {});
                }
            }).catch(() => {
                res.status(404).json({ "result": "Not Login" });
                return new Promise((resolve, reject) => {});
            });
        }
        //修改user資訊
    patchUser = (req, res) => {
            myFunction.check_session(req).then(() => {
                models.patch(req, (err, results) => {
                    if (err) {
                        res.sendStatus(500).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    }

                    if (!results.affectedRows) {
                        res.sendStatus(410).json({ "result": err });
                        return new Promise((resolve, reject) => {});
                    }
                    res.status(200).json({ 'result': true });
                    return new Promise((resolve, reject) => {});
                })
            }).catch(() => {
                res.status(404).json({ 'result': 'Not Login' })
            })

        }
        //修改密碼
    patchPassword = (req, res) => {
        myFunction.check_session(req).then(() => {
            models.patchPwd(req, (err, results) => {
                if (err) {
                    res.sendStatus(500).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                }
                if (!results.affectedRows) {
                    res.sendStatus(410).json({ "result": err });
                    return new Promise((resolve, reject) => {});
                }
                res.status(200).json({ 'result': true });
                return new Promise((resolve, reject) => {});
            })
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
        })

    }
    login = (req, res) => {
        myFunction.check_session(req).then(() => {
            res.status(404).json({ 'result': 'isLogin' })
            return new Promise((resolve, reject) => {});
        }).catch(() => {
            const body = req.body;
            const sID = body.sID;
            const userPWD = body.password;

            models.login(body).then((dbPWD) => {

                bcrypt.compare(userPWD, dbPWD).then((checkpwd) => {
                    if (checkpwd) {
                        models.find(sID).then((result) => {
                            if (result == 'Member is not officer.') {
                                req.session.sID = sID;
                                req.session.position = '組織成員';
                                req.session.permission = '組織成員';
                                res.status(200).json({
                                    'result': result,
                                    "sID": req.session.sID,
                                    "position": req.session.position,
                                    "permission": req.session.permission
                                });
                                return new Promise((resolve, reject) => {});
                            } else {
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
                            }
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
        })

    }
    logout = (req, res) => {
        myFunction.check_session(req).then(() => {
            req.session.destroy();
            res.status(200).json({ 'result': true })
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' })
        });
    }
    check = (req, res) => {
        myFunction.check_session(req).then(() => {
            res.status(200).json({
                'result': true,
                "sID": req.session.sID,
                "position": req.session.position,
                "permission": req.session.permission
            });
        }).catch(() => {
            res.status(404).json({ 'result': 'Not Login' });
        });
    }
}
module.exports = new UserController();