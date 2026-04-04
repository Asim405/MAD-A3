const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'asim8454',
  database: process.env.DB_NAME || 'inventory_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

async function initializeDatabase() {
  try {
    const rootConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    await rootConnection.query('CREATE DATABASE IF NOT EXISTS `' + dbConfig.database + '`');
    await rootConnection.end();

    pool = mysql.createPool(dbConfig);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL
      )
    `);

    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM inventory');
    const count = rows[0].count;

    if (count === 0) {
      await pool.query(
        'INSERT INTO inventory (item_name, quantity) VALUES ? ',
        [
          [
            ['Warehouse Shelves', 120],
            ['Shipping Boxes', 45],
            ['Packing Tape', 8],
            ['Label Rolls', 65],
            ['Inventory Scanner', 17],
          ],
        ]
      );
      console.log('Inserted 5 sample inventory rows.');
    }

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Unable to initialize database:', error.message);
    process.exit(1);
  }
}

app.get('/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT item_name, quantity FROM inventory');
    res.json(rows);
  } catch (error) {
    console.error('Inventory query failed:', error.message);
    res.status(500).json({ error: 'Unable to fetch inventory' });
  }
});

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server is running at http://localhost:${PORT}`);
});
