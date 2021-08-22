const mysql = require('mysql');
const conf = require('../conf');

const conn = mysql.createConnection(conf.db);
let sql = '';

const searchbalance = (lastStatement, category, name, date, status, uploadBy) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT balance FROM statement WHERE ID = ${lastStatement}`;
        conn.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let sql2 = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy,balance) VALUES('${name}','${category}','${date}','${status}','${uploadBy}',${res[0].balance})`);
                conn.query(sql2, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
}

module.exports = {
    searchID: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                sql = `SELECT ID FROM statement ORDER BY ID DESC`;
                return conn.query(sql, (err, res) => {
                    err ? reject(err) : resolve(res[0].ID);
                });
            }, 1000);
        });
    },
    add: (req) => {
        return new Promise((resolve, reject) => {
            const body = req.body;
            const lastStatement = body.lastStatement;
            const category = body.category;
            const name = body.name;
            const date = body.date;
            const status = 0;
            const uploadBy = body.uploadBy;
            let balance;
            if (lastStatement == null || lastStatement == "") {
                balance = 0;
                sql = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy,balance) VALUES('${name}','${category}','${date}','${status}','${uploadBy}',${balance})`);
                conn.query(sql, (err, res) => {
                    err ? reject(err) : resolve(res);
                });
            } else {
                searchbalance(lastStatement, category, name, date, status, uploadBy).then(res => { resolve(res) }).catch(err => { reject(err) });
            }
        })
    },
    addContent: (statement, account) => {
        return new Promise((resolve, reject) => {
            sql = mysql.format(`INSERT INTO content(statement,account) VALUES('${statement}','${account}')`);
            return conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        })
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
        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchAccountByStatement: (statementID, callback) => {
        sql = `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.content, account.receipt, account.status, account.uploadBy FROM statement,content,account,category WHERE statement.ID = '${statementID}' AND statement.ID = content.statement AND content.account = account.ID AND account.category = category.ID ORDER BY date DESC`;
        return conn.query(sql, callback);
    },
    fetchByName: (req, callback) => {
        const body = req.params;
        const name = "%" + body.name + "%";

        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.name like '${name}' AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchByStatus: (req, callback) => {
        const body = req.params;
        const status = body.status;

        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.status = ${status} AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchByWhom: (req, callback) => {
        const body = req.params;
        const whom = body.whom;

        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.uploadBy = '${whom}' AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchByID: (req, callback) => {
        const body = req.params;
        const ID = body.ID;

        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.ID = ${ID} AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchByDate: (req, callback) => {
        const body = req.params;
        const date = "%" + body.date + "%";

        sql = `SELECT statement.ID,category.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.date like '${date}' AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    }
}