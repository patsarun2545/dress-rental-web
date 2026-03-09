# 👗 Online Dress Rental System

A full-stack web application for managing dress rentals, built with the **PERN Stack** (PostgreSQL, Express.js, React.js, Node.js). The system is split into two parts — a **Customer App** for browsing and renting dresses, and an **Admin Panel** for managing the full rental lifecycle.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT, RBAC (Role-Based Access Control) |
| Libraries | Axios, SweetAlert2, Day.js |
| Deployment | Ubuntu Linux, PM2 |

---

## ✨ Features

### 👤 Customer App

| Page | Description |
|------|-------------|
| **Home** | Browse product catalog with sorting (latest / price low→high / price high→low) and pagination (15 items/page). Products with status `reserved` or `delete` are shown separately with status badges. |
| **Product Detail** | View full product info with image gallery (main image + thumbnails), price, and description. Add to cart or wishlist. Status badges for unavailable items. |
| **Cart** | Checkout flow — select rental duration (from configurable options), pick-up or delivery, view return date (auto-calculated), see rental summary (price, discount, deposit, shipping fee), and submit payment transfer info. |
| **Orders** | View all rental orders with expandable item list, order status, return date, return status. Upload payment slip and return photo directly from the page. |
| **Wishlist (Heart)** | View saved wishlist items. Remove items or add directly to cart. |
| **Profile** | Edit personal info (name, phone, address), change password, and manage bank account details for deposit refund. |
| **Sign In** | Login with email + password. JWT token stored in localStorage. |
| **Sign Up** | Register with validation — email format, password min 8 chars with letters+numbers, phone exactly 10 digits. |
| **Contact** | Social media contact page (Instagram). |

### 🛠️ Admin Panel

- **Dashboard** — System overview: active rentals, revenue, low-stock alerts
- **Product Management** — CRUD products, variants (size/color), images, stock
- **Rental Management** — Full lifecycle management with status tracking
- **Payment Verification** — Review and approve/reject uploaded payment slips
- **Deposit Management** — Track security deposits (hold, refund, deduct)
- **Returns & Penalties** — Record returns, add penalties (late/damage/lost), generate invoices
- **Reports** — Monthly revenue chart, top-10 rented products, overdue rentals
- **Stock Reservation** — Conflict-checking to prevent double-booking
- **User Management** — Manage accounts, reset passwords, ban/unban users
- **Audit Logs** — Track all admin actions with date-range cleanup

---

## 🔄 Rental Workflow

```
PENDING → CONFIRMED → ACTIVE → RETURNED → COMPLETED
                                    ↑
                               LATE (auto)
PENDING/CONFIRMED → CANCELLED (stock released)
```

| Status | Description |
|--------|-------------|
| `PENDING` | Rental created, awaiting confirmation |
| `CONFIRMED` | Admin confirmed the booking |
| `ACTIVE` | Item picked up, currently rented |
| `LATE` | Past return date, auto-flagged |
| `RETURNED` | Item returned, pending final check |
| `COMPLETED` | Fully closed, stock released |
| `CANCELLED` | Cancelled by admin, stock released |

---

## 💳 Payment System

**Payment Types:**
- `RENTAL` — Rental fee
- `DEPOSIT` — Security deposit
- `PENALTY` — Late / damage / lost fee

**Payment Status:**
```
PENDING (slip uploaded) → APPROVED ✓
                        → REJECTED ✗
```

**Deposit Status:**
```
HELD → REFUNDED  (item returned in good condition)
     → DEDUCTED  (damage or loss deducted)
```

**Return Status (Customer-facing):**

| Status | Meaning |
|--------|---------|
| `pending` | Awaiting action |
| `Waitingtocheck` | Return photo uploaded, pending admin review |
| `approved` | Return accepted |
| `rejected` | Item damaged — deposit forfeited |
| `overdue` | Return overdue — deposit partially deducted |
---

## 🔌 API Endpoints

### Customer App

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

### Admin Panel

| Module | Endpoint | Description |
|--------|----------|-------------|
| Auth | `/api/auth/signIn` `/signUp` `/signOut` | Admin auth |
| Products | `/api/products` | CRUD products, variants, images |
| Catalog | `/api/catalog/categories` `/types` | Categories & types |
| Sizes/Colors | `/api/catalog/sizes` `/colors` | Size and color management |
| Promotions | `/api/promotions` | CRUD promotions |
| Rentals | `/api/rentals` | Create/manage/update rental status |
| Rental Items | `/api/rentals/:id/items` | Add/edit/remove rental items |
| Payments | `/api/payments` | Record payment, approve/reject slip |
| Deposits | `/api/rentals/:id/deposit` | Create/refund/deduct deposit |
| Penalties | `/api/rentals/:id/penalties` | Add/edit/delete penalties |
| Returns | `/api/rentals/:id/return` | Record return |
| Invoices | `/api/rentals/:id/invoice` | Generate invoice |
| Reservations | `/api/admin/reservations` | View & check stock availability |
| Users | `/api/users` | Manage user accounts |
| Reports | `/api/admin/revenue` `/products/top` `/rentals/overdue` | Revenue, top products, overdue |
| Dashboard | `/api/admin/dashboard` | System stats overview |
| Audit Logs | `/api/admin/audit` | View/delete audit logs |

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

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dress_rental"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

### Database Setup

```bash
cd server
npx prisma migrate dev
npx prisma db seed   # optional: seed sample data
```

### Run Development

```bash
# Start backend (from server/)
npm run dev

# Start frontend — customer app (from client/)
npm run dev

# Start frontend — admin panel (from admin/)
npm run dev
```

---

## 👨‍💻 Author

**Patsarun Kathinthong**
- Email: patsarun2545@gmail.com
- GitHub: [github.com/patsarun2545](https://github.com/patsarun2545)
