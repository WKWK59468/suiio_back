const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        sql = mysql.format('INSERT INTO account(name,coin,content) VALUES(?,?,?)', [req.body.name, req.body.coin, req.body.content]);
        return conn.query(sql, callback);
    },
    search: (req, callback) => {
        sql = mysql.format('SELECT * FROM account WHERE ID=?', [req.body.aID]);
        return conn.query(sql, callback);
    },
    get: (req, callback) => {
        sql = 'SELECT * FROM account';
        return conn.query(sql, callback);
    }
}