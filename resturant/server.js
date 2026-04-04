const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'asim8454',
};

const initConnection = mysql.createConnection(dbConfig);
let db = initConnection;

initConnection.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err.message);
    process.exit(1);
  }

  initConnection.query('CREATE DATABASE IF NOT EXISTS restaurant_db', (err) => {
    if (err) {
      console.error('Error creating database:', err.message);
      process.exit(1);
    }

    initConnection.changeUser({ database: 'restaurant_db' }, (err) => {
      if (err) {
        console.error('Error selecting database:', err.message);
        process.exit(1);
      }

      const createTableSql = `
        CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          customer_name VARCHAR(255),
          food_item VARCHAR(255),
          price DECIMAL(10,2)
        )`;

      initConnection.query(createTableSql, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          process.exit(1);
        }

        initConnection.query('SELECT COUNT(*) AS count FROM orders', (err, results) => {
          if (err) {
            console.error('Error reading orders count:', err.message);
            process.exit(1);
          }

          const count = results[0].count;
          if (count === 0) {
            const sampleOrders = [
              ['Emma Watson', 'Grilled Salmon', 18.95],
              ['Liam Smith', 'Mushroom Risotto', 14.50],
              ['Olivia Johnson', 'Spicy Chicken Tacos', 12.75],
              ['Noah Brown', 'BBQ Beef Burger', 16.20],
              ['Ava Davis', 'Chocolate Lava Cake', 8.90],
            ];

            initConnection.query(
              'INSERT INTO orders (customer_name, food_item, price) VALUES ?',
              [sampleOrders],
              (err) => {
                if (err) {
                  console.error('Error inserting sample orders:', err.message);
                  process.exit(1);
                }
                console.log('Sample orders inserted.');
              }
            );
          }
        });
      });
    });
  });
});

app.get('/orders', (req, res) => {
  db.query('SELECT customer_name, food_item, price FROM orders', (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err.message);
      return res.status(500).json({ error: 'Unable to fetch orders' });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Restaurant Order Management API running on http://localhost:${PORT}`);
});
