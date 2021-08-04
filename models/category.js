const mysql = require('mysql');
const conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        const body = req.body;
        const name = body.name;
        const status = '0';

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
        const body = req.body;
        const ID = body.ID;
        const status = body.status;

        sql = mysql.format('UPDATE category SET status=? WHERE ID = ?', [status, ID]);
        return conn.query(sql, callback);
    }
}