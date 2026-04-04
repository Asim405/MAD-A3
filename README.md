# 🗄️ Full-Stack react Applications — Node.js + MySQL

---

## 📁 Project Structure

```
📦 fullstack-apps/
├── 🎟️  ticket-booking/
├── 📱  social-media-app/
├── 🍽️  restaurant-app/
├── 📦  inventory-app/
└── 🛒  ecommerce-app/
```

---

## 🚀 Apps Overview

### 1. 🎟️ Ticket Booking App
> Book and manage event tickets with seat assignments.

- **Route:** `/tickets`
- **Table:** `tickets`
- **Stack:** Node.js, Express, MySQL
- **Features:**
  - View all bookings (user name, event, seat number)
  - Card-based ticket display
  - Real-time search by event name

---

### 2. 📱 Social Media App
> A social platform to manage and display user posts and interactions.

- **Route:** `/posts`
- **Table:** `posts`
- **Stack:** Node.js, Express, MySQL
- **Features:**
  - View all posts (username, content, likes)
  - Feed-style card layout
  - Real-time search by username

---

### 3. 🍽️ Restaurant App
> Manage and display customer food orders with pricing.

- **Route:** `/orders`
- **Table:** `orders`
- **Stack:** Node.js, Express, MySQL
- **Features:**
  - View all orders (customer name, food item, price)
  - Live total price calculation
  - Real-time search by food item

---

### 4. 📦 Inventory App
> Track and manage warehouse inventory with stock level alerts.

- **Route:** `/inventory`
- **Table:** `inventory`
- **Stack:** Node.js, Express, MySQL
- **Features:**
  - View all items (item name, quantity)
  - Color-coded stock badges (🟢 High / 🟡 Medium / 🔴 Low)
  - Real-time search by item name

---

### 5. 🛒 E-Commerce App
> Browse and manage products with stock availability.

- **Route:** `/products`
- **Table:** `products`
- **Stack:** Node.js, Express, MySQL
- **Features:**
  - View all products (name, price, stock)
  - Product grid with In Stock / Out of Stock badges
  - Add to Cart button (UI)
  - Real-time search by product name

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Framework  | Express.js          |
| Database   | MySQL               |
| Frontend   | HTML, CSS, Vanilla JS |
| DB Driver  | mysql2              |

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [MySQL](https://www.mysql.com/) (v8+)
- npm

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/your-username/fullstack-apps.git
cd fullstack-apps
```

**2. Go into any app folder**
```bash
cd ticket-booking
```

**3. Install dependencies**
```bash
npm install
```

**4. Create the MySQL database**
```sql
CREATE DATABASE ticket_db;
```

**5. Configure your DB connection**

Open `server.js` and update the MySQL config:
```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'ticket_db'
});
```

**6. Run the server**
```bash
node server.js
```

**7. Open in browser**
```
http://localhost:3000
```

> 🔁 Repeat steps 2–7 for each app. Each app runs on its own port.

---

## 🔌 Port Reference

| App              | Port |
|------------------|------|
| Ticket Booking   | 3001 |
| Social Media     | 3002 |
| Restaurant       | 3003 |
| Inventory        | 3004 |
| E-Commerce       | 3005 |

---

## 📦 NPM Packages Used

```bash
npm install express mysql2 cors
```

---

## 📸 Screenshots

> _Add screenshots of each app here after running them locally._

---

## 🎓 About

These projects were built as part of a **backend web development course** focusing on:
- REST API design with Express.js
- MySQL database integration
- Frontend-backend communication using `fetch()`
- Real-world full-stack app structure

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
