const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

module.exports = {
  check: (category) => {
    sql = `SELECT status FROM category WHERE ID = ${category}`;
    return new Promise((resolve, reject) => {
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res[0].status);
      })
    })
  },
  add: (req, callback) => {
    const body = req.body;
    const name = body.name;
    const status = "0";

    sql = mysql.format("INSERT INTO category(name,status) VALUES(?,?)", [
      name,
      status,
    ]);
    return conn.query(sql, callback);
  },
  list: (req, callback) => {
    sql = mysql.format("SELECT * FROM category");
    return conn.query(sql, callback);
  },
  StatusOn: (req, callback) => {
    sql = mysql.format(
      `SELECT * FROM category WHERE status = ${req.params.status}`
    );
    return conn.query(sql, callback);
  },
  del: (req, callback) => {
    sql = mysql.format("DELETE FROM category WHERE ID = ?", [req.body.ID]);
    return conn.query(sql, callback);
  },
  setStatus: (req, callback) => {
    const body = req.body;
    const ID = body.ID;
    const status = body.status;

    sql = mysql.format("UPDATE category SET status=? WHERE ID = ?", [
      status,
      ID,
    ]);
    return conn.query(sql, callback);
  },
};
