# Flipkart Product Price Tracker and History Web App

A **Flipkart Product Tracker** web application that allows users to share Flipkart product links, automatically fetch and display relevant product information, and keep a **historical record of price changes**. No user login is required, and everyone can view products, search them by title or filter by price range, and track pricing history with rechecks.

---

## Features

### 1. Product Input Interface

- Users paste a Flipkart product link and click **"Fetch Details"** to automatically gather product information using web scraping.
- Product data fetched includes:
  - **Title**
  - **Description**
  - **Current Price**
  - **Total Reviews**

### 2. Display Product Data

- Product details are displayed clearly for users, including:
- Title, description, price, reviews, and number of purchases.
- Each product card shows a **"Recheck Price"** button.

### 3. Price Recheck and Historical Price List

- Users can recheck the **current price** at any time by clicking the "Recheck Price" button.
- **All previous prices are stored** and displayed chronologically in a price history table for each product.

### 4. Public Data Access

- No user login or authentication is required—**all users can view** products and their pricing history.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (for product info and pricing history)
- **Web Scraping:** Cheerio.js
- **API Calls:** Axios for product data fetching and recheck requests

---

## Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd backend
   nodemon index.js
   ```
