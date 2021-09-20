const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

const fetchComment = (commentID, nick) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT member.${nick} FROM comment,member WHERE comment.ID = ${commentID} AND comment.sID = member.sID`;
        conn.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else if (!res.length) {
                reject("Comment does not exist.");
            } else {
                const sID = res[0].sID;
                nick_OR_true(sID).then((nickORtrue) => {
                    //nickname or name
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            }
        })
    });
}
const nick_OR_true = (sID) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT nickORtrue FROM member WHERE sID = ${sID}`;
        conn.query(sql, (err, res) => {
            err ? reject(err) : resolve(res);

        })
    });
}

module.exports = {
    searchSID: (commentID) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT sID FROM comment WHERE ID = ${commentID}`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res[0].sID);
            })
        });
    },
    searchID: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                sql = `SELECT ID FROM comment ORDER BY ID DESC`;
                conn.query(sql, (err, res) => {
                    err ? reject(err) : resolve(res[0].ID);
                })
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
            })
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
            })
        });
    },
    fetchByID: (tables, tableID) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT * FROM ${tables}_comment WHERE ${tables}ID = ${tableID}`;
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else if (!res.length) {
                    reject("Comment does not exist.")
                } else {
                    let json = {};
                    let arr = [];
                    let cnt = 0;
                    res.forEach((element, index, array) => {
                        fetchComment(element.commentID).then((comment) => {
                            cnt += 1;
                            arr.push(comment[0]);
                            json[tableID] = arr;
                            if (cnt == array.length) {
                                resolve(json);
                            }
                        }).catch((error) => {
                            reject(error);
                        })
                    });

                }
            })
        });
    },
    fetch: (any) => {
        return new Promise((resolve, reject) => {
            sql = `SELECT ${any}ID FROM ${any}_comment GROUP BY ${any}ID`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            })
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
            })
        });
    },
    delete: (commentID, isHide) => {
        return new Promise((resolve, reject) => {
            sql = `UPDATE comment SET isHide = ${isHide} WHERE ID = ${commentID}`;
            conn.query(sql, (err, res) => {
                err ? reject(err) : resolve(res);
            })
        });
    }
}