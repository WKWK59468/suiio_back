let mysql = require('mysql');
let conf = require('../conf');

let conn = mysql.createConnection(conf.db);
let sql = '';

module.exports = {
    // add officer
    add: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('INSERT INTO `officer`(`sID`, `position`) VALUES(?, ?);', values);
        return conn.query(sql, callback);
    },
    // delete officer
    delete: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('DELETE FROM `officer` WHERE `sID` = ? AND `position` = ?;', values);
        return conn.query(sql, callback);
    },
    // fetch all officer
    fetchAll: (req, callback) => {
        sql = mysql.format("SELECT * FROM `officer` ORDER BY `authority` DESC;");
        return conn.query(sql, callback);
    },
    // fetch by position
    fetchByPosition: (req, callback) => {
        let data = req.params;
        let values = [data.position];
        sql = mysql.format("SELECT * FROM `officer` WHERE `position` = ?;", values);
        return conn.query(sql, callback);
    },
    // fetch by authority
    fetchByAuthority: (req, callback) => {
        let data = req.params;
        let values = [data.authority];
        sql = mysql.format("SELECT * FROM `officer` WHERE `authority` = ?;", values);
        return conn.query(sql, callback);
    },
    // update officer by position
    updateOfficer: (req, callback) => {
        let data = req.body;
        let values = [data.sID, data.position];
        sql = mysql.format('UPDATE `officer` SET `sID` = ? WHERE `position` = ?;', values);
        return conn.query(sql, callback);
    },
    // update authority by position
    updateAuthority: (req, callback) => {
        let data = req.body;
        let values = [data.authority, data.position];
        sql = mysql.format('UPDATE `officer` SET `authority` = ? WHERE `position` = ?;', values);
        return conn.query(sql, callback);
    }
}