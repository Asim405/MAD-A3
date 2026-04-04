const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3003;
const DB_NAME = 'ecommerce_shop_db';
const TABLE_NAME = 'product_list';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const baseConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asim8454'
});

baseConnection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }

  baseConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (createErr) => {
    if (createErr) {
      console.error('Failed to create database:', createErr.message);
      process.exit(1);
    }

    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'asim8454',
      database: DB_NAME
    });

    db.connect((dbErr) => {
      if (dbErr) {
          console.error(`Failed to connect to ${DB_NAME}:`, dbErr.message);
      }

      const createTableSql = `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          product_name VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          stock INT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;

      db.query(createTableSql, (tableErr) => {
        if (tableErr) {
          console.error('Failed to create products table:', tableErr.message);
          process.exit(1);
        }

        db.query(`SELECT COUNT(*) AS count FROM ${TABLE_NAME}`, (countErr, results) => {
          if (countErr) {
            console.error('Failed to count products:', countErr.message);
            process.exit(1);
          }

          const productCount = results[0].count;
          if (productCount === 0) {
            const sampleProducts = [
              ['Sleek Wireless Earbuds', 59.99, 18],
              ['Urban Travel Backpack', 74.99, 12],
              ['Smart Fitness Watch', 129.99, 0],
              ['Modern Desk Lamp', 39.50, 25],
              ['Premium Coffee Mug Set', 24.90, 8]
            ];

            const insertSql = `INSERT INTO ${TABLE_NAME} (product_name, price, stock) VALUES ?`;
            db.query(insertSql, [sampleProducts], (insertErr) => {
              if (insertErr) {
                console.error('Failed to insert sample products:', insertErr.message);
                process.exit(1);
              }
              console.log(`Sample products inserted into ${DB_NAME}.${TABLE_NAME}`);
            });
          }
        });
      });
    });
  });
});

app.get('/products', (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asim8454',
    database: DB_NAME
  });

  db.query(`SELECT product_name, price, stock FROM ${TABLE_NAME}`, (err, results) => {
    db.end();
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
