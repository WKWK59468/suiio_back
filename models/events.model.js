const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createPool(conf.db);
let sql = "";
module.exports = {

    fetch: (type, objectID, callback) => {
        sql = `SELECT ${type}ID FROM ${type}_comment WHERE commentID = ${objectID} GROUP BY ${type}ID`;
        conn.query(sql, callback);
    },
    fetch_sID: (type, objectID, callback) => {
        sql = `SELECT comment.sID FROM ${type}_comment,comment WHERE ${type}_comment.${type}ID = ${objectID} AND comment.ID = ${type}_comment.commentID GROUP BY comment.sID`;
        conn.query(sql, callback);
    },
    fetch_neme: (sID, callback) => {
        sql = `SELECT nickname FROM member WHERE sID = '${sID}'`;
        conn.query(sql, callback);
    },
    fetch_tableName: (type, objectID, callback) => {
        sql = `SELECT name FROM ${type} WHERE ID = ${objectID}`;
        console.log(sql)
        conn.query(sql, callback);
    }
}