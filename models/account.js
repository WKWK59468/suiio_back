let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        sql = mysql.format('INSERT INTO account(name,coin,content) VALUES(?,?,?)', [req.body.name, req.body.coin, req.body.content]);
        return conn.query(sql, callback);
    },
    delete: (req, callback) => {
        sql = mysql.format('DELETE FROM account WHERE ID=?', [req.body.ID]);
        return conn.query(sql, callback);
    },
    update: (req, callback) => {
        sql = mysql.format('SELECT * FROM account WHERE ID=?', [req.body.aID]);
        return conn.query(sql, callback);
    },
    fetchAll: (req, callback) => {
        sql = 'SELECT * FROM account';
        return conn.query(sql, callback);
    }
}