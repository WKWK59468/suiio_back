const e = require("express");
const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

const fetchComment = (commentID) => {
  return new Promise((resolve, reject) => {
    sql = `SELECT * FROM comment WHERE ID = ${commentID}`;
    conn.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else if (!res.length) {
        reject("Comment does not exist.");
      } else {
        const sID = res[0].sID;
        const isHide = res[0].isHide;
        searchName(isHide, sID)
          .then((name) => {
            // console.log(name);
            res[0]["name"] = name;
            resolve(res);
          })
          .catch((anonymousERROR) => {
            reject(anonymousERROR);
          });
      }
    });
  });
};
const searchName = (isHide, sID) => {
  return new Promise((resolve, reject) => {
    let name = "";
    if (isHide == 1) {
      name = "nickname";
    } else {
      name = "name";
    }
    sql = `SELECT ${name} FROM member WHERE sID = ${sID}`;
    conn.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (isHide == 1) {
          resolve(res[0].nickname);
        } else {
          resolve(res[0].name);
        }
      }
    });
  });
};

module.exports = {
  searchSID: (commentID) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT sID FROM comment WHERE ID = ${commentID}`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else if (!res.length) {
          reject("comment not found.");
        } else {
          resolve(res[0].sID);
        }
      });
    });
  },
  searchID: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        sql = `SELECT ID FROM comment ORDER BY ID DESC`;
        conn.query(sql, (err, res) => {
          err ? reject(err) : resolve(res[0].ID);
        });
      }, 1000);
    });
  },
  addTables: (tables, tableID, commentID) => {
    return new Promise((resolve, reject) => {
      sql = `INSERT INTO ${tables}_comment(${tables}ID,commentID) VALUES('${tableID}','${commentID}')`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
  addComment: (comment) => {
    const date = comment.date;
    const content = comment.content;
    const status = comment.status;
    const isHide = comment.isHide;
    const sID = comment.sID;

    return new Promise((resolve, reject) => {
      sql = `INSERT INTO comment(date,content,status,isHide,sID) VALUES('${date}','${content}','${status}',${isHide},'${sID}')`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
  fetchByID: (tables, tableID) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM ${tables}_comment WHERE ${tables}ID = ${tableID}`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else if (!res.length) {
          reject("Comment does not exist.");
        } else {
          let json = {};
          let arr = [];
          let cnt = 0;
          res.forEach((element, index, array) => {
            fetchComment(element.commentID)
              .then((comment) => {
                cnt += 1;
                // 修改回傳日期
                const Year = comment[0].date.getFullYear();
                const Month =
                  comment[0].date.getMonth() + 1 < 10
                    ? "0" + (comment[0].date.getMonth() + 1)
                    : comment[0].date.getMonth() + 1;
                const Date =
                  comment[0].date.getDate() < 10
                    ? "0" + comment[0].date.getDate()
                    : comment[0].date.getDate();
                comment[0].date = Year + "-" + Month + "-" + Date;
                arr.push(comment[0]);
                json[tableID] = arr;
                if (cnt == array.length) {
                  resolve(json);
                }
              })
              .catch((error) => {
                reject(error);
              });
          });
        }
      });
    });
  },
  fetchByMember: (sID) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT * FROM comment WHERE sID = ${sID}`;
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else if (!res.length) {
          reject("There is nothing to show.");
        } else {
          let cnt = 0;
          res.forEach((element, index, array) => {
            const isHide = element.isHide;
            searchName(isHide, sID)
              .then((name) => {
                cnt += 1;
                element["name"] = name;
                if (cnt == array.length) {
                  resolve(res);
                }
              })
              .catch((anonymousERROR) => {
                reject(anonymousERROR);
              });
          });
        }
      });
    });
  },
  fetch: (any) => {
    return new Promise((resolve, reject) => {
      sql = `SELECT ${any}ID FROM ${any}_comment GROUP BY ${any}ID`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  update: (comment) => {
    const commentID = comment.commentID;
    const date = comment.date;
    const content = comment.content;
    const status = comment.status;

    return new Promise((resolve, reject) => {
      sql = `UPDATE comment SET date = '${date}', content = '${content}', status = ${status} WHERE ID = ${commentID}`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  delete: (commentID) => {
    return new Promise((resolve, reject) => {
      sql = `UPDATE comment SET status = 2 WHERE ID = ${commentID}`;
      conn.query(sql, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
};
