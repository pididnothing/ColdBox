# Requirements

## Summary

A cold storage management dashboard application that provides role-based views for Owners and Customers. Owners can monitor storage units, view bills, and access financial summaries. Customers can view their stored products, product details, and bills. The app automatically detects user role and displays the appropriate dashboard with relevant data from the connected PostgreSQL database.

## Use cases

- **Dashboard Shell & Navigation**
  1. User opens the application
  2. System identifies user role (Owner or Customer) from the database
  3. System displays role-appropriate dashboard with navigation
  4. User sees personalized view based on their role

- **Owner Dashboard**
  1. Owner logs into the application
  2. Owner sees overview of all storage units with capacity, temperature, humidity, and current load
  3. Owner views list of bills with customer information and amounts
  4. Owner sees financial summary with total revenue, number of customers, and unit utilization metrics

- **Customer Dashboard**
  1. Customer logs into the application
  2. Customer sees list of their stored products with quantities
  3. Customer views product details including storage location
  4. Customer accesses their bills history with dates and amounts

## Plan

### Dashboard Shell & Navigation

1. [x] Create main app layout with role-based routing logic
2. [x] Add query to fetch current user details from users table based on authenticated user
3. [x] Implement conditional rendering to show Owner or Customer dashboard based on user role
4. [x] Add navigation header with user info and dashboard title

### Owner Dashboard

1. [] Create storage units overview section with query to fetch all storage units from storage_units table
2. [] Display storage units in a grid/table showing unit_id, capacity, temperature, humidity, and current_load
3. [] Add visual indicators for unit utilization (current_load vs capacity)
4. [] Create bills section with query to fetch all bills joined with customer information
5. [] Display bills table with customer name, bill date, and total amount
6. [] Create financial summary section with aggregated metrics
7. [] Calculate and display total revenue (sum of all bills), active customers count, and average unit utilization

### Customer Dashboard

1. [] Create products section with query to fetch products for the logged-in customer
2. [] Display products table showing product_name and quantity
3. [] Add product details view with storage unit information by joining products with bill_items and storage_units
4. [] Create bills section with query to fetch customer's bills from bills table
5. [] Display bills table with bill_date and total_amount in descending order
6. [] Add summary card showing total number of products and total bills paid

## Database Summary

The application uses a managed PostgreSQL database hosted on Aiven. The database is used as the primary persistent storage layer for application data, supporting structured queries, transactional integrity, and scalable cloud-based access.

### Key Details

1. Database Engine: PostgreSQL

2. Hosting Provider: Aiven (Managed Cloud Database Service)

3. Default Database: defaultdb

4. Default Admin User: avnadmin

5. Connection Type: Remote cloud connection

6. Security: SSL-encrypted connections required

### Security and Connectivity

The database enforces strict security controls:

All external connections must use SSL encryption.

Authentication is handled using username and password credentials.

### Table Summary

1. users
   📌 Purpose

Stores all system users under one table — both storage owners and customers.

🧱 Key Columns
Column Type Description
user_id SERIAL (PK) Unique user identifier
user_name VARCHAR Name of person/company
phone VARCHAR Contact number
email VARCHAR (Unique) Email address
role VARCHAR Either OWNER or CUSTOMER
created_at TIMESTAMP Record creation time
🔗 Relationships

Referenced by storage_units (owner_id)

Referenced by products (customer_id)

Referenced by bills (customer_id, owner_id)

2. storage_units
   📌 Purpose

Stores details of each cold storage unit.

🧱 Key Columns
Column Type Description
unit_id SERIAL (PK) Unique storage unit ID
owner_id INT (FK → users) Owner of the unit
capacity DECIMAL Maximum storage capacity
temperature DECIMAL Operating temperature
humidity DECIMAL Humidity level
current_load DECIMAL Current used capacity
🔗 Relationships

Many units → One owner

One unit → Many stored products (via bill_items)

3. products
   📌 Purpose

Stores product information belonging to customers.

🧱 Key Columns
Column Type Description
product_id SERIAL (PK) Unique product ID
customer_id INT (FK → users) Product owner (customer)
product_name VARCHAR Product name
quantity DECIMAL Total product quantity
🔗 Relationships

Many products → One customer

One product → Many storage transactions (via bill_items)

4. bills
   📌 Purpose

Represents storage transactions between customer and storage owner.

🧱 Key Columns
Column Type Description
bill_id SERIAL (PK) Unique bill ID
customer_id INT (FK → users) Customer storing goods
owner_id INT (FK → users) Storage unit owner
bill_date TIMESTAMP Transaction date
total_amount DECIMAL Total billing amount
🔗 Relationships

One bill → Many bill items

Links customer + owner

5. bill_items
   📌 Purpose

Core relationship table — tracks exactly what is stored where.

🧱 Key Columns
Column Type Description
bill_item_id SERIAL (PK) Unique entry ID
bill_id INT (FK → bills) Related bill
product_id INT (FK → products) Stored product
unit_id INT (FK → storage_units) Storage unit used
quantity_stored DECIMAL Amount stored

### 🔗 Relationships

Many items → One bill

Many items → One product

Many items → One storage unit
