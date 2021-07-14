const { json } = require('express');
let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    test: (req, callback) => {

        console.log(JSON.parse(req.body.js));

    },
    check: (req, callback) => {
        sql = mysql.format('SELECT COUNT(*) AS num FROM user WHERE sID=? AND password=?', [req.body.sID, req.body.pwd]);
        return conn.query(sql, callback);
    },
    find: (req, callback) => {
        sql = mysql.format('SELECT ID,sID,name,sex,birth,phone FROM user WHERE sID=?', [req.body.sID]);
        return conn.query(sql, callback);
    },
    list: (req, callback) => {
        sql = mysql.format('SELECT sID,name,sex,birth,phone FROM user');
        return conn.query(sql, callback);
    },
    add: (req, callback) => {
        let jsonObj = JSON.parse(req.body.params);
        let sID = jsonObj.sID;
        let password = jsonObj.password;
        let name = jsonObj.name;
        let sex = jsonObj.sex;
        let birth = jsonObj.birth;
        let phone = jsonObj.phone;
        let nickname = jsonObj.nickname;

        sql = mysql.format('INSERT INTO user(sID,password,name,nickname,sex,birth,phone) VALUES(?,?,?,?,?,?)', [sID, password, name, nickname, sex, birth, phone]);
        return conn.query(sql, callback);
    },
    del: (req, callback) => {
        console.log(req.body);
        sql = mysql.format('DELETE FROM user WHERE sID = ? AND password = ?', [req.body.sID, req.body.password]);
        return conn.query(sql, callback);
    },
    patch: (req, callback) => {
        sql = mysql.format('UPDATE user SET name=?,sex=?,birth=?,phone=? WHERE sID = ?', [req.body.name, req.body.sex, req.body.birth, req.body.phone, req.body.sID]);
        return conn.query(sql, callback);
    },
    patchPwd: (req, callback) => {
        sql = mysql.format('UPDATE user SET password=? WHERE sID = ?', [req.body.password, req.body.sID]);
        return conn.query(sql, callback);
    }
}