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

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Aiven account recommended)

### Installation

1. **Clone the repository**

   ```bash
   cd d:\Projects\ColdBox
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

### Configuration

#### Server Configuration

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Create a `.env` file from the example:

   ```bash
   copy .env.example .env
   ```

3. Edit `.env` with your PostgreSQL credentials:

   ```env
   PORT=5000

   DB_HOST=your-aiven-host.aivencloud.com
   DB_PORT=5432
   DB_NAME=defaultdb
   DB_USER=avnadmin
   DB_PASSWORD=your-password-here
   ```

#### Client Configuration (Optional)

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Create a `.env` file if you need custom API URL:

   ```bash
   copy .env.example .env
   ```

   By default, the client uses Vite's proxy to connect to the server at `/api`.

### Database Setup

Make sure your PostgreSQL database has the following tables:

- `users`
- `storage_units`
- `products`
- `bills`
- `bill_items`

Refer to the `initial.md` file for the complete database schema.

## 🎮 Running the Application

### Development Mode

**Option 1: Run both server and client concurrently (from root)**

```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Server:

```bash
npm run dev:server
```

Terminal 2 - Client:

```bash
npm run dev:client
```

The application will be available at:

- **Client:** http://localhost:3000
- **Server:** http://localhost:5000

### Production Build

```bash
npm run build
```

This will build both the server and client applications.

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

## 🔒 Security Notes

- The application uses SSL for PostgreSQL connections
- Currently uses a simple user selection for demo purposes
- In production, implement proper authentication (JWT, OAuth, etc.)
- Add authorization middleware to protect routes
- Validate and sanitize all user inputs

## 🛠️ Development

### Adding New Features

1. **Backend:** Add routes in `server/src/routes/`
2. **Frontend:** Add components in `client/src/components/`
3. **Types:** Update TypeScript interfaces in both `server/src/types/` and `client/src/types/`

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use async/await for asynchronous operations
- Handle errors gracefully with try-catch blocks

## 📝 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
