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
    sql = `SELECT name FROM member WHERE sID = '${sID}'`;
    conn.query(sql, callback);
  },
  fetch_tableName: (type, objectID, callback) => {
    sql = `SELECT name FROM ${type} WHERE ID = ${objectID}`;
    conn.query(sql, callback);
  },
  fetch_officer: () => {
    return new Promise((resolve, reject) => {
      sql = `SELECT sID,permission FROM officer WHERE permission = '組織負責人' OR permission = '財務負責人' OR permission = '會議負責人'`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  add: (content, type, objectID, eventsID) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO notification(content, type, objectID, eventsID) VALUES('${content}','${type}','${objectID}','${eventsID}')`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  addmember: (notification, sID) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO notification_member(notificationID, sID) VALUES('${notification}','${sID}')`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  fetch_comment: (sID) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT notification.*, logs.timestamp,notification_member.sID FROM notification_member,notification,logs WHERE notification_member.sID = '${sID}' AND notification.ID = notification_member.notificationID AND notification.eventsID = logs.ID ORDER BY notification.ID DESC`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else if (!res.length) {
          reject("There is nothing to show.");
        } else {
          resolve(res);
        }
      });
    });
  },
};
