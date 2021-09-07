const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const session = require('express-session');

const index = require('./routes/index');

const app = express();

global.__basedir = __dirname;

const corsConfig = {
    origin: 'http://localhost:4000'
};

app.use(cors(corsConfig));
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

const server = http.createServer(app);
//server Port
server.listen(4000);

server.on('listening', () => {
    const addr = server.address();
    console.log(`Server is on ${addr.port}`);
})