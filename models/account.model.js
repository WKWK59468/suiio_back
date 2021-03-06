const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createPool(conf.db);
let sql = "";

const diagram_sql = `category.name AS category,account.name,account.uploadBy,account.amount,account.date`;

module.exports = {
  checkOfficer: (position, callback) => {
    return new Promise((resolve, reject) => {
      sql = mysql.format(
        `SELECT COUNT(*) AS num FROM officer WHERE position = '${position}'`
      );
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res[0].num);
      });
    });
  },
  add: (req, callback) => {
    const body = req.body;
    const name = body.name;
    const category = body.category;
    const date = body.date;
    const amount = body.amount;
    const content = body.content;
    const receipt = body.receipt;
    const uploadBy = body.uploadBy;
    const status = "0";

    sql = mysql.format(
      `INSERT INTO account(name,category,amount,date,content,receipt,status,uploadBy) VALUES('${name}','${category}','${amount}','${date}','${content}','${receipt}','${status}','${uploadBy}')`
    );
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
    const amount = body.amount;
    const content = body.content;
    const receipt = body.receipt;

    sql = mysql.format(
      `UPDATE account SET name = '${name}', amount = '${amount}', content = '${content}', receipt = '${receipt}' WHERE ID = ${ID}`
    );
    return conn.query(sql, callback);
  },
  updateStatus: (req, callback) => {
    const body = req.body;
    const ID = body.ID;
    const status = body.status;

    sql = mysql.format(
      `UPDATE account SET status = '${status}' WHERE ID = ${ID}`
    );
    return conn.query(sql, callback);
  },
  fetchAll: (req, callback) => {
    sql =
      "SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.status, account.uploadBy FROM account,category WHERE account.category = category.ID ORDER BY account.date DESC,account.ID DESC";
    return conn.query(sql, callback);
  },
  fetchByStatus: (req, callback) => {
    const body = req.params;
    const status = body.status;

    sql = mysql.format(
      `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.status, account.uploadBy FROM account,category WHERE account.status = '${status}' AND account.category = category.ID ORDER BY account.date DESC,account.ID DESC`
    );
    return conn.query(sql, callback);
  },
  fetchByName: (req, callback) => {
    const body = req.params;
    const name = "%" + body.name + "%";

    sql = mysql.format(
      `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.status, account.uploadBy FROM account,category WHERE account.name like '${name}' AND account.category = category.ID ORDER BY account.date DESC,account.ID DESC`
    );
    return conn.query(sql, callback);
  },
  fetchByWhom: (req, callback) => {
    const body = req.params;
    const whom = body.whom;

    sql = mysql.format(
      `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.status, account.uploadBy FROM account,category WHERE account.uploadBy = '${whom}' AND account.category = category.ID ORDER BY account.date DESC,account.ID DESC`
    );
    return conn.query(sql, callback);
  },
  fetchByDate: (req, callback) => {
    const body = req.params;
    const date = "%" + body.date + "%";

    sql = mysql.format(
      `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.status, account.uploadBy FROM account,category WHERE account.date like '${date}' AND account.category = category.ID ORDER BY account.date DESC,account.ID DESC`
    );
    return conn.query(sql, callback);
  },
  fetchByID: (req, callback) => {
    const body = req.params;
    const ID = body.ID;

    sql = mysql.format(
      `SELECT account.ID, account.date, category.name AS category, account.name, account.amount, account.content, account.receipt, account.status, account.uploadBy FROM account,category WHERE account.ID = ${ID} AND account.category = category.ID`
    );
    return conn.query(sql, callback);
  },
  diagram: (year, month, last_month) => {
    let now_month;
    let last1_month;
    let last2_month;
    let last3_month;

    if (month < 10) {
      now_month = "0" + month;
    } else {
      now_month = month;
    }
    if (last_month < 10) {
      last3_month = "0" + last_month;
    }
    const now_date = year + "-" + now_month + "-31";
    const last_date = year + "-" + last3_month + "-01";

    if (now_month == 1) {
      last1_month = 12;
      last2_month = 11;
      last3_month = 10;
    } else if (now_month == 2) {
      last1_month = 1;
      last2_month = 12;
      last3_month = 11;
    } else if (now_month == 3) {
      last1_month = 2;
      last2_month = 1;
      last3_month = 12;
    } else {
      last1_month = month - 1;
      last2_month = last1_month - 1;
      last3_month = last2_month - 1;
    }

    let obj = {};
    obj[month] = [];
    obj[last1_month] = [];
    obj[last2_month] = [];
    obj[last3_month] = [];
    return new Promise((resolve, reject) => {
      sql = `SELECT ${diagram_sql} FROM account,category WHERE account.date >= '${last_date}' AND account.date <= '${now_date}' AND category.ID = account.category AND account.status = 1 ORDER BY account.date DESC`;
      return conn.query(sql, (err, res) => {
        res.forEach((element) => {
          obj[element.date.getMonth() + 1].push({
            name: element.name,
            uploadBy: element.uploadBy,
            amount: element.amount,
            category: element.category,
          });
        });
        err
          ? reject(err)
          : res.length
          ? resolve(obj)
          : reject("There is nothing to show.");
      });
    });
  },
  diagram_compare: (year, next_year, schoolyear) => {
    const now_date = year + "-07-01";
    const next_date = next_year + "-06-30";

    if (schoolyear === "108") {
      const now_date_108 = year + "-06-01";
      const next_date_108 = next_year + "-06-30";
      return new Promise((resolve, reject) => {
        sql = `SELECT ${diagram_sql},account.category AS categoryID FROM account,category WHERE category.ID = account.category AND account.date >= '${now_date_108}' AND account.date <= '${next_date_108}' AND account.status = 1 ORDER BY account.date DESC,account.ID DESC`;
        conn.query(sql, (err, res) => {
          err
            ? reject(err)
            : res.length
            ? resolve(res)
            : reject("There is nothing to show.");
        });
      });
    } else if (schoolyear === "107") {
      const now_date_107 = year + "-07-01";
      const next_date_107 = next_year + "-05-31";
      return new Promise((resolve, reject) => {
        sql = `SELECT ${diagram_sql},account.category AS categoryID FROM account,category WHERE category.ID = account.category AND account.date >= '${now_date_107}' AND account.date <= '${next_date_107}' AND account.status = 1 ORDER BY account.date DESC,account.ID DESC`;
        conn.query(sql, (err, res) => {
          err
            ? reject(err)
            : res.length
            ? resolve(res)
            : reject("There is nothing to show.");
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        sql = `SELECT ${diagram_sql},account.category AS categoryID FROM account,category WHERE category.ID = account.category AND account.date >= '${now_date}' AND account.date <= '${next_date}' AND account.status = 1 ORDER BY account.date DESC,account.ID DESC`;
        conn.query(sql, (err, res) => {
          err
            ? reject(err)
            : res.length
            ? resolve(res)
            : reject("There is nothing to show.");
        });
      });
    }
  },
};
