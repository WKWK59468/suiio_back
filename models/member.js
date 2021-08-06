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
    find: (req, callback) => {
        sql = mysql.format('SELECT ID,sID,name,sex,birth,phone FROM member WHERE sID=?', [req.body.sID]);
        return conn.query(sql, callback);
    },
    list: (req, callback) => {
        sql = mysql.format('SELECT sID,name,nickname,sex,birth,phone FROM member');
        return conn.query(sql, callback);
    },
    add: async(req, callback) => {
        const sID = req.body.sID;
        const name = "王小明";
        const nickname = "小王";
        const sex = "男";
        const birth = "2021-07-14";

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("12345678", salt)

        sql = mysql.format('INSERT INTO member(sID,password,name,nickname,sex,birth) VALUES(?,?,?,?,?,?)', [sID, password, name, nickname, sex, birth]);
        return conn.query(sql, callback);
    },
    del: (req, callback) => {
        sql = mysql.format('DELETE FROM member WHERE sID = ?', [req.body.sID]);
        return conn.query(sql, callback);
    },
    patch: (req, callback) => {
        sql = mysql.format('UPDATE member SET name=?,sex=?,birth=?,phone=? WHERE sID = ?', [req.body.name, req.body.sex, req.body.birth, req.body.phone, req.body.sID]);
        return conn.query(sql, callback);
    },
    patchPwd: (req, callback) => {
        sql = mysql.format('UPDATE member SET password=? WHERE sID = ?', [req.body.password, req.body.sID]);
        return conn.query(sql, callback);
    }
}