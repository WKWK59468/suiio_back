const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    searchID: (req, callback) => {
        sql = `SELECT ID FROM statement ORDER BY ID DESC`;
        return conn.query(sql, callback);
    },
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
    addContent: (statement, account) => {
        sql = mysql.format(`INSERT INTO content(statement,account) VALUES('${statement}','${account}')`);
        return conn.query(sql);
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
    },
    fetchAll: (req, callback) => {
        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.category = category.ID`
        return conn.query(sql, callback);
    },
    fetchAccountByStatement: (statementID, callback) => {
        sql = `SELECT account.* FROM statement,content,account WHERE statement.ID = '${statementID}' AND statement.ID = content.statement AND content.account = account.ID`;
        return conn.query(sql, callback);
    },
    fetchByName: (req, callback) => {
        const body = req.params;
        const name = "%" + body.name + "%";

        sql = `SELECT * FROM statement WHERE name like '${name}'`
        return conn.query(sql, callback);
    },
    fetchByStatus: (req, callback) => {
        const body = req.params;
        const status = body.status;

        sql = `SELECT * FROM statement WHERE status = ${status}`
        return conn.query(sql, callback);
    },
    fetchByWhom: (req, callback) => {
        const body = req.params;
        const whom = body.whom;

        sql = `SELECT * FROM statement WHERE uploadBy = '${whom}'`
        return conn.query(sql, callback);
    },
    fetchByID: (req, callback) => {
        const body = req.params;
        const ID = body.ID;

        sql = `SELECT * FROM statement WHERE id = ${ID}`
        return conn.query(sql, callback);
    },
    fetchByDate: (req, callback) => {
        const body = req.params;
        const date = "%" + body.date + "%";

        sql = `SELECT * FROM statement WHERE date like '${date}'`
        return conn.query(sql, callback);
    }
}