# 👗 ChicBorrow — Dress Rental Web

[![User Demo](https://img.shields.io/badge/User-Demo-000?style=flat-square&logo=vercel&logoColor=white)](https://dress-rental-web-wtnm.vercel.app/)
[![Admin Demo](https://img.shields.io/badge/Admin-Demo-000?style=flat-square&logo=vercel&logoColor=white)](https://dress-rental-web.vercel.app/)

A full-stack dress rental management system built with **React.js**, **Express.js**, and **PostgreSQL**. Features role-based access for customers and admins, product catalog with image galleries, rental order management with payment tracking, and comprehensive dashboard analytics.

---

## 🛠️ Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | React.js 18.3, Express.js 4.21                        |
| Frontend   | React Router DOM, Axios, SweetAlert2, dayjs           |
| Backend    | Express.js, body-parser, cors                         |
| Runtime    | Node.js                                               |
| Database   | PostgreSQL 14, Prisma ORM 5.22                        |
| Auth       | JWT (jsonwebtoken)                                    |
| Storage    | express-fileupload, multer, local filesystem          |
| Validation | Client-side validation (email format, password rules) |
| Caching    | localStorage (cart, wishlist, auth tokens)            |
| UI Extras  | Chart.js 4.4, react-chartjs-2, react-beautiful-dnd    |
| Tools      | ExcelJS, dotenv, TypeScript (dev)                     |

---

## ✨ Features Overview

- **Role-Based Access Control**: Two separate interfaces — Customer App for browsing and renting, Admin Panel for management
- **Admin Roles**: `owner` (full access including User/Account management) and `use` (restricted access, auto-redirected from sensitive pages)
- **Product Management**: Full CRUD with multi-image upload, Excel bulk import, category filtering, search autocomplete, and status tracking (`use`/`reserved`/`delete`)
- **Category Management**: Full CRUD with Excel import, status filtering, and search functionality
- **Customer Registration**: Email/password authentication with validation (email format, password min 8 chars with letters+numbers, phone exactly 10 digits)
- **Shopping Cart**: Add to cart with rental duration selection, delivery method (pickup/delivery), automatic return date calculation, discount application, deposit tracking, and shipping fee calculation
- **Order Management**: Order creation with BillSale and BillSaleDetail, payment slip upload, shipping proof upload, return photo upload, status tracking
- **Order Status Flow**: `wait` → `pay` → `send` → (return process) → `approved`/`rejected`/`overdue`
- **Return Status Flow**: `pending` → `Waitingtocheck` → `approved`/`rejected`/`overdue`/`pendingConfirmation`
- **Bank Account Management**: Shop bank accounts for payment processing (owner-only access)
- **Rental Duration Options**: Configurable rental days with discount percentages and shipping fees
- **Dashboard Analytics**: 10 summary cards (total orders, paid, shipped, returned, today/month/year revenue, customers, available/rented products) with clickable navigation
- **Revenue Chart**: Monthly revenue visualization switchable between Bar and Line charts using Chart.js
- **Wishlist**: localStorage-based wishlist with add-to-cart functionality
- **Profile Management**: Edit personal info, change password, manage bank account details for deposit refunds
- **File Upload**: Product images, payment slips, shipping proofs, and return photos with automatic file replacement
- **Search & Sort**: Product search with autocomplete, category filtering, and sorting by latest/price
- **Pagination**: Product catalog with 15 items per page

---

## 📁 Project Structure

```
Online-Dress-Rental-System/
├── api/                                    # Backend (Express.js + Prisma)
│   ├── controllers/                        # Route handlers
│   │   ├── AccountController.js           # Bank account CRUD
│   │   ├── CategoryController.js          # Category CRUD + Excel import
│   │   ├── CustomerController.js           # Customer auth + CRUD
│   │   ├── ProductController.js           # Product CRUD + image upload + Excel
│   │   ├── RentalDaysController.js        # Rental duration options
│   │   ├── SaleController.js              # Order management + file uploads + dashboard
│   │   └── UserController.js              # Admin auth + user management
│   ├── prisma/
│   │   └── schema.prisma                   # Database schema definitions
│   ├── uploads/                            # Product image storage
│   ├── payments/                           # Payment slip storage
│   ├── returns/                            # Return photo storage
│   ├── shipping/                           # Shipping proof storage
│   ├── .env                                # Environment variables
│   ├── package.json                        # Backend dependencies
│   └── server.js                           # Express server setup
│
├── app/                                    # Admin Panel (React)
│   └── app/
│       └── src/
│           ├── components/
│           │   ├── BackOffice.js           # Layout wrapper
│           │   ├── MyModal.js              # Modal component
│           │   ├── Navbar.js               # Navigation bar
│           │   ├── Sidebar.js              # Sidebar navigation
│           │   ├── ControlSidebar.js       # Sidebar controls
│           │   └── Footer.js               # Footer component
│           ├── config.js                   # API configuration
│           └── pages/backoffice/
│               ├── signin.js               # Admin login (username + password)
│               ├── Dashboard.js            # Analytics + Chart.js visualization
│               ├── Home.js                 # Home page
│               ├── Product.js              # Product CRUD + image upload + Excel
│               ├── Category.js             # Category CRUD + search + Excel
│               ├── BillSale.js             # Order management + status updates
│               ├── Customer.js             # Customer management
│               ├── RentalDays.js           # Rental duration configuration
│               ├── Account.js              # Bank accounts (owner only)
│               └── user.js                 # Admin users (owner only)
│
└── homepage/                               # Customer App (React)
    └── app/
        └── src/
            ├── components/
            │   ├── BackOffice.js           # Layout wrapper
            │   ├── MyModal.js              # Modal component
            │   ├── Navbar.js               # Navigation bar
            │   └── Navbar.css              # Navbar styles
            ├── config.js                   # API configuration
            └── pages/
                ├── signin.js               # Customer login (email + password)
                ├── signup.js               # Registration with validation
                ├── Home.js                 # Product catalog (sort + pagination)
                ├── Home.css                # Home page styles
                ├── productdetail.js        # Product detail + image gallery
                ├── carts.js                # Cart + checkout + rental options
                ├── carts.css               # Cart styles
                ├── orders.js               # Order history + file uploads
                ├── orders.css              # Orders styles
                ├── heart.js                # Wishlist (localStorage)
                ├── profile.js              # Profile + bank info management
                └── contact.js              # Contact page (Instagram)
```

---

## 🗃️ Database Schema

| Model            | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User`           | Admin user accounts with username/password authentication. Fields: id, name, user (unique), pass, status (`use`/`owner`)                                                                                                                                                                                                                                                                                             |
| `Customer`       | Customer accounts with email/password authentication. Fields: id, name, email (unique), pass, phone, address, bankName, bankAccountName, bankAccountNo, status (`active`/`inactive`). Relates to BillSales                                                                                                                                                                                                           |
| `Product`        | Dress/product inventory. Fields: id, name, detail, cost, price, deposit, status (`use`/`reserved`/`delete`), categoryId. Relates to Category, BillSaleDetail, ProductImage                                                                                                                                                                                                                                           |
| `ProductImage`   | Product image gallery. Fields: id, productId, url. Relates to Product                                                                                                                                                                                                                                                                                                                                                |
| `Category`       | Product categorization. Fields: id, name (unique), status (`active`/`inactive`). Relates to Products                                                                                                                                                                                                                                                                                                                 |
| `BillSale`       | Rental orders. Fields: id, Date, Time, status (`wait`/`pay`/`send`/`cancel`), customerId, totalPrice, totalDeposit, grandTotal, transferDate, transferTime, transferAccountName, transferBankName, returnStatus (`pending`/`Waitingtocheck`/`approved`/`rejected`/`overdue`), returnDate, deliveryMethod (`pickup`/`delivery`), shippingFee, Paymentimg, Returnimg, shippingimg. Relates to Customer, BillSaleDetail |
| `BillSaleDetail` | Order line items. Fields: id, billSaleId, productId, cost, price, deposit. Relates to BillSale, Product                                                                                                                                                                                                                                                                                                              |
| `RentalDays`     | Rental duration configuration. Fields: id, days (Float), discount (Float, e.g. 0.1 = 10%), shippingFee, description, status (`active`/`inactive`)                                                                                                                                                                                                                                                                    |
| `Account`        | Shop bank accounts for payments. Fields: id, accountName, accountNumber, bankName, status (`use`/`delete`), createdAt, updatedAt                                                                                                                                                                                                                                                                                     |

---

## 🔄 System Flow

## 01 · Authentication

**Admin Flow:**

```
Admin → POST /user/signIn → JWT token (8h expiry) → localStorage → Protected routes
```

**Customer Flow:**

```
Customer → POST /api/signin → JWT token (4h expiry) → localStorage → Protected routes
```

**Admin Capabilities:**

- Sign in with username and password
- Access all admin pages based on role (`owner` or `use`)
- `owner` role can manage User and Account pages
- `use` role is auto-redirected from User and Account pages

**Customer Capabilities:**

- Sign in with email and password
- Sign up with validation (email format, password min 8 chars with letters+numbers, phone exactly 10 digits)
- Access customer-only pages (Home, Cart, Orders, Wishlist, Profile)
- Logout removes token from localStorage

---

## 02 · Customer Flow

```
Browse Products → Add to Cart → Select Rental Duration → Choose Delivery Method
→ Calculate Total → View Bank Accounts → Enter Transfer Info → Submit Order
→ Upload Payment Slip → Wait for Admin → Receive Shipping Proof → Return Product
→ Upload Return Photo → Receive Deposit Refund
```

**Customer Capabilities:**

- Browse products with category filter, search, and sort (latest/price low-to-high/price high-to-low)
- View product details with image gallery
- Add products to cart or wishlist
- Select rental duration with automatic discount calculation
- Choose delivery method (pickup or delivery)
- View automatic return date calculation
- See rental summary (price + discount + deposit + shipping fee)
- View shop bank accounts for payment
- Enter transfer information (date, time, account name, bank name)
- Submit order to create BillSale and BillSaleDetail
- Upload payment slip to update status to `pay`
- View order history with status tracking
- Upload return photo when returning items
- Edit profile (name, phone, address, password, bank account details)

**Order Status Table:**

| Status   | Description                         |
| -------- | ----------------------------------- |
| `wait`   | Order created, awaiting payment     |
| `pay`    | Payment verified, awaiting shipment |
| `send`   | Shipped, awaiting return            |
| `cancel` | Order cancelled                     |

**Return Status Table:**

| Status                | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `pending`             | Awaiting return                                          |
| `Waitingtocheck`      | Return uploaded, awaiting admin review                   |
| `approved`            | Return approved, deposit refunded, products set to `use` |
| `rejected`            | Return rejected                                          |
| `overdue`             | Return overdue                                           |
| `pendingConfirmation` | Pending confirmation                                     |

---

## 03 · Admin Flow

```
Dashboard Overview → Manage Products → Manage Categories → Manage Orders
→ Upload Shipping Proof → Update Return Status → Manage Customers
→ Configure Rental Days → Manage Bank Accounts (owner only)
→ Manage Admin Users (owner only)
```

**Admin Capabilities:**

- View dashboard with 10 summary cards (total orders, paid, shipped, returned, today/month/year revenue, customers, available/rented products)
- View monthly revenue chart (Bar/Line switchable)
- Create, read, update, soft-delete products
- Upload multiple product images
- Import products from Excel with validation
- Create, read, update, soft-delete categories
- Import categories from Excel
- Manage all rental orders with search and filters
- Search orders by id, customer name, phone, address
- Filter by sale status, return status, delivery method
- View order items, payment summary, payment slip, shipping image
- Upload shipping proof image (auto-sets status to `send`)
- Update sale status (`cancel`)
- Update return status (`approved`/`overdue`/`rejected`)
- Manage customer profiles and bank account details
- Configure rental duration options with discount and shipping fee
- Manage shop bank accounts (owner only)
- Manage admin user accounts (owner only)
- Prevent deletion of own admin account

**Product Status Table:**

| Status     | Description        |
| ---------- | ------------------ |
| `use`      | Available for rent |
| `reserved` | Currently rented   |
| `delete`   | Soft-deleted       |

**User Status Table:**

| Status   | Description            |
| -------- | ---------------------- |
| `use`    | Active admin           |
| `owner`  | Owner with full access |
| `delete` | Soft-deleted admin     |

---

## 💾 Caching Strategy

| Tag pattern | Scope        | Revalidated on                     |
| ----------- | ------------ | ---------------------------------- |
| `carts`     | localStorage | Manual add/remove/clear            |
| `heart`     | localStorage | Manual add/remove/clear            |
| `token`     | localStorage | Login/logout                       |
| N/A         | Server-side  | No server-side caching implemented |

---

## 🔐 Security

- **JWT Authentication**: Token-based auth for both admin (8h expiry) and customer (4h expiry) routes
- **Password Storage**: Plain text storage (no bcrypt/hashing implemented)
- **Role-Based Access Control**: Admin roles (`owner`/`use`) with page-level restrictions
- **Protected Routes**: Middleware checks JWT token validity before accessing protected endpoints
- **CORS Configuration**: Configured allowed origins from environment variable
- **File Upload Validation**: Mimetype checks for image uploads (payment slips, shipping proofs, return photos, product images)
- **Input Validation**: Client-side validation for email format, password complexity, phone number format
- **Soft Delete**: Status-based deletion instead of hard delete for data integrity
- **Token Verification**: JWT secret from environment variable for token signing/verification
- **Authorization Header**: Token passed via Authorization header in API requests

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14

### Installation

```bash
# Clone the repository
git clone https://github.com/patsarun2545/Online-Dress-Rental-System.git
cd Online-Dress-Rental-System

# Install backend dependencies
cd api
npm install

# Install admin panel dependencies
cd ../app/app
npm install

# Install customer app dependencies
cd ../../homepage/app
npm install
```

### Environment Variables

Create a `.env` file in the `api/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/chicborrow"
TOKEN_SECRET="your_jwt_secret_key_here"
PORT=3001
CLIENT_URLS="http://localhost:3000,http://localhost:3001"
```

**Note:** `TOKEN_SECRET` is used for JWT authentication in UserController and CustomerController. `CLIENT_URLS` should be a comma-separated list of allowed frontend origins for CORS.

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

# Start admin panel (from app/app/)
npm start

# Start customer app (from homepage/app/)
npm start
```

Backend runs on **port 3001** by default. Admin panel runs on port 3000, customer app runs on port 3000 (configure ports as needed).

---

## 👤 Author

**Patsarun Kathinthong**

- Role: Full Stack Developer (PERN Stack)
- Email: patsarun2545@gmail.com
- GitHub: [github.com/patsarun2545](https://github.com/patsarun2545)
