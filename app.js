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
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}新增了一筆收支`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}新增了一筆收支`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                    }
                })
            }
            if (action == "修改") {
                if (content !== "收支") {
                    let eventJSON = {};
                    switch (content) {
                        case "0":
                            eventJSON = {
                                "events": `收支狀態變更為 未審核`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.add(sID, `收支狀態變更為 未審核`, type, objectID).catch((Add_err) => {
                                console.log(Add_err);
                            })
                            io.emit(sID, eventJSON);
                            break;
                        case "1":
                            eventJSON = {
                                "events": `收支狀態變更為 通過`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.add(sID, `收支狀態變更為 通過`, type, objectID).catch((Add_err) => {
                                console.log(Add_err);
                            })
                            io.emit(sID, eventJSON);
                            break;
                        case "2":
                            eventJSON = {
                                "events": `收支狀態變更為 組織負責人已審核`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.add(sID, `收支狀態變更為 組織負責人已審核`, type, objectID).catch((Add_err) => {
                                console.log(Add_err);
                            })
                            io.emit(sID, eventJSON);
                            break;
                        case "3":
                            eventJSON = {
                                "events": `收支狀態變更為 財務負責人已審核`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.add(sID, `收支狀態變更為 財務負責人已審核`, type, objectID).catch((Add_err) => {
                                console.log(Add_err);
                            })
                            io.emit(sID, eventJSON);
                            break;
                        case "4":
                            eventJSON = {
                                "events": `收支狀態變更為 駁回`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.add(sID, `收支狀態變更為 駁回`, type, objectID).catch((Add_err) => {
                                console.log(Add_err);
                            })
                            io.emit(sID, eventJSON);
                            break;
                    }
                }
                if (content === "收支") {
                    eventsmodel.fetch_neme(sID, (error, results) => {
                        if (!error && results.length) {
                            let eventJSON = {
                                "events": `${results[0].name}修改了一筆收支紀錄`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.fetch_officer().then((officer_sID) => {
                                officer_sID.forEach((element) => {
                                    if (element.permission === organization || element.permission === finance) {
                                        let element_sID = element.sID;
                                        eventsmodel.add(element_sID, `${results[0].name}修改了一筆收支紀錄`, type, objectID).catch((Add_err) => {
                                            console.log(Add_err);
                                        })
                                    }
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                            io.emit(organization, eventJSON);
                            io.emit(finance, eventJSON);
                        }
                    })
                }
            }
            if (action == "刪除") {
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}刪除了一筆收支紀錄`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}刪除了一筆收支紀錄`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                    }
                })
            }
        }
        //statement
        if (type == "statement") {
            if (action == "新增") {
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}新增了一筆財務報表`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}新增了一筆財務報表`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                    }
                })
            }
            if (action == "修改") {
                if (content !== "財務報表") {
                    eventsmodel.fetch_neme(sID, (error, results) => {
                        if (!error && results.length) {
                            let eventJSON = {};
                            switch (content) {
                                case "0":
                                    eventJSON = {
                                        "events": `財務報表狀態變更為 未審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `財務報表狀態變更為 未審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "1":
                                    eventJSON = {
                                        "events": `財務報表狀態變更為 通過`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `財務報表狀態變更為 通過`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "2":
                                    eventJSON = {
                                        "events": `財務報表狀態變更為 組織負責人已審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `財務報表狀態變更為 組織負責人已審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "3":
                                    eventJSON = {
                                        "events": `財務報表狀態變更為 財務負責人已審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `財務報表狀態變更為 財務負責人已審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "4":
                                    eventJSON = {
                                        "events": `財務報表狀態變更為 駁回`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `財務報表狀態變更為 駁回`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                            }
                        }
                    })
                }
                if (content == "財務報表") {
                    eventsmodel.fetch_neme(sID, (error, results) => {
                        if (!error && results.length) {
                            let eventJSON = {
                                "events": `${results[0].name}修改了一筆財務報表`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.fetch_officer().then((officer_sID) => {
                                officer_sID.forEach((element) => {
                                    if (element.permission === organization || element.permission === finance) {
                                        let element_sID = element.sID;
                                        eventsmodel.add(element_sID, `${results[0].name}修改了一筆財務報表`, type, objectID).catch((Add_err) => {
                                            console.log(Add_err);
                                        })
                                    }
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                            io.emit(organization, eventJSON);
                            io.emit(finance, eventJSON);
                        }
                    })
                }
            }
            if (action == "刪除") {
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}刪除了一筆財務報表`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}刪除了一筆財務報表`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                    }
                })
            }
        }
        //conference
        if (type == "conference") {
            if (action == "新增") {
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}新增了一筆會議記錄`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance || element.permission === meeting) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}新增了一筆會議記錄`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                        io.emit(meeting, eventJSON);
                    }
                })
            }
            if (action == "修改") {
                if (content !== "會議記錄") {
                    eventsmodel.fetch_neme(sID, (error, results) => {
                        if (!error && results.length) {
                            let eventJSON = {};
                            switch (content) {
                                case "0":
                                    eventJSON = {
                                        "events": `會議記錄狀態變更為 未審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `會議記錄狀態變更為 未審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "1":
                                    eventJSON = {
                                        "events": `會議記錄狀態變更為 通過`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `會議記錄狀態變更為 通過`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "2":
                                    eventJSON = {
                                        "events": `會議記錄狀態變更為 組織負責人已審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `會議記錄狀態變更為 組織負責人已審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "3":
                                    eventJSON = {
                                        "events": `會議記錄狀態變更為 財務負責人已審核`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `會議記錄狀態變更為 財務負責人已審核`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                                case "4":
                                    eventJSON = {
                                        "events": `會議記錄狀態變更為 駁回`,
                                        "table": type,
                                        "tableID": objectID
                                    }
                                    eventsmodel.add(sID, `會議記錄狀態變更為 駁回`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                    io.emit(sID, eventJSON);
                                    break;
                            }
                        }
                    })
                }
                if (content == "會議記錄") {
                    eventsmodel.fetch_neme(sID, (error, results) => {
                        if (!error && results.length) {
                            let eventJSON = {
                                "events": `${results[0].name}修改了一筆會議記錄`,
                                "table": type,
                                "tableID": objectID
                            }
                            eventsmodel.fetch_officer().then((officer_sID) => {
                                officer_sID.forEach((element) => {
                                    if (element.permission === organization || element.permission === finance || element.permission === meeting) {
                                        let element_sID = element.sID;
                                        eventsmodel.add(element_sID, `${results[0].name}修改了一筆會議記錄`, type, objectID).catch((Add_err) => {
                                            console.log(Add_err);
                                        })
                                    }
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                            io.emit(organization, eventJSON);
                            io.emit(finance, eventJSON);
                            io.emit(meeting, eventJSON);
                        }
                    })
                }
            }
            if (action == "刪除") {
                eventsmodel.fetch_neme(sID, (error, results) => {
                    if (!error && results.length) {
                        let eventJSON = {
                            "events": `${results[0].name}刪除了一筆會議記錄`,
                            "table": type,
                            "tableID": objectID
                        }
                        eventsmodel.fetch_officer().then((officer_sID) => {
                            officer_sID.forEach((element) => {
                                if (element.permission === organization || element.permission === finance || element.permission === meeting) {
                                    let element_sID = element.sID;
                                    eventsmodel.add(element_sID, `${results[0].name}刪除了一筆會議記錄`, type, objectID).catch((Add_err) => {
                                        console.log(Add_err);
                                    })
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                        io.emit(organization, eventJSON);
                        io.emit(finance, eventJSON);
                        io.emit(meeting, eventJSON);
                    }
                })
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
                                        array = array.filter((item) => {
                                            return item != sID;
                                        })
                                        array.forEach(emit_sID => {
                                            if (element == "account") {
                                                let eventJSON = {
                                                    "events": `您留言過的收支紀錄新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                let eventJSON2 = {
                                                    "events": `收支紀錄新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                eventsmodel.fetch_officer().then((officer_sID) => {
                                                    officer_sID.forEach((element) => {
                                                        if (element.permission === organization || element.permission === finance) {
                                                            let element_sID = element.sID;
                                                            eventsmodel.add(element_sID, `收支紀錄新增了一則留言`, type, objectID).catch((Add_err) => {
                                                                console.log(Add_err);
                                                            })
                                                        }
                                                    })
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                                eventsmodel.add(emit_sID, `您留言過的收支紀錄新增了一則留言`, type, objectID).catch((Add_err) => {
                                                    console.log(Add_err);
                                                })
                                                io.emit(emit_sID, eventJSON);
                                                io.emit(organization, eventJSON);
                                                io.emit(finance, eventJSON);
                                            }
                                            if (element == "statement") {
                                                let eventJSON = {
                                                    "events": `您留言過的財務報表新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                let eventJSON2 = {
                                                    "events": `財務報表新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                eventsmodel.fetch_officer().then((officer_sID) => {
                                                    officer_sID.forEach((element) => {
                                                        if (element.permission === organization || element.permission === finance) {
                                                            let element_sID = element.sID;
                                                            eventsmodel.add(element_sID, `財務報表新增了一則留言`, type, objectID).catch((Add_err) => {
                                                                console.log(Add_err);
                                                            })
                                                        }
                                                    })
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                                eventsmodel.add(emit_sID, `您留言過的財務報表新增了一則留言`, type, objectID).catch((Add_err) => {
                                                    console.log(Add_err);
                                                })
                                                io.emit(emit_sID, eventJSON);
                                                io.emit(organization, eventJSON2);
                                                io.emit(finance, eventJSON2);
                                            }
                                            if (element == "conference") {
                                                let eventJSON = {
                                                    "events": `您留言過的會議記錄新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                let eventJSON2 = {
                                                    "events": `會議記錄新增了一則留言`,
                                                    "table": element,
                                                    "tableID": result[0][element + "ID"]
                                                }
                                                eventsmodel.fetch_officer().then((officer_sID) => {
                                                    officer_sID.forEach((element) => {
                                                        if (element.permission === organization || element.permission === finance) {
                                                            let element_sID = element.sID;
                                                            eventsmodel.add(element_sID, `會議記錄新增了一則留言`, type, objectID).catch((Add_err) => {
                                                                console.log(Add_err);
                                                            })
                                                        }
                                                    })
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                                eventsmodel.add(emit_sID, `您留言過的會議記錄新增了一則留言`, type, objectID).catch((Add_err) => {
                                                    console.log(Add_err);
                                                })
                                                io.emit(emit_sID, eventJSON);
                                                io.emit(organization, eventJSON2);
                                                io.emit(finance, eventJSON2);
                                            }

                                        })
                                    }
                                })
                            }
                        })

                    });

                }, 3000);   //等待多久後發送

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