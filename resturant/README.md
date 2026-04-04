# Restaurant Order Management App

Full-stack restaurant order management built with Node.js, Express, MySQL, and a warm restaurant-themed frontend.

## Features
- Express server on port `3002`
- MySQL database `restaurant_db`
- `orders` table with sample data
- API route: `GET /orders`
- Static restaurant UI served from Express
- Real-time food item search and total calculation

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a running MySQL server and optionally set environment variables:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   ```

3. Start the app:
   ```bash
   npm start
   ```

4. Open the browser at `http://localhost:3002`

## React Native
This project includes a REST API that can be consumed by a React Native app. Use `fetch('http://<your-host>:3002/orders')` from React Native to load the order list.

Example React Native workflow:
- Build a list view in React Native
- Fetch the `/orders` endpoint
- Display `customer_name`, `food_item`, and formatted `price`
- Add search and total summary in your mobile UI

## Notes
- The backend creates the database and table automatically if they do not exist.
- Sample orders are inserted only when the `orders` table is empty.
