let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    add: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('INSERT INTO `cadre`(`sID`, `position`) VALUES(?, ?);', values);
        return conn.query(sql, callback);
    },
    delete: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('DELETE FROM `cadre` WHERE `sID` = ? AND `position` = ?;', values);
        return conn.query(sql, callback);
    },
    fetchAll: (req, callback) => {
        sql = mysql.format("SELECT * FROM `cadre` ORDER BY `authority` DESC;");
        return conn.query(sql, callback);
    },
    update: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('UPDATE `cadre` SET `sID` = ? WHERE `position` = ?;', values);
        return conn.query(sql, callback);
    }
}