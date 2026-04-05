# 👗 ChicBorrow — Dress Rental Web

[![User Demo](https://img.shields.io/badge/User-Demo-000?style=flat-square&logo=vercel&logoColor=white)](https://dress-rental-web-wtnm.vercel.app/)
[![Admin Demo](https://img.shields.io/badge/Admin-Demo-000?style=flat-square&logo=vercel&logoColor=white)](https://dress-rental-web.vercel.app/)


A full-stack web application for managing dress rentals, built with the **PERN Stack** (PostgreSQL, Express.js, React.js, Node.js). The system is split into two parts — a **Customer App** (homepage) for browsing and renting dresses, and an **Admin Panel** (backoffice) for managing rentals and products.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Bootstrap 5, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT (jsonwebtoken) |
| Charts | Chart.js, react-chartjs-2 (Bar / Line) |
| Libraries | Axios, SweetAlert2, ExcelJS, express-fileupload, dayjs |
| Deployment | Ubuntu Linux |

---

## 🗂️ Database Models (Prisma)

| Model | Key Fields |
|-------|-----------|
| `User` | id, name, user *(unique)*, pass, status (`use` / `owner`) |
| `Customer` | id, name, email *(unique)*, pass, phone, address, bankName, bankAccountName, bankAccountNo, status (`active` / `inactive`) |
| `Product` | id, name, detail, cost, price, deposit, img, status (`use` / `reserved` / `delete`), categoryId |
| `ProductImage` | id, productId, url |
| `Category` | id, name *(unique)*, status (`active` / `inactive`) |
| `BillSale` | id, customerId, Date, Time, status (`wait` / `pay` / `send` / `cancel`), totalPrice, totalDeposit, grandTotal, transferDate, transferTime, transferAccountName, transferBankName, returnStatus (`pending` / `Waitingtocheck` / `approved` / `rejected` / `overdue`), returnDate, deliveryMethod (`pickup` / `delivery`), shippingFee, Paymentimg, Returnimg, shippingimg |
| `BillSaleDetail` | id, billSaleId, productId, cost, price, deposit |
| `RentalDays` | id, days *(Float)*, discount *(Float, e.g. 0.1 = 10%)*, shippingFee, description, status (`active` / `inactive`) |
| `Account` | id, accountName, accountNumber, bankName, status (`use` / `delete`), createdAt, updatedAt |

---

## ✨ Features

### 👤 Customer App (`homepage/`)

| Page | Description |
|------|-------------|
| **Home** | Browse products with status `use`. Supports sorting (latest / price low→high / price high→low) and pagination (15 items/page). Products with status `reserved` or `delete` are shown separately at the bottom with status badges. |
| **Product Detail** | View full product info with main image and thumbnail gallery, price, and description. Add to cart or wishlist. Unavailable items show a status badge instead of action buttons. |
| **Cart** | Select rental duration (from RentalDays), choose delivery method (pick-up / delivery), auto-calculate return date, view rental summary (price + discount + deposit + shipping fee), display shop bank accounts for payment, fill in transfer info, then submit to create an order. |
| **Orders** | View all customer orders with order status and return status. Upload payment slip and update status to `pay`. Upload return photo and update returnStatus. View shipping proof image from the shop. |
| **Wishlist** | View saved wishlist items stored in localStorage. Remove items or add them directly to cart. |
| **Profile** | Edit personal info (name, phone, address), change password, and manage bank account details for deposit refund. |
| **Sign In** | Login with email + password. JWT token stored in localStorage. Redirects to `/home` on success. |
| **Sign Up** | Register with validation — email format, password min 8 characters (letters + numbers), phone exactly 10 digits. |
| **Contact** | Social media contact page (Instagram: @chicborrow). |

### 🛠️ Admin Panel (`app/`)

| Page | Description |
|------|-------------|
| **Dashboard** | 10 summary cards (total orders / paid / shipped / returned / today's revenue / monthly revenue / yearly revenue / customers / available products / rented products) + monthly revenue chart switchable between Bar and Line (Chart.js). Each card is clickable and navigates to the relevant page. |
| **Product** | Full CRUD for products (name, detail, cost, price, deposit, category). Supports multi-image upload and Excel import. |
| **Category** | Full CRUD for categories with status filter, search by id/name, and Excel import. |
| **BillSale** | Manage all rental orders. Search by id / customer name / phone / address. Filter by sale status / return status / delivery method. View order items, payment summary, payment slip, and shipping image. Upload shipping proof image (auto-sets status to `send`). Update sale status (`cancel`) and return status (`approved` / `overdue` / `rejected`). |
| **Customer** | Full CRUD for customers including personal info and bank account details. |
| **RentalDays** | Manage rental duration options with discount (%), shipping fee, and description. |
| **Account** | Manage shop bank accounts — accessible by `owner` only. |
| **User** | Manage admin accounts — accessible by `owner` only. Prevents deleting your own account. |

**Admin Roles:**
- `owner` — Full access to all pages including User and Account management.
- `use` — General admin. Automatically redirected away from User and Account pages.

---

## 🔌 API Endpoints (Backend — port 3001)

### 🔐 Auth — Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user/signIn` | Admin sign in (username + password) |
| `GET` | `/user/info` | Get current admin info (JWT) |

### 🔐 Auth — Customer

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/signin` | Customer sign in (email + password) |
| `GET` | `/api/info` | Get current customer info (JWT) |

### 👤 Users (Admin — owner only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/users` | List all admin users |
| `POST` | `/user/users` | Create admin user |
| `PUT` | `/user/users/:id` | Update admin user |
| `DELETE` | `/user/users/:id` | Soft delete (status → `delete`) |
| `DELETE` | `/user/users/hard-delete/:id` | Hard delete admin user |

### 👥 Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/customers` | List active customers (status = `active`) |
| `POST` | `/api/customers` | Create / sign up customer |
| `PUT` | `/api/customers/:id` | Update customer profile |
| `DELETE` | `/api/customers/:id` | Soft delete (status → `inactive`) |
| `GET` | `/api/dashboard/customers/count` | Total customer count (used by Dashboard) |

### 📦 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/product/list` | List products (query params: categoryId, search, sort) |
| `GET` | `/product/detail/:id` | Product detail + images |
| `POST` | `/product/create` | Create product |
| `PUT` | `/product/update` | Update product |
| `DELETE` | `/product/remove/:id` | Soft delete (status → `delete`) |
| `POST` | `/product/upload` | Upload product image |
| `POST` | `/product/uploadFromExcel` | Import products from Excel |
| `GET` | `/product/search/suggestions` | Search autocomplete (top 5 results) |
| `GET` | `/product/dashboard/total-products` | Count products with status `use` |
| `GET` | `/product/dashboard/Includes-rental-products` | Count products with status `reserved` |

### 🗂️ Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | List all categories |
| `GET` | `/api/categories/:id` | Category detail + related products |
| `POST` | `/api/categories` | Create category |
| `PUT` | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Soft delete (status → `inactive`) |
| `POST` | `/api/categories/uploadFromExcel` | Import categories from Excel |

### 📅 Rental Days

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/rental-days` | List active rental duration options |
| `POST` | `/api/rental-days/save` | Create or update a rental day option (upsert by id) |

### 🏦 Accounts (Bank)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/account/list` | List active bank accounts (status = `use`) |
| `GET` | `/api/account/detail/:id` | Account detail |
| `POST` | `/api/account/create` | Create bank account |
| `PUT` | `/api/account/update` | Update bank account |
| `DELETE` | `/api/account/remove/:id` | Soft delete (status → `delete`) |

### 🧾 Sales / Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/sale/save` | Submit rental order — creates BillSale + BillSaleDetail, sets products to `reserved`, calculates grandTotal |
| `GET` | `/api/sale/list` | List orders (filtered by customerId for customers, all for admin) |
| `GET` | `/api/sale/billInfo/:billSaleId` | Get order items (BillSaleDetail + Product + BillSale) |
| `PATCH` | `/api/sale/updateStatus/:billSaleId` | Update order status (`wait` / `pay` / `send` / `cancel`) |
| `PATCH` | `/api/sale/updateReturnStatus/:billSaleId` | Update return status (`pending` / `Waitingtocheck` / `approved` / `rejected` / `overdue`) |
| `POST` | `/api/sale/uploadPaymentImg/:billSaleId` | Upload payment slip (replaces existing file) |
| `POST` | `/api/sale/uploadShippingImg/:billSaleId` | Upload shipping proof image (replaces existing file) |
| `POST` | `/api/sale/uploadReturnImg/:billSaleId` | Upload return photo (replaces existing file) |
| `GET` | `/api/sale/dashboard` | Monthly revenue data (12 months) for chart |
| `GET` | `/api/sale/orderCountDashboard` | Total order count |
| `GET` | `/api/sale/orderpayDashboard` | Count orders with status `pay` |
| `GET` | `/api/sale/ordersendDashboard` | Count orders with status `send` |
| `GET` | `/api/sale/orderreturnDashboard` | Count orders with returnStatus `approved` |
| `GET` | `/api/sale/todayTotal` | Today's total revenue |
| `GET` | `/api/sale/currentMonthTotal` | Current month total revenue |
| `GET` | `/api/sale/currentYearTotal` | Current year total revenue |

---

## 🗂️ Project Structure

```
CHICBORROW/
├── api/                          # Backend (Express.js + Prisma)
│   ├── controllers/
│   │   ├── AccountController.js
│   │   ├── CategoryController.js
│   │   ├── CustomerController.js
│   │   ├── ProductController.js
│   │   ├── RentalDaysController.js
│   │   ├── SaleController.js
│   │   └── UserController.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── uploads/                  # Product images
│   ├── payments/                 # Payment slip images
│   ├── returns/                  # Return photo images
│   ├── shipping/                 # Shipping proof images
│   ├── .env
│   └── server.js
│
├── app/                          # Admin Panel (React)
│   └── src/
│       ├── components/
│       │   ├── BackOffice.js
│       │   └── MyModal.js
│       ├── config.js
│       └── pages/backoffice/
│           ├── signin.js         # Admin login (username + password)
│           ├── Dashboard.js      # Summary cards + Bar/Line chart (Chart.js)
│           ├── Home.js
│           ├── Product.js        # CRUD + image upload + Excel import
│           ├── Category.js       # CRUD + search/filter + Excel import
│           ├── BillSale.js       # Order management + shipping upload
│           ├── Customer.js       # Customer CRUD
│           ├── RentalDays.js     # Rental duration options
│           ├── Account.js        # Bank accounts (owner only)
│           └── user.js           # Admin users (owner only)
│
└── homepage/                     # Customer App (React)
    └── src/
        ├── components/
        │   └── BackOffice.js
        ├── config.js
        └── pages/
            ├── signin.js         # Customer login (email + password)
            ├── signup.js         # Registration + validation
            ├── Home.js           # Product catalog (sort + pagination)
            ├── productdetail.js  # Product detail + image gallery
            ├── carts.js          # Cart, rental options & checkout
            ├── orders.js         # Order history + upload slip/return photo
            ├── heart.js          # Wishlist (localStorage)
            ├── profile.js        # Edit profile & bank info
            └── contact.js        # Contact page (Instagram)
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14

### Installation

```bash
# Clone the repository
git clone https://github.com/patsarun2545/<repo-name>.git
cd <repo-name>

# Install backend dependencies
cd api
npm install

# Install admin panel dependencies
cd ../app
npm install

# Install customer app dependencies
cd ../homepage/app
npm install
```

### Environment Variables

Create a `.env` file in the `api/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/chicborrow"
TOKEN_SECRET="your_jwt_secret"
```

### Database Setup

```bash
cd api
npx prisma migrate dev
npx prisma generate
```

### Run Development

```bash
# Start backend (from api/)
node server.js

# Start admin panel (from app/)
npm start

# Start customer app (from homepage/app/)
npm start
```

Backend runs on **port 3001** by default.

---

## 👨‍💻 Author

**Patsarun Kathinthong**
- Email: patsarun2545@gmail.com
- GitHub: [github.com/patsarun2545](https://github.com/patsarun2545)
