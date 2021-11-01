# Suiio

## MySQL 連線錯誤

Check SQL port 3306 or 3308 or others.

## Socket.io

-----server-----

**建立 io**\
const io = req.app.get('socketio');

**送出訊息**\
io.emit('getMessage', "test");

-----client-----

**安裝**\
npm install socket.io-client --save

**引入**\
import io from 'socket.io-client'

**連線**\
const socket = io('http://localhost:4000');

**監聽**\
socket.on('getMessage', (socket_content) => {
console.log(socket_content)
})

## mysql-events

修改 mysql.ini

新增下列幾行\
log-bin=mysql-bin\
expire_logs_days = 2\
binlog_format=mixed # Recommended binary logging format – mixed
