const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MySQLEvents = require('@rodrigogs/mysql-events');
const mysql = require('mysql');
const conf = require('./conf');
const conn = mysql.createPool(conf.db);

const eventsmodel = require('./models/events.model');

const index = require('./routes/index');

const app = express();

global.__basedir = __dirname;

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view')));

// Session
app.use(session({
    secret: 'secret',
    name: 'suiio',
    cookie: { maxAge: 30 * 60 * 1000 }, // 分 * 60 * 1000
    resave: false,
    saveUninitialized: true
}));

//Router
app.use('/api', index);

//function
const fetchsID = (arr) => {

}

// MySQLEventWatcher
const MySQLEventWatcher = new MySQLEvents(conn, {
    startAtEnd: true,
    excludedSchemas: {
        mysql: true,
    },
});
MySQLEventWatcher.start().then(() => console.log('MySQLEventWatcher is running!'))
    .catch(err => console.error('Something bad happened', err));
MySQLEventWatcher.addTrigger({
    name: 'SuiioEvents',
    expression: 'suiio.events',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: async (event) => {
        const organization = '組織負責人';
        const finance = '財務負責人';
        const meeting = '會議負責人';
        const officer = '一般幹部';
        const member = '組織成員'
        const affectedRows = event.affectedRows[0].after;
        const sID = event.affectedRows[0].after.who;
        const type = event.affectedRows[0].after.type;
        const objectID = event.affectedRows[0].after.objectID;
        const action = event.affectedRows[0].after.action;
        const content = event.affectedRows[0].after.content;
        const arr = ["account", "statement", "conference"];

        //account
        if (type == "account") {
            if (action == "新增") {
                io.emit(organization, { "events": "account新增" });
                io.emit(finance, { "events": "account新增" });
            }
            if (action == "修改") {
                if (content == "狀態") {
                    io.emit(sID, { "events": "account修改狀態" });
                }
                if (content == "收支") {
                    io.emit(organization, { "events": "account修改內容" });
                    io.emit(finance, { "events": "account修改內容" });
                }
            }
            if (action == "刪除") {
                io.emit(organization, { "events": "account刪除" });
                io.emit(finance, { "events": "account刪除" });
            }
        }
        //statement
        if (type == "statement") {
            if (action == "新增") {
                io.emit(organization, { "events": "statement新增" });
                io.emit(finance, { "events": "statement新增" });
            }
            if (action == "修改") {
                if (content == "狀態") {
                    io.emit(sID, { "events": "statement修改狀態" });
                }
                if (content == "財務報表") {
                    io.emit(organization, { "events": "statement修改內容" });
                    io.emit(finance, { "events": "statement修改內容" });
                }
            }
            if (action == "刪除") {
                io.emit(organization, { "events": "statement刪除" });
                io.emit(finance, { "events": "statement刪除" });
            }
        }
        //conference
        if (type == "conference") {
            if (action == "新增") {
                io.emit(organization, { "events": "conference新增" });
                io.emit(finance, { "events": "conference新增" });
                io.emit(meeting, { "events": "conference新增" });
            }
            if (action == "修改") {
                if (content == "狀態") {
                    io.emit(sID, { "events": "conference修改狀態" });
                }
                if (content == "會議記錄") {
                    io.emit(organization, { "events": "conference修改內容" });
                    io.emit(finance, { "events": "conference修改內容" });
                    io.emit(meeting, { "events": "conference修改內容" });
                }
            }
            if (action == "刪除") {
                io.emit(organization, { "events": "conference刪除" });
                io.emit(finance, { "events": "conference刪除" });
                io.emit(meeting, { "events": "conference刪除" });
            }
        }
        //comment
        if (type == "comment") {
            if (action == "新增") {
                setTimeout(() => {

                    arr.forEach(element => {
                        //搜尋為哪個類型的留言
                        eventsmodel.fetch(element, objectID, (err, result) => {
                            if (!err && result.length) {
                                //搜尋所有留過言的人
                                eventsmodel.fetch_sID(element, result[0][element + "ID"], async (IDerr, results) => {
                                    if (!IDerr && result.length) {
                                        let array = [];
                                        await results.forEach(getsID => {
                                            array.push(getsID.sID);
                                        })
                                        array = await array.filter((item) => {
                                            return item != sID;
                                        })
                                        array.forEach(emit_sID => {
                                            //搜尋匿名名稱
                                            eventsmodel.fetch_neme(emit_sID, (sIDerr, nickname) => {
                                                if (!sIDerr) {
                                                    eventsmodel.fetch_tableName(element, result[0][element + "ID"], (error, tableName) => {
                                                        if (!error) {
                                                            if (table == "account") {
                                                                eventJSON = {
                                                                    "events": `${nickname[0].nickname}在${tableName[0].name} 收支 新增了一則留言`,
                                                                    "table": element,
                                                                    "tableID": result[0][element + "ID"]
                                                                }
                                                                io.emit(emit_sID, eventJSON);
                                                            }
                                                            if (table == "statement") {
                                                                eventJSON = {
                                                                    "events": `${nickname[0].nickname}在${tableName[0].name} 財務報表 新增了一則留言`,
                                                                    "table": element,
                                                                    "tableID": result[0][element + "ID"]
                                                                }
                                                                io.emit(emit_sID, eventJSON);
                                                            }
                                                            if (table == "conference") {
                                                                eventJSON = {
                                                                    "events": `${nickname[0].nickname}在${tableName[0].name} 會議記錄 新增了一則留言`,
                                                                    "table": element,
                                                                    "tableID": result[0][element + "ID"]
                                                                }
                                                                io.emit(emit_sID, eventJSON);
                                                            }

                                                        }
                                                    })
                                                }
                                            })

                                        })
                                        //result為所有留言過的人
                                    }
                                })
                            }
                        })

                    });

                }, 1000);
                io.emit(organization, { "events": "comment新增" });
                io.emit(finance, { "events": "comment新增" });
            }
            if (action == "修改") {
                if (content == "留言") {
                    io.emit(organization, { "events": "comment修改內容" });
                    io.emit(finance, { "events": "comment修改內容" });
                }
            }
            if (action == "刪除") {
                io.emit(organization, { "events": "comment刪除" });
                io.emit(finance, { "events": "comment刪除" });
            }
        }
    },
})
MySQLEventWatcher.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
MySQLEventWatcher.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

const server = http.createServer(app);
//server Port
server.listen(4000, () => {
    const addr = server.address();
    console.log(`Server is on ${addr.port}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (socket) => {
    app.set('socketio', socket)
    socket.on('getMessage', message => {
        socket.emit('getMessage', message)
    })
})