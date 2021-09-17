const mysql = require("mysql");
const conf = require("../conf");

const conn = mysql.createConnection(conf.db);
let sql = "";

module.exports = {

}