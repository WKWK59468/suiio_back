let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    check: (req, callback) => {
        sql = mysql.format('SELECT COUNT(*) AS num FROM user WHERE sID=? AND password=?', [req.body.sID, req.body.pwd]);
        return conn.query(sql, callback);
    },
    find: (req, callback) => {
        sql = mysql.format('SELECT ID,sID,name,sex,birth,phone FROM user WHERE sID=?', [req.body.sID]);
        return conn.query(sql, callback);
    },
    add: (req, callback) => {
        sql = mysql.format('INSERT INTO user(sID,password,name,sex,birth,phone) VALUES(?,?,?,?,?,?)', [req.body.sID, req.body.password, req.body.name, req.body.sex, req.body.birth, req.body.phone]);
        return conn.query(sql, callback);
    },
    patch: (req, callback) => {
        sql = mysql.format('UPDATE user SET name=?,sex=?,birth=?,phone=? WHERE ID = ?', [req.body.name, req.body.sex, req.body.birth, req.body.phone, req.body.ID]);
        return conn.query(sql, callback);
    },
    patchPwd: (req, callback) => {
        sql = mysql.format('UPDATE user SET password=? WHERE ID = ?', [req.body.password, req.body.ID]);
        return conn.query(sql, callback);
    }
}