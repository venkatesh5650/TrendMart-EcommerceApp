# Clothing Brand E-Commerce Web App (MERN Stack)

This project is a full-stack e-commerce web application for a fictional clothing brand,
built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

The app supports:

- User registration and login (JWT + HTTP-only cookies).
- Secure password hashing with bcrypt.
- Product catalog with search, filters and pagination.
- Shopping cart for **guest users** (localStorage) and **logged-in users** (MongoDB).
- Mock checkout and order creation.
- Order confirmation email using Nodemailer.

## 1. Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Nodemailer
- **Frontend:** React (Vite), React Router, Axios
- **Authentication:** JWT + HTTP-only cookies
- **Email:** Nodemailer (Gmail / Mailtrap / SendGrid)

## 2. Project Structure

```text
clothing-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seedProducts.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── index.html
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── README.md
```

## 3. Getting Started

### 3.1 Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # then update values in .env
```

- Make sure to:
  - Add your `MONGO_URI`.
  - Add `JWT_SECRET`.
  - Add `EMAIL_USER` and `EMAIL_PASS`.
  - Update `CLIENT_URL` if needed (default is `http://localhost:5173`).

#### Seed Demo Products

```bash
node seedProducts.js
```

#### Run Backend in Development Mode

```bash
npm run dev
```

### 3.2 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## 4. Key API Endpoints

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login user and set JWT cookie
- `POST /api/auth/logout` – Clear auth cookie
- `GET /api/auth/me` – Get current user profile
- `GET /api/products` – Get products with search, filters and pagination
- `GET /api/products/:id` – Get single product
- `GET /api/cart` – Get authenticated user's cart
- `POST /api/cart/add` – Add item to cart
- `PUT /api/cart/update` – Update quantity
- `DELETE /api/cart/remove` – Remove cart item
- `POST /api/cart/merge` – Merge guest cart with user cart on login
- `POST /api/orders` – Create order from user's cart, send email
- `GET /api/orders/my` – Get logged-in user's orders

## 5. Frontend Routes

- `/` – Home page with hero + featured products
- `/products` – Product listing with search, filters and pagination
- `/product/:id` – Product detail with size selector and Add to Cart
- `/cart` – Shopping cart page
- `/checkout` – Checkout with mock payment and order placement
- `/order/:id` – Order success page
- `/login` – User login
- `/register` – User registration

## 6. Notes

- Cart works **even when not logged in** using localStorage.
- When user logs in, guest cart items are merged into backend cart.
- No real payment gateway is integrated; checkout is mocked.
- Email sending uses Nodemailer; configure credentials properly before testing.

---
This repository is designed to be **assignment-ready** and showcase
clean, readable, and secure MERN stack code for an e-commerce scenario.
