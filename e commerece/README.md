# E-Commerce Product Listing App

A simple full-stack product listing application built with Node.js, Express, MySQL, and vanilla HTML/CSS/JavaScript.

## Features
- Express backend running on `http://localhost:3003`
- MySQL database `ecommerce_shop_db`
- `product_list` table seeded with 5 sample products
- `/products` API endpoint returning JSON data
- Frontend served from `public/index.html`
- Real-time search filter and stock status badges

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create the MySQL database

The app will attempt to create the `ecommerce_shop_db` database automatically if it does not exist.

If you want to create it manually, open your MySQL shell and run:

```sql
CREATE DATABASE ecommerce_shop_db;
```

### 3. Configure MySQL credentials

The app currently uses default MySQL credentials in `server.js`:

```js
host: 'localhost',
user: 'root',
password: ''
```

If your MySQL user or password is different, update those values in `server.js`.

### 4. Start the server

```bash
npm start
```

### 5. Open the app

Visit:

```
http://localhost:3003
```

## Notes

- The backend will create the `product_list` table automatically.
- If the `product_list` table is empty, the app will insert 5 sample product rows.
- The frontend fetches data from `/products` and displays it in a responsive grid.
