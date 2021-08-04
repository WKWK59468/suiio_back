const models = require('../models/member');

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
                        break;
                    case "2":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "3":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3" || sIDArray[6] == "4") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "4":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case "5":
                        if (sIDArray[6] == "1" || sIDArray[6] == "2" || sIDArray[6] == "3") {
                            return true;
                        } else {
                            return false;
                        }
                        break;
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

class UserController {
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
}
module.exports = new UserController();