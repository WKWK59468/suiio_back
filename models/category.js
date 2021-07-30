let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        let body = req.body;
        let name = body.name;
        let status = '0';

        sql = mysql.format('INSERT INTO category(name,status) VALUES(?,?)', [name, status]);
        return conn.query(sql, callback);
    },
    list: (req, callback) => {
        sql = mysql.format('SELECT * FROM category');
        return conn.query(sql, callback);
    },
    del: (req, callback) => {
        sql = mysql.format('DELETE FROM category WHERE ID = ?', [req.body.ID]);
        return conn.query(sql, callback);
    },
    setStatus: (req, callback) => {
        sql = mysql.format('UPDATE category SET status=? WHERE ID = ?', [req.body.status, req.body.ID]);
        return conn.query(sql, callback);
    }
}