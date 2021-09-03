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
app.use('/api', upload.array(), index);

const server = http.createServer(app);
//server Port
server.listen(4000);

server.on('listening', () => {
    const addr = server.address();
    console.log(`Server is on ${addr.port}`);
})