# Inventory Management App

A full-stack Inventory Management App built with Node.js, Express, MySQL, and a clean frontend UI.

## Files

- `server.js` - Express backend server, database initialization, and `/inventory` API route.
- `package.json` - app dependencies and start script.
- `public/index.html` - frontend UI.
- `public/style.css` - app styling.
- `public/script.js` - fetches `/inventory`, renders table, and filters items.

## Setup Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MySQL is running on your machine.
   - Default connection settings are:
     - host: `localhost`
     - user: `root`
     - password: `asim8454` (or your own MySQL password)
     - database: `inventory_db`

3. If your MySQL credentials differ, set environment variables before starting:
   ```bash
   set DB_HOST=localhost
   set DB_USER=root
   set DB_PASSWORD=yourPassword
   set DB_NAME=inventory_db
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open the app in your browser or use the React Native API endpoint:
   ```
   http://localhost:3000
   ```
   - The backend API endpoint is available at `http://localhost:3000/inventory`

## React Native mobile app

If you want a mobile app instead of a website, use the React Native frontend in `mobile/App.js`.

1. Install mobile dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Start the backend from the project root:
   ```bash
   cd ..
   npm start
   ```

3. Start Expo from the mobile folder:
   ```bash
   cd mobile
   npm start
   ```

4. Use the Android emulator or Expo Go to run the app.

> For Android emulator use `http://10.0.2.2:3000/inventory`. For iOS simulator or web use `http://localhost:3000/inventory`.

## What it does

- Creates the `inventory_db` database if it does not exist.
- Creates the `inventory` table with columns: `id`, `item_name`, `quantity`.
- Inserts 5 sample inventory rows if the table is empty.
- Serves the frontend from `public/index.html`.
- Provides a GET endpoint at `/inventory` that returns JSON data.
- Frontend displays the inventory in a styled table with badges and live search.
