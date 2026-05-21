<div align="center">

# 👜 BagWagon

### *Your destination for bags that speak your style*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<br/>

> A sleek, full-stack e-commerce web app for bag enthusiasts — built with the modern web stack you love.

<br/>

[🚀 Getting Started](#-getting-started) · [✨ Features](#-features) · [🗂️ Project Structure](#️-project-structure) · [☁️ Deployment](#️-free-deployment) · [🔮 Roadmap](#-future-roadmap)

</div>

---

## 🌟 About BagWagon

**BagWagon** is a sleek and modern e-commerce web application designed for bag enthusiasts. It offers a seamless shopping experience with a clean, responsive UI and a secure backend — from browsing a curated collection to a smooth checkout.

Built with **EJS** for server-side templating, **Express.js** for a fast backend, **MongoDB + Mongoose** for data persistence, and **Tailwind CSS** for a polished, responsive UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Register, login & logout with JWT cookie-based sessions |
| 🛍️ **Shop Page** | Browse a curated collection of bags |
| 🛒 **Cart Management** | Add items, remove individual items, view price breakdown |
| 💳 **Checkout** | Streamlined checkout that clears cart on completion |
| 🧑‍💼 **Owner / Admin Panel** | Create and manage products (available in dev mode) |
| 💬 **Flash Messages** | Friendly UX feedback for errors and success states |
| 📱 **Responsive Design** | Fully optimized for mobile and desktop |

---

## 🛠️ Tech Stack

```
👜 BagWagon
├── 🟢 Backend     →  Node.js + Express.js (ESM)
├── 🍃 Database    →  MongoDB + Mongoose
├── 🎨 Frontend    →  EJS Templates + Tailwind CSS (CDN)
└── 🔑 Auth        →  JWT + HTTP-only Cookies
```

---

## 🗂️ Project Structure

```
bagwagon/
│
├── 📄 app.js                  # App entry — middleware & route mounting
├── 📁 routes/                 # All application routes
├── 📁 controllers/            # Controller logic (auth, etc.)
├── 📁 models/                 # Mongoose data models
├── 📁 middlewares/            # Auth & other middleware
├── 📁 views/                  # EJS templates
│   └── partials/              # Shared layout components
├── 📁 public/                 # Static assets (JS / CSS / images)
├── 📁 utils/                  # Helpers (e.g., token generation)
└── 📁 db/                     # Database connection
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bagwagon.git
cd bagwagon
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
EXPRESS_SESSION_SECRET=your_session_secret
CORS_ORIGIN=http://localhost:3000
```

### 4. Start the application

```bash
npm start
```

Open your browser and visit 👉 **http://localhost:3000**

---

## 🧑‍💼 Owner / Admin Panel

> The admin panel for creating products is **only available in development mode**.

**Windows (PowerShell):**
```powershell
$env:NODE_ENV="development"; npm start
```

**Mac / Linux:**
```bash
NODE_ENV=development npm start
```

### Admin Routes

| Route | Description |
|---|---|
| `GET /owners/create` | Owner login / registration screen |
| `GET /owners/admin` | Product creation dashboard |

---


## 🔮 Future Roadmap

- [ ] ⭐ User reviews and ratings
- [ ] 💳 Payment gateway integration (Razorpay / Stripe)
- [ ] 📊 Admin dashboard for inventory management
- [ ] 🔍 Product search and filtering
- [ ] 📦 Order history and tracking

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ by a bag lover, for bag lovers.

⭐ **If you like this project, give it a star!** ⭐

</div>
