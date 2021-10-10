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
const conn = mysql.createConnection(conf.db);

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
MySQLEventWatcher.start().then(() => console.log('I\'m running!'))
    .catch(err => console.error('Something bad happened', err));
MySQLEventWatcher.addTrigger({
    name: 'SuiioEvents',
    expression: 'suiio.events',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: async (event) => {
        console.log(event.affectedRows[0].after);   //事件
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