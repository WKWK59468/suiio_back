const mysql = require('mysql');
const conf = require('../conf');
const conn = mysql.createConnection(conf.db);
const query = (syntax, params, field) => {
    const sql = mysql.format(syntax, params);
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results) => {
            if (error) reject(error);
            resolve(results[0][field]);
        });
    });
}
const getAuthNum = (auth) => {
    const syntax = "SELECT COUNT(`authority`) AS 'num' FROM `officer` WHERE `authority` = ?;";
    const params = [auth];
    const field = "num";
    return query(syntax, params, field);
};
const getAuthByPos = (pos) => {
    const syntax = "SELECT `authority` FROM `officer` WHERE `position` = ?;";
    const params = [pos];
    const field = "authority";
    return query(syntax, params, field);
};
module.exports = {
    // add officer
    add: (req, callback) => {
        const data = req.body;
        const values = [data.sID, data.position];
        const sql = mysql.format('INSERT INTO `officer`(`sID`, `position`) VALUES(?, ?);', values);
        return conn.query(sql, callback);
    },
    // delete officer
    delete: async (req, callback) => {
        const data = req.body;
        let bool = false;
        await getAuthByPos(data.position).then(async auth => {
            if (auth != "一般幹部")
                await getAuthNum(auth).then(num => bool = (num == 1));
        });
        if (bool)
            throw new Error("Can't delete. Authority problem.");
        const values = [data.sID, data.position];
        const sql = mysql.format('DELETE FROM `officer` WHERE `sID` = ? AND `position` = ?;', values);
        return conn.query(sql, callback);
    },
    // fetch all officer
    fetchAll: (req, callback) => {
        const sql = mysql.format("SELECT * FROM `officer` ORDER BY `authority` DESC;");
        return conn.query(sql, callback);
    },
    // fetch by position
    fetchByPosition: (req, callback) => {
        const data = req.params;
        const values = [data.position];
        const sql = mysql.format("SELECT * FROM `officer` WHERE `position` = ?;", values);
        return conn.query(sql, callback);
    },
    // fetch by authority
    fetchByAuthority: (req, callback) => {
        const data = req.params;
        const values = [data.authority];
        const sql = mysql.format("SELECT * FROM `officer` WHERE `authority` = ?;", values);
        return conn.query(sql, callback);
    },
    // update officer by position
    updateOfficer: (req, callback) => {
        const data = req.body;
        const values = [data.sID, data.position];
        const sql = mysql.format('UPDATE `officer` SET `sID` = ? WHERE `position` = ?;', values);
        return conn.query(sql, callback);
    },
    // update authority by position
    updateAuthority: async (req, callback) => {
        const { authority, position } = req.body;
        const cur = {};
        const tar = {};
        await getAuthByPos(position).then(async cur_auth => {
            await getAuthNum(cur_auth).then(num => (cur.name = cur_auth) && (cur.count = num));
            await getAuthNum(authority).then(num => (tar.name = authority) && (tar.count = num));
        });
        if (tar.name == cur.name)
            throw new Error("Can't update. Same authority.");
        if (cur.name != "一般幹部")
            if (cur.count <= 1)
                throw new Error(`Can't update. Count of ${cur.name} <= 1.`);
        if (tar.name != "一般幹部")
            if (tar.count >= 2)
                throw new Error(`Can't update. Count of ${tar.name} >= 2.`);
        const values = [authority, position];
        const sql = mysql.format('UPDATE `officer` SET `authority` = ? WHERE `position` = ?;', values);
        return conn.query(sql, callback);
    }
}