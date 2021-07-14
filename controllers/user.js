let models = require('../models/user');

class UserController {
    testUser = (req, res) => {
            models.test(req, (err, results) => {
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
        //查證帳號密碼是否正確
    getLogin = (req, res) => {
            models.check(req, (err, results) => {
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
    listUser = (req, res) => {
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
    addUser = (req, res) => {
            models.add(req, (err, results) => {
                if (err) {
                    res.status(500).json({ "result": "false" });
                    return console.error(err);
                }

                res.json({ "result": "true" });
            })
        }
        //刪除user
    delUser = (req, res) => {
            models.del(req, (err, results) => {
                if (err) {
                    res.sendStatus(500);
                    return console.error(err);
                }

                if (!results.affectedRows) {
                    res.sendStatus(404);
                    console.log(err);
                    return;
                }

                res.json({ 'result': 'true' });
            })
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