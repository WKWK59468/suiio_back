# suiio
Check SQL port 3306 or 3308 or others.

# socketio

***server***

建立io

const io = req.app.get('socketio');

送出訊息

io.emit('getMessage', "test");

***client***

import io from 'socket.io-client'

const socket = io('http://localhost:4000');

socket.on("getMessage", (socket_content) => {
    console.log(socket_content)
})

# mysql-events
修改mysql.ini

新增下列幾行
log-bin=mysql-bin
expire_logs_days = 2
binlog_format=mixed # Recommended binary logging format – mixed
