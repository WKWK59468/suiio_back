const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    checkOfficer: (position, callback) => {
        sql = mysql.format(`SELECT COUNT(*) AS num FROM officer WHERE position = '${position}'`);
        conn.query(sql, callback);
    },
    add: (req, callback) => {
        const body = req.body;
        const name = body.name;
        const category = body.category;
        const cost = body.cost;
        const content = body.content;
        const receipt = body.receipt;
        const uploadBy = body.uploadBy;
        const status = "0";

        sql = mysql.format(`INSERT INTO account(name,category,cost,content,receipt,status,uploadBy) VALUES('${name}','${category}','${cost}','${content}','${receipt}','${status}','${uploadBy}')`);
        return conn.query(sql, callback);
    },
    delete: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        sql = mysql.format(`DELETE FROM account WHERE ID = ${ID}`);
        return conn.query(sql, callback);
    },
    update: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        const name = body.name;
        const cost = body.cost;
        const content = body.content;
        const receipt = body.receipt;

        sql = mysql.format(`UPDATE account SET name = '${name}', cost = '${cost}', content = '${content}', receipt = '${receipt}' WHERE ID = ${ID}`);
        return conn.query(sql, callback);
    },
    updateStatus: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        const status = body.status;

        sql = mysql.format(`UPDATE account SET status = '${status}' WHERE ID = ${ID}`);
        return conn.query(sql, callback);
    },
    fetchAll: (req, callback) => {
        sql = 'SELECT * FROM account';
        return conn.query(sql, callback);
    },
    fetchByStatus: (req, callback) => {
        const body = req.params;
        const status = body.status;

        sql = mysql.format(`SELECT * FROM account WHERE status = '${status}'`);
        return conn.query(sql, callback);
    },
    fetchByName: (req, callback) => {
        const body = req.params;
        const name = "%" + body.name + "%";

        sql = mysql.format(`SELECT * FROM account WHERE name like '${name}'`);
        return conn.query(sql, callback);
    },
    fetchByWhom: (req, callback) => {
        const body = req.params;
        const whom = body.whom;

        sql = mysql.format(`SELECT * FROM account WHERE uploadBy = '${whom}'`);
        return conn.query(sql, callback);
    },
    fetchByDate: (req, callback) => {
        const body = req.params;
        const date = "%" + body.date + "%";

        sql = mysql.format(`SELECT * FROM account WHERE date like '${date}'`);
        return conn.query(sql, callback);
    },
    fetchByID: (req, callback) => {
        const body = req.params;
        const ID = body.ID;

        sql = mysql.format(`SELECT * FROM account WHERE ID = ${ID}`);
        return conn.query(sql, callback);
    },
}