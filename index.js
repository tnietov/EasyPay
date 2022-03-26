const connection = require('./db');

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//No cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


//Routes
// app.get('/', (req, res) => {
//     res.send('Hello Migue!!');
// });


//Get all users
// app.get('/users', (req, res) => {
//     connection.query('SELECT * FROM users', (err, rows) => {
//         if (err) throw err;
//         res.send(rows);
//     });
// });

//Get user by id
app.get('/users/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        if (err) throw err;
        res.send(rows.length == 0 ? { message: "Not found!"} : rows);
    });
});

app.post('/transacciones', (req, res) => {
    connection.query('SELECT * FROM transacciones WHERE id_user = ?', [req.body.id] , (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/transaccion', (req, res) => {

    const { body } = req;
    const { id, saldo } = body;

    connection.query('INSERT INTO transacciones VALUES (NULL, current_time(), ?, ?)', [saldo, id] , (err, rows) => {
        if (err) throw err;
        res.send({ message: "Transaccion realizada con exito!"});
    });
});


app.get('/saldo/:id', (req, res) => {
    connection.query('SELECT SUM(saldo) as saldo FROM transacciones WHERE id_user = ?', [req.params.id] , (err, rows) => {
        if (err) throw err;
        res.send(rows.length == 0 ? { saldo: 0} : rows[0]);
    });
});

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//Close server and database connection
process.on('SIGINT', () => {
    connection.end(() => {
        console.log('Connection closed');
        process.exit();
    });
});

