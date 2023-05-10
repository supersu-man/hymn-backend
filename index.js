const cors = require('cors')
const queries = require('./queries')
const db = require('./db')
const crypto = require('./crypto')
var bodyParser = require('body-parser');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

http.listen(port, function () {
    console.log('listening on *:3000');
});

app.get('/', (req, res) => {
    res.send('Runnning')
})

app.post('/login', (req, res) => {
    db.get(queries.get_user, { $username: req.body.username }, (err, row) => {
        if (err) res.sendStatus(500)
        else if (row) {
            if (crypto.decrypt(row.password) == req.body.password) res.send('Login successful')
            else res.status(401).send('Invalid credentials')
        }
        else res.status(404).send('User not found')
    })
})

app.post('/register', (req, res) => {
    const epassword = crypto.encrypt(req.body.password)
    db.run(queries.insert_user, { $username: req.body.username, $password: epassword }, (err) => {
        if (err) err.errno == 19 ? res.status(500).send('Username is already taken') : res.sendStatus(500)
        else res.send('Registration successful')
    })
})

app.post('/create-room', (req, res) => {
    const $password = crypto.encrypt(new Date().toString()).slice(-5)
    req.body.$password = $password
    db.run(queries.insert_room, req.body, (err) => {
        if (err) res.status(500).send(err.message)
        else res.send('Room created successfully')
    })
})

app.post('/get-rooms', (req, res) => {
    db.all(queries.get_rooms, req.body, (err, rows) => {
        if (err) res.status(500).send(err.message)
        else if (rows) res.send(rows)
        else res.send([])
    })
})


io.on("connection", (socket) => {
    console.log("Connected")

    // receive a message from the client
    socket.on("action", (args) => {
        console.log(args)
        io.emit(args.id, args)
    });
});