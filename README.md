# ColdBox - Cold Storage Management Dashboard

A full-stack TypeScript application for managing cold storage facilities with role-based dashboards for Owners and Customers.

## 🏗️ Tech Stack

**Frontend:**

- React 18
- TypeScript
- Vite
- Axios

**Backend:**

- Node.js
- Express
- TypeScript
- PostgreSQL (Aiven)

## 📋 Features

### Owner Dashboard

- View all storage units with capacity, temperature, humidity, and current load
- Monitor unit utilization with visual progress bars
- Access all bills with customer information
- View financial summary (total revenue, active customers, average utilization)

### Customer Dashboard

- View all stored products with quantities
- Access detailed product information including storage location and conditions
- View bills history
- See summary statistics

## 📁 Project Structure

```
ColdBox/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.tsx
│   │   │   ├── OwnerDashboard.tsx
│   │   │   └── CustomerDashboard.tsx
│   │   ├── services/      # API service layer
│   │   │   └── api.ts
│   │   ├── types/         # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx        # Main app component
│   │   ├── App.css        # Styles
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                # Express backend
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   │   └── database.ts
│   │   ├── routes/       # API routes
│   │   │   ├── user.ts
│   │   │   ├── owner.ts
│   │   │   └── customer.ts
│   │   ├── types/        # TypeScript types
│   │   │   └── index.ts
│   │   └── index.ts      # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── package.json          # Root package.json
```

## 🔌 API Endpoints

### User Routes

- `GET /api/user/:userId` - Get user by ID
- `GET /api/user` - Get all users

### Owner Routes

- `GET /api/owner/:ownerId/storage-units` - Get all storage units
- `GET /api/owner/:ownerId/bills` - Get all bills with customer info
- `GET /api/owner/:ownerId/financial-summary` - Get financial summary

### Customer Routes

- `GET /api/customer/:customerId/products` - Get all products
- `GET /api/customer/:customerId/products/:productId/details` - Get product storage details
- `GET /api/customer/:customerId/bills` - Get all bills
- `GET /api/customer/:customerId/summary` - Get customer summary

## 🎨 User Interface

- Clean, modern design with a professional color scheme
- Responsive layout that works on different screen sizes
- Role-based views that automatically adapt based on user role
- Interactive elements (expandable product details)
- Visual indicators for storage unit utilization

