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
                isAnonymous(sID).then((anonymous) => {
                    searchName(anonymous, sID).then((name) => {
                        // console.log(name);
                        res[0]["name"] = name;
                        resolve(res);
                    }).catch((anonymousERROR) => {
                        reject(anonymousERROR);
                    });
                }).catch((error) => {
                    reject(error);
                });
            }
        })
    });
}
const isAnonymous = (sID) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT anonymous FROM member WHERE sID = ${sID}`;
        conn.query(sql, (err, res) => {
            err ? reject(err) : resolve(res[0].anonymous);

        })
    });
}
const searchName = (anonymous, sID) => {
    return new Promise((resolve, reject) => {
        let name = '';
        if (anonymous == "1") {
            name = 'nickname';
        } else {
            name = 'name';
        }
        sql = `SELECT ${name} FROM member WHERE sID = ${sID}`;
        conn.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (anonymous == "1") {
                    resolve(res[0].nickname);
                } else {
                    resolve(res[0].name);
                }
            }

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
                        isAnonymous(element.sID).then((anonymous) => {
                            searchName(anonymous, sID).then((name) => {
                                cnt += 1;
                                element["name"] = name;
                                if (cnt == array.length) {
                                    resolve(res);
                                }
                            }).catch((anonymousERROR) => {
                                reject(anonymousERROR);
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    })
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