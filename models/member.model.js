const mysql = require('mysql');
const conf = require('../conf');
const bcrypt = require('bcrypt');

const conn = mysql.createConnection(conf.db);
let sql = '';

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const num = () => String.fromCharCode(rand(48, 57));
const up = () => String.fromCharCode(rand(65, 90));
const low = () => String.fromCharCode(rand(97, 122));

//隨機碼
function pwd_rand() {
    let str = "";
    for (let i = 0; i < 8; i++) {
        switch (rand(1, 3)) {
            case 1:
                str += num();
                break;
            case 2:
                str += up();
                break;
            case 3:
                str += low();
                break;
        }
    }
    return str;
}
module.exports = {
    find: (sID) => {
        return new Promise((resolve, reject) => {
            sql = mysql.format(`SELECT position, permission FROM officer WHERE sID = ${sID}`);
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else if (!res.length) {
                    resolve('Member is not officer.');
                } else {
                    resolve(res);
                }
            });
        });
    },
    list: (req, callback) => {
        sql = mysql.format('SELECT sID,name,nickname,sex,birth FROM member');
        return conn.query(sql, callback);
    },
    add: (req) => {
        return new Promise(async(resolve, reject) => {
            const sID = req.body.sID;
            const name = "王小明";
            const nickname = "小王";
            const sex = "男";
            const birth = "2021-07-14";
            const anonymous = "1"
            const pwd = pwd_rand();
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(pwd, salt)

            sql = mysql.format('INSERT INTO member(sID,password,name,nickname,sex,birth,anonymous) VALUES(?,?,?,?,?,?,?)', [sID, password, name, nickname, sex, birth, anonymous]);
            conn.query(sql, (err, res) => {
                if (err) {
                    if (err.sqlState == "23000") {
                        reject("Duplicate primary key");
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(pwd);
                }
            });
        })
    },
    del: (req, callback) => {
        sql = mysql.format('DELETE FROM member WHERE sID = ?', [req.body.sID]);
        return conn.query(sql, callback);
    },
    updateAnonymous: (anonymous, sID) => {
        return new Promise((resolve, reject) => {
            sql = `UPDATE member SET anonymous = '${anonymous}' WHERE sID = ${sID}`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            })
        });
    },
    patch: (req, callback) => {
        sql = mysql.format('UPDATE member SET name=?,sex=?,birth=? WHERE sID = ?', [req.body.name, req.body.sex, req.body.birth, req.body.sID]);
        return conn.query(sql, callback);
    },
    patchPwd: (req, callback) => {
        sql = mysql.format('UPDATE member SET password=? WHERE sID = ?', [req.body.password, req.body.sID]);
        return conn.query(sql, callback);
    },
    login: (body) => {
        const sID = body.sID;
        return new Promise((resolve, reject) => {
            sql = `SELECT password FROM member WHERE sID = '${sID}'`;
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else if (!res.length) {
                    reject('User Not Found.');
                } else {
                    resolve(res[0].password);
                }
            });
        });
    }
}