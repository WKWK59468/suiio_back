const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        const body = req.body;
        const category = body.category;
        const name = body.name;
        const date = body.date;
        const status = 0;
        const uploadBy = body.uploadBy;

        sql = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy) VALUES('${name}','${category}','${date}','${status}','${uploadBy}')`);
        return conn.query(sql, callback);
    },
    addContent: (statement, account, callback) => {
        sql = mysql.format(`INSERT INTO content(statement,account) VALUES('${statement}','${account}')`);
        return conn.query(sql, callback);
    },
    delete: (req, callback) => {
        const body = req.body;
        const ID = body.ID;

        sql = mysql.format(`DELETE FROM statement WHERE ID = '${ID}'`);
        return conn.query(sql, callback);
    },
    update: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        const category = body.category;
        const name = body.name;
        const date = body.date;

        sql = mysql.format(`UPDATE statement SET category = '${category}', name = '${name}', date = '${date}' WHERE ID = '${ID}'`);
        return conn.query(sql, callback);
    },
    updateStatus: (req, callback) => {
        const body = req.body;
        const ID = body.ID;
        const status = body.status;

        sql = mysql.format(`UPDATE statement SET status = '${status}' WHERE ID = '${ID}'`);
        return conn.query(sql, callback);
    }
}