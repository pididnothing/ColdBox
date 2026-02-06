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

## 🚀 Deployment on Render

This application is configured to deploy as a single web service on Render, serving both the backend API and frontend static files.

### Prerequisites

1. A Render account (https://render.com)
2. PostgreSQL database (Aiven or Render's managed PostgreSQL)
3. GitHub/GitLab repository with your code

### Deployment Steps

1. **Push your code to GitHub/GitLab**

2. **Create a new Web Service on Render:**
   - Connect your repository
   - Use the following settings:
     - **Build Command:** `npm run build`
     - **Start Command:** `npm start`
     - **Environment:** `Node`

3. **Set Environment Variables:**
   Add these environment variables in Render dashboard:

   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=defaultdb
   DB_USER=avnadmin
   DB_PASSWORD=your-password
   ```

4. **Deploy:**
   - Render will automatically build and deploy your application
   - The build process will:
     - Install all dependencies
     - Build the React frontend
     - Build the TypeScript backend
     - Start the server which serves both API and frontend

5. **Access your app:**
   - Your app will be available at `https://your-app-name.onrender.com`
   - The frontend will be served from the root path
   - API endpoints will be available at `/api/*`

### Alternative: Using render.yaml

You can also use the included `render.yaml` file for automated deployment:

1. Push the `render.yaml` file to your repository
2. In Render dashboard, select "New > Blueprint"
3. Connect your repository
4. Render will automatically detect and use the configuration

### How It Works

- In production (`NODE_ENV=production`), the Express server serves the React build files as static assets
- All routes starting with `/api` are handled by the backend API
- All other routes serve the React app (for client-side routing)
- The build process compiles both frontend and backend before deployment

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
