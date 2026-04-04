const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // your mysql username
    password: 'asim8454', // your mysql password
    database: 'social_media_db'
});

// Route to fetch all posts
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
    console.log("Connected to MySQL database");
    console.log("You can access posts at http://localhost:3001/posts");
});