let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        sql = mysql.format('INSERT INTO category(name,status,cID) VALUES(?,?,?)', [req.body.name, req.body.status, req.body.cID]);
        return conn.query(sql, callback);
    },
    patch: (req, callback) => {
        sql = mysql.format('UPDATE category SET name=?,status=? WHERE ID = ?', [req.body.name, req.body.status, req.body.ID]);
        return conn.query(sql, callback);
    }
}