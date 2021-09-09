const mysql = require('mysql');
const conf = require('../conf');
const account = require('./account');

const conn = mysql.createConnection(conf.db);
let sql = '';

const searchbalance = (lastStatement, category, name, date, status, uploadBy) => {
    // monthFormat = new Date(date);
    // month = monthFormat.getFullYear() + "-" + (monthFormat.getMonth() + 1);
    return new Promise((resolve, reject) => {
        sql = `SELECT balance FROM statement WHERE ID = ${lastStatement}`; //搜尋上期餘額
        conn.query(sql, (err, res) => {
            const balance = res[0].balance;
            if (err) {
                reject(err);
            } else {
                // 計算本期餘額
                countBalance(date, balance).then(newBalance => {
                    AddStatement(category, name, status, uploadBy, newBalance).catch(addError => {
                        reject(addError);
                    });
                }).catch(error => {
                    reject(error);
                });
            }
        });
    });
}

const AddStatement = (category, name, status, uploadBy, balance) => {
    let date = new Date();
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return new Promise((resolve, reject) => {
        const sql = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy,balance) VALUES('${name}','${category}','${date}','${status}','${uploadBy}',${balance})`);
        conn.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

const countBalance = (month, balance) => {
    month = month + "-%";
    let total = 0;
    let newBalance = 0;
    return new Promise((resolve, reject) => {
        console.log(month)
        const sql = `SELECT amount FROM account WHERE date LIKE '${month}'`;
        conn.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                res.forEach(element => {
                    total += element.amount;
                });
                newBalance = balance + total;
                resolve(newBalance)
            }
        });
    });
};

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
            const category = body.category;
            const name = body.name;
            const getDate = new Date();
            const date = getDate.getFullYear() + "-" + (getDate.getMonth() + 1) + "-" + getDate.getDate();
            const status = 0;
            const uploadBy = body.uploadBy;
            const balance = 0;

            sql = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy,balance) VALUES('${name}','${category}','${date}','${status}','${uploadBy}',${balance})`);
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        })
    },
    addByCategory: (req) => {
        return new Promise((resolve, reject) => {
            const body = req.body;
            const category = body.category;
            const name = body.name;
            const date = body.date;
            const status = 0;
            const uploadBy = body.uploadBy;
            const balance = 0;

            sql = mysql.format(`INSERT INTO statement(name,category,date,status,uploadBy,balance) VALUES('${name}','${category}','${date}','${status}','${uploadBy}',${balance})`);
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        })
    },
    addByMonth: (req) => {
        return new Promise((resolve, reject) => {
            const body = req.body;
            const lastStatement = body.lastStatement;
            const category = "0";
            const name = body.name;
            const date = body.date;
            const status = 0;
            const uploadBy = body.uploadBy;

            searchbalance(lastStatement, category, name, date, status, uploadBy).then(res => { resolve(res) }).catch(err => { reject(err) });

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
    fetchAccountByStatement: (statementID) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.content, account.receipt, account.status, account.uploadBy FROM statement,content,account,category WHERE statement.ID = '${statementID}' AND statement.ID = content.statement AND content.account = account.ID AND account.category = category.ID ORDER BY date DESC`;
            return conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
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

        sql = `SELECT statement.ID,cateory.name AS category,statement.name,statement.date,statement.status,statement.uploadBy FROM statement,category WHERE statement.date like '${date}' AND statement.category = category.ID ORDER BY date DESC`
        return conn.query(sql, callback);
    },
    fetchAccountByCategory: (category) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT * FROM account WHERE category = ${category}`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        });
    },
    fetchAccountByMonth: (Month) => {
        (Month < 10) ? Month = "0" + Month: Month = Month;
        Month = "%-" + Month + "-%";
        return new Promise((resolve, reject) => {
            sql = `SELECT * FROM account WHERE date like '${Month}'`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        });
    }
}