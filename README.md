# 📦 InventAI

# 🌐 Live Demo

### Frontend
https://invent-ai-pi.vercel.app/

### Backend API (Swagger)
https://inventai-m4e4.onrender.com/docs

> A modern full-stack Inventory & Billing Management System with AI-powered business insights.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)

InventAI is a modern inventory and billing platform built for small and medium businesses to efficiently manage products, customers, orders, invoices, and business analytics through an intuitive dashboard.

The project follows a clean full-stack architecture using React + TypeScript on the frontend and FastAPI + PostgreSQL on the backend.

## 📊 Project Statistics

- 🚀 30+ REST API Endpoints
- 📦 7 Business Management Modules
- 🔐 JWT Authentication & Authorization
- 🤖 AI-powered Business Assistant (Google Gemini)
- 🗄️ PostgreSQL Database (Neon)
- ☁️ Fully Cloud Deployed (Vercel + Render)
- ⚛️ React + TypeScript Frontend
- ⚡ FastAPI Backend

---

## Table of Contents

- Features
- Screenshots
- Tech Stack
- Architecture
- Installation
- Environment Variables
- API Documentation
- Future Improvements
- Author

---

# ✨ Features

## 📌 Project Highlights

- 30+ REST API endpoints
- 7 business management modules
- Secure JWT Authentication
- AI-powered Business Assistant using Google Gemini
- PostgreSQL database with SQLAlchemy ORM
- Interactive analytics dashboard with Recharts

## 🔐 Authentication

- Secure JWT Authentication
- User Login & Registration
- Protected Routes
- Password Hashing

---

## 📦 Inventory Management

- Add Products
- Update Products
- Delete Products
- Product Search
- Category Management
- Inventory Valuation

---

## 👥 Customer Management

- Customer Profiles
- Customer History
- Contact Information
- Order Tracking

---

## 🛒 Order Management

- Create Orders
- Order Status Tracking
- Complete Orders
- Delete Orders

---

## 🧾 Invoice Management

- Automatic Invoice Generation
- PDF Invoice Download
- Invoice History
- Payment Status

---

## 📊 Analytics Dashboard

- Revenue Analytics
- Monthly Sales Charts
- Order Status Distribution
- Top Selling Products
- Low Stock Monitoring
- Inventory Value
- Business KPIs

---

## 🤖 AI Business Assistant

- AI-powered business analytics
- Inventory health analysis
- Revenue and sales insights
- Customer behavior summaries
- Smart inventory recommendations
- Natural language business queries
- Context-aware responses using Google Gemini

---

# 🖼️ Screenshots

## Dashboard

![Dashboard](Screenshots/dashboard.png)

---

## Inventory

![Inventory](Screenshots/inventory.png)

---

## Customers

![Customers](Screenshots/customers.png)

---

## Orders

![Orders](Screenshots/orders.png)

---

## Invoices

![Invoices](Screenshots/invoices.png)

---

## Analytics

![Analytics](Screenshots/analytics.png)

---

## AI Business Assistant

![AI Assistant](Screenshots/ai-assistant.png)

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- Recharts
- CSS

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication
- Bcrypt

---

# 🌐 Deployment

| Component | Service | URL |
|------------|---------|-----|
| Frontend | Vercel | https://invent-ai-pi.vercel.app |
| Backend API | Render | https://inventai-m4e4.onrender.com |
| API Docs | Swagger | https://inventai-m4e4.onrender.com/docs |
| Database | Neon PostgreSQL | Managed Cloud Database |
| AI | Google Gemini | Gemini API |

---

# 📁 Project Structure

```
InventAI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   ├── database
│   │   └── core
│   └── requirements.txt
│
├── src
│   ├── api
│   ├── components
│   ├── pages
│   ├── hooks
│   └── styles
│
├── Screenshots
├── README.md
└── package.json
```

---

# 🏛️ Architecture

```text
                    ┌─────────────────────────────┐
                    │       React + Vite          │
                    │      TypeScript Frontend    │
                    └─────────────┬───────────────┘
                                  │
                           Axios HTTP Requests
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │      FastAPI Backend        │
                    │ Authentication • Business   │
                    │ Logic • REST APIs           │
                    └─────────────┬───────────────┘
                                  │
             ┌────────────────────┴────────────────────┐
             │                                         │
             ▼                                         ▼
 ┌─────────────────────┐                 ┌────────────────────────┐
 │ SQLAlchemy ORM      │                 │ Google Gemini AI       │
 │ Database Layer      │                 │ AI Business Assistant  │
 └──────────┬──────────┘                 └────────────────────────┘
            │
            ▼
 ┌─────────────────────┐
 │ Neon PostgreSQL     │
 │ Cloud Database      │
 └─────────────────────┘
```
---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/rathiraghav25/InventAI.git
cd InventAI
```

## Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger:

```
http://127.0.0.1:8000/docs
```

## Frontend Setup

```bash
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

## Backend

Create a `.env` file inside the `backend` folder.

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## Frontend

For local development, create a `.env` file in the project root.

```env
VITE_API_URL=http://127.0.0.1:8000
```

For production (Vercel), configure:

```env
VITE_API_URL=https://inventai-m4e4.onrender.com
```

---

# 📚 API Documentation

After running the backend locally, visit:

http://127.0.0.1:8000/docs

to explore all available REST endpoints using Swagger UI.

---

# ⚠️ Known Limitations

- Currently all authenticated users share the same inventory data.
- Multi-user data isolation (owner-based records) is planned for a future release.
- Customer form validation can be improved.

---

# 🚀 Roadmap (v1.1)

- User-specific inventory (owner_id based)
- Role-based authentication
- Email invoice delivery
- Inventory forecasting
- Mobile responsiveness
- Improved form validation
- Advanced analytics

---

# 👨‍💻 Author

**Raghav Rathi**

B.Tech – Electronics & Communication Engineering  
Malaviya National Institute of Technology (MNIT), Jaipur

- GitHub: https://github.com/rathiraghav25
- LinkedIn: https://linkedin.com/in/raghavrathi752

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you like this project, consider giving it a Star!