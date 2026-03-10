# 👗 Dress Rental Web

A full-stack web application for managing dress rentals, built with the **PERN Stack** (PostgreSQL, Express.js, React.js, Node.js). The system is split into two parts — a **Customer App** for browsing and renting dresses, and an **Admin Panel** for managing rentals and products.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT |
| Libraries | Axios, SweetAlert2 |
| Deployment | Ubuntu Linux |

---

## ✨ Features

### 👤 Customer App

| Page | Description |
|------|-------------|
| **Home** | Browse product catalog with sorting (latest / price low→high / price high→low) and pagination (15 items/page). Products with status `reserved` or `delete` are shown separately with status badges. |
| **Product Detail** | View full product info with image gallery (main image + thumbnails), price, and description. Add to cart or wishlist. Status badges for unavailable items. |
| **Cart** | Checkout flow — select rental duration, pick-up or delivery, view return date (auto-calculated), see rental summary (price, discount, deposit, shipping fee), and submit payment transfer info. |
| **Orders** | View all rental orders with item list, order status, return date, return status. Upload payment slip and return photo directly from the page. |
| **Wishlist (Heart)** | View saved wishlist items. Remove items or add directly to cart. Stored in localStorage. |
| **Profile** | Edit personal info (name, phone, address), change password, and manage bank account details for deposit refund. |
| **Sign In** | Login with email + password. JWT token stored in localStorage. |
| **Sign Up** | Register with validation — email format, password min 8 chars with letters+numbers, phone exactly 10 digits. |
| **Contact** | Social media contact page (Instagram: @chicborrow). |

### 🛠️ Admin Panel

| Page | Description |
|------|-------------|
| **Dashboard** | ระบบ overview (อยู่ระหว่างพัฒนา) |
| **Product** | CRUD สินค้า พร้อมอัปโหลดรูปภาพและนำเข้า Excel |
| **Category** | จัดการหมวดหมู่สินค้า พร้อมนำเข้า Excel และกรองสถานะ |
| **BillSale** | จัดการรายการสั่งเช่า / ออเดอร์ |
| **Customer** | จัดการข้อมูลลูกค้า (CRUD) |
| **User** | จัดการบัญชีแอดมิน เฉพาะ owner เท่านั้น |
| **Account** | จัดการบัญชีธนาคารร้าน เฉพาะ owner เท่านั้น |
| **RentalDays** | กำหนดตัวเลือกวันเช่า ส่วนลด และค่าจัดส่ง |

**Role ของ Admin:**
- `owner` — เข้าถึงได้ทุกหน้า รวมถึง User และ Account
- `use` — แอดมินทั่วไป

---

## 🔌 API Endpoints

### Customer App (port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/signin` | Customer sign in |
| `POST` | `/api/customers` | Customer sign up |
| `GET` | `/api/info` | Get current user info (JWT) |
| `PUT` | `/api/customers/:id` | Update profile |
| `GET` | `/product/list` | List products (filter by category, search, sort) |
| `GET` | `/product/detail/:id` | Product detail |
| `GET` | `/api/rental-days` | Rental duration options + discount + shipping fee |
| `GET` | `/api/account/list` | Get active bank accounts (for payment display) |
| `POST` | `/api/sale/save` | Submit rental order from cart |
| `GET` | `/api/sale/list` | List orders by customer |
| `GET` | `/api/sale/billInfo/:id` | Get items in an order |
| `POST` | `/api/sale/uploadPaymentImg/:id` | Upload payment slip |
| `PATCH` | `/api/sale/updateStatus/:id` | Update order status |
| `POST` | `/api/sale/uploadReturnImg/:id` | Upload return photo |
| `PATCH` | `/api/sale/updateReturnStatus/:id` | Update return status |

### Admin Panel (port 3001)

| Module | Endpoint | Description |
|--------|----------|-------------|
| Auth | `POST /user/signIn` | Admin sign in |
| Auth | `GET /user/info` | Get admin info |
| Products | `GET/POST /product/list` `/product/create` | List / create products |
| Products | `PUT /product/update` | Update product |
| Products | `DELETE /product/remove/:id` | Soft delete product |
| Products | `POST /product/upload` | Upload product image |
| Products | `POST /product/uploadFromExcel` | Import products from Excel |
| Categories | `GET /api/categories` | List all categories |
| Categories | `POST /api/categories` | Create category |
| Categories | `PUT /api/categories/:id` | Update category |
| Categories | `DELETE /api/categories/:id` | Soft delete category |
| Categories | `POST /api/categories/uploadFromExcel` | Import categories from Excel |
| RentalDays | `GET /api/rental-days` | List rental day options |
| RentalDays | `POST /api/rental-days/save` | Create / update rental day |
| Accounts | `GET /api/account/list` | List bank accounts |
| Accounts | `POST /api/account/create` | Create account |
| Accounts | `PUT /api/account/update` | Update account |
| Accounts | `DELETE /api/account/remove/:id` | Soft delete account |
| Customers | `GET /api/customers` | List customers |
| Customers | `POST /api/customers` | Create customer |
| Customers | `PUT /api/customers/:id` | Update customer |
| Customers | `DELETE /api/customers/:id` | Soft delete customer |
| Users | `GET /user/users` | List admin users |
| Users | `POST /user/users` | Create admin user |
| Users | `PUT /user/users/:id` | Update admin user |
| Users | `DELETE /user/users/:id` | Soft delete admin user |

---

## 🗂️ Project Structure

```
CHICBORROW/
├── api/                        # Backend (Express.js)
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
│   ├── uploads/                # Product images
│   ├── payments/               # Payment slip images
│   ├── returns/                # Return photo images
│   ├── shipping/               # Shipping images
│   └── server.js
│
├── app/                        # Admin Panel (React)
│   └── src/
│       ├── components/
│       └── pages/backoffice/
│           ├── Account.js
│           ├── BillSale.js
│           ├── Category.js
│           ├── Customer.js
│           ├── Dashboard.js
│           ├── Home.js
│           ├── Product.js
│           ├── RentalDays.js
│           ├── signin.js
│           └── user.js
│
└── homepage/                   # Customer App (React)
    └── src/
        ├── components/
        └── pages/
            ├── carts.js
            ├── contact.js
            ├── heart.js
            ├── Home.js
            ├── orders.js
            ├── productdetail.js
            ├── profile.js
            ├── signin.js
            └── signup.js
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
cd ../app/app
npm install

# Install customer app dependencies
cd ../../homepage/app
npm install
```

### Environment Variables

Create a `.env` file in the `api/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dress_rental"
TOKEN_SECRET="your_jwt_secret"
```

### Database Setup

```bash
cd api
npx prisma migrate dev
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

Backend runs on **port 3001** by default.

---

## 👨‍💻 Author

**Patsarun Kathinthong**
- Email: patsarun2545@gmail.com
- GitHub: [github.com/patsarun2545](https://github.com/patsarun2545)
