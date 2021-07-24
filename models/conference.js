const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

const jsonObj = {
    category: "3",
    name: "聖誕晚會第二次會議",
    date: "2021-07-25",
    attatched_file: "christmas",
    content: "表演獎金增加",
    host: "活動長",
    status: "0",
};

module.exports = {
    list: (req, callback) => {
        sql = mysql.format("SELECT * FROM conference");
        return conn.query(sql, callback);
    },
    fetchBycategory: (req, callback) => {
        sql = mysql.format(
            "SELECT conference.* FROM conference,category WHERE category.ID = ? AND conference.category = category.ID", [req.params.id]
        );
        return conn.query(sql, callback);
    },
    fetchOne: (req, callback) => {
        sql = mysql.format("SELECT * FROM conference WHERE conference.ID = ?", [
            req.params.id,
        ]);
        return conn.query(sql, callback);
    },
    upload: (req, callback) => {
        let body = JSON.parse(req.body.params);
        let category = body.category;
        let name = body.name;
        let date = body.date;
        let attached_file;
        let content = body.content;
        let host = body.host;
        let status = "0";

        if (body.attached_file == null || body.attached_file == "") {
            attached_file = null;
        } else {
            attached_file = body.attached_file;
        }

        sql = mysql.format(
            "INSERT INTO conference(category,name,date,attached_file,content,host,status) VALUES(?,?,?,?,?,?,?)", [category, name, date, attached_file, content, host, status]
        );
        return conn.query(sql, callback);
    },
    addAbsentees: (req, callback) => {
        sql = mysql.format(
            "INSERT INTO absentees SET ? ", [req.body]
        );
        return conn.query(sql, callback);
    },
    addAttendees: (req, callback) => {
        sql = mysql.format(
            "INSERT INTO attendees SET ? ", [req.body]
        );
        return conn.query(sql, callback);
    },
    updateStatus: (req, callback) => {
        let status = req.body.status;
        let id = req.params.id;

        sql = mysql.format("UPDATE conference SET status=? WHERE ID=?", [
            status,
            id,
        ]);
        return conn.query(sql, callback);
    },
    updateContent: (req, callback) => {
        let content = req.body.content;
        let id = req.params.id;

        sql = mysql.format("UPDATE conference SET content=? WHERE ID=?", [content, id]);
        return conn.query(sql, callback);
    },
};