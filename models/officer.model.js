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
    updateAuthority: (req, callback) => {
        const organize = JSON.parse(req.body.organize);
        const finance = JSON.parse(req.body.finance);
        const conference = JSON.parse(req.body.conference);
        const data = { organize, finance, conference };
        console.log(data);
        if (organize.length == 0 || finance.length == 0 || conference.length == 0)
            throw new Error("Can't update. Each authority must be no less than 1 person.");
        if (organize.length > 2 || finance.length > 2 || conference.length > 2)
            throw new Error("Can't update. Each authority must be no more than 2 people.");
        const auth = {
            organize: "組織負責人",
            finance: "財務負責人",
            conference: "會議負責人"
        };
        const sql = "UPDATE officer SET authority = CASE " +
            Object.keys(auth).reduce((str, key) => {
                return str + data[key].reduce((x, pos) => {
                    return `${x}WHEN position='${pos}' THEN '${auth[key]}' `;
                }, "")
            }, "") + `ELSE '一般幹部' END`;
        console.log(sql);
        return conn.query(sql, callback);

    }
}