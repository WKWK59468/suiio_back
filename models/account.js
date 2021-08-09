const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    checkOfficer: (position, callback) => {
        sql = mysql.format('SELECT COUNT(*) AS num FROM officer WHERE position = ?', position);
        conn.query(sql, callback);
    },
    add: (req, callback) => {
        const body = req.body;
        const name = body.name;
        const cost = body.cost;
        const content = body.content;
        const receipt = body.receipt;
        const uploadBy = body.uploadBy;
        const status = "0";

        sql = mysql.format('INSERT INTO account(name,cost,content,receipt,status,uploadBy) VALUES(?,?,?,?,?,?)', [name, cost, content, receipt, status, uploadBy]);
        return conn.query(sql, callback);
    },
    delete: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        sql = mysql.format('DELETE FROM account WHERE ID=?', [ID]);
        return conn.query(sql, callback);
    },
    update: (req, callback) => {
        sql = mysql.format('SELECT * FROM account WHERE ID=?', [req.body.aID]);
        return conn.query(sql, callback);
    },
    fetchAll: (req, callback) => {
        sql = 'SELECT * FROM account';
        return conn.query(sql, callback);
    },
    fetchStatus: (req, callback) => {
        const body = req.params;
        const status = body.status;

        sql = mysql.format('SELECT * FROM account WHERE status = ?', status)
        return conn.query(sql, callback);
    },
}