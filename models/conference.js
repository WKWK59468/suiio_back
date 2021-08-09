const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

module.exports = {
    list: (req, callback) => {
        sql = mysql.format("SELECT conference.ID,category.name AS category,conference.name,conference.date,conference.attached_file,conference.content,conference.host,conference.recorder,conference.status FROM conference,category WHERE conference.category = category.ID");
        return conn.query(sql, callback);
    },
    fetchBycategory: (req, callback) => {
        sql = mysql.format("SELECT conference.ID,category.name AS category,conference.name,conference.date,conference.attached_file,conference.content,conference.host,conference.recorder,conference.status FROM conference,category WHERE category = ? AND conference.category = category.ID", [req.params.id]);
        return conn.query(sql, callback);
    },
    fetchOne: (req, callback) => {
        sql = mysql.format('SELECT content FROM conference WHERE conference.ID = ?', [req.params.id]);
        return conn.query(sql, callback);
    },
    fetchAbsentees: (req, callback) => {
        sql = mysql.format('SELECT absentees FROM absentees WHERE conference = ?', [req.params.id]);
        return conn.query(sql, callback);
    },
    fetchAttendees: (req, callback) => {
        sql = mysql.format('SELECT attendees FROM attendees WHERE conference = ?', [req.params.id]);
        return conn.query(sql, callback);
    },
    getConferenceID: (req, callback) => {
        sql = mysql.format("SELECT ID FROM conference ORDER BY ID DESC LIMIT 1");
        return conn.query(sql, callback);
    },
    upload: (req, callback) => {
        const body = req.body;
        const category = body.category;
        const name = body.name;
        const date = body.date;
        let attached_file;
        const content = body.content;
        const host = body.host;
        const recorder = body.recorder;
        const status = "0";

        if (body.attached_file == null || body.attached_file == "") {
            attached_file = null;
        } else {
            attached_file = body.attached_file;
        }

        sql = mysql.format(
            "INSERT INTO conference(category,name,date,attached_file,content,host,recorder,status) VALUES(?,?,?,?,?,?,?,?)", [category, name, date, attached_file, content, host, recorder, status]
        );
        return conn.query(sql, callback);
    },
    addAbsentees: (id, absentees) => {
        sql = mysql.format(
            "INSERT INTO absentees(conference,absentees) VALUES(?,?)", [id, absentees]
        );
        return conn.query(sql);
    },
    addAttendees: (id, attendees) => {
        sql = mysql.format(
            "INSERT INTO attendees(conference,attendees) VALUES(?,?)", [id, attendees]
        );
        return conn.query(sql);
    },
    updateStatus: (req, callback) => {
        const status = req.body.status;
        const id = req.body.id;
        sql = mysql.format("UPDATE conference SET status=? WHERE ID=?", [status, id]);
        return conn.query(sql, callback);
    },
    updateContent: (req, callback) => {
        const content = req.body.content;
        const id = req.body.id;
        sql = mysql.format("UPDATE conference SET content=? WHERE ID=?", [content, id]);
        return conn.query(sql, callback);
    },
};