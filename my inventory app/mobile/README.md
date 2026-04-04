# Inventory Management Mobile App

This React Native app connects to the existing Express + MySQL backend and displays inventory data in a mobile UI.

## Setup

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

4. Open the app in an emulator or Expo Go.

## Notes

- The default API URL in `App.js` is:
  - Android emulator: `http://10.0.2.2:3000/inventory`
  - iOS simulator / web: `http://localhost:3000/inventory`

- If you run the app on a physical device, replace `API_URL` in `mobile/App.js` with your computer's local IP address, for example:
  ```js
  const API_URL = 'http://192.168.1.100:3000/inventory';
  ```

- Keep MySQL running while using the app.

## What it does

- Loads inventory from `/inventory`
- Shows item name and quantity
- Applies color-coded badges:
  - green if quantity > 50
  - yellow if quantity is 10-50
  - red if quantity < 10
- Includes live search by item name
