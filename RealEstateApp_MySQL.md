# 🏡 Real Estate Web Application with MySQL

## 🎯 Objective
Build a functional Real Estate web application. This project allows users to browse, search, and manage real estate properties.

## 🎨 Reference Design
Align UI closely with the UIMIX design provided via Figma. Maintain the aesthetics and layout while implementing all required functionality.

---

## 🛠️ Tools & Technologies

### Frontend
- React.js
- Redux (optional)
- Bootstrap
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MySQL with Sequelize ORM

### Authentication & Utilities
- bcryptjs
- JSONWebToken (JWT)
- dotenv
- multer (for image upload)

### Deployment (Optional)
- Netlify (Frontend)
- Render (Backend)

---

## 🌟 Project Features

### 1. Homepage
- Hero section with a search bar (filters: location, property type, price range)
- "Featured Properties" section
- "Recently Added Properties" section

### 2. Property Listing Page
- Grid layout
- Filters: location, price range, property type
- Each property card includes image, price, title, and "View Details" button

### 3. Property Details Page
- Display images, description, price, location
- Include a contact form

### 4. User Authentication
- **Register Page**: Email, Password, Role (user/admin)
- **Login Page**: Session maintained using JWT
- **Role-Based Access**: Admins can access CRUD routes

### 5. Admin Dashboard
- Add, Edit, Delete properties
- Overview of total properties and user interactions

### 6. Responsive Design
- Works on mobile, tablet, and desktop

---

## 🔨 Frontend Task Breakdown

### Components:
- Navbar
- Footer
- SearchBar
- PropertyCard
- LoginForm
- RegisterForm
- AdminForm

### Pages:
- HomePage.js
- ListingPage.js
- PropertyDetailsPage.js
- LoginPage.js
- RegisterPage.js
- AdminDashboard.js

### Implementation:
1. Set up React with routing using React Router DOM
2. Use Axios to fetch backend data
3. Apply styles using Bootstrap or CSS modules

---

## 🔧 Backend Task Breakdown

### 1. Initialize Backend:
```bash
npm init -y
npm install express sequelize mysql2 dotenv bcryptjs jsonwebtoken multer cors
```

### 2. Folder Structure:
```
/server
├── app.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Property.js
├── routes/
│   ├── auth.js
│   └── property.js
├── controllers/
├── middleware/
│   └── auth.js
└── .env
```

### 3. `.env` Sample:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=real_estate_db
JWT_SECRET=your_jwt_secret
```

### 5. Routes:

#### /api/auth/
- POST /register
- POST /login

#### /api/properties/
- GET /
- POST /
- PUT /:id
- DELETE /:id

### 6. Middleware: `auth.js`
- Protect admin routes using JWT

---

## ✅ Deliverables

1. Fully functional Real Estate web app using MySQL
2. GitHub repo with source code
3. Deployment links (if any)
4. Project documentation (this `.md` file)

---


