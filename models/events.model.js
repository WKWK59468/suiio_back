const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";
module.exports = {
    fetch: (type, objectID) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT who FROM events WHERE type = '${type}' AND objectID = ${objectID} GROUP BY who`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            })
        })
    }
}