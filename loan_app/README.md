const fs = require('fs');

// Content for README.md
const readmeContent = `
# Loan Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Introduction
The Loan Management System is a web application designed to facilitate loan creation, approval, and repayment management. The application supports both **Admin** and **Customer** roles:
- **Admin:** Can approve pending loans.
- **Customer:** Can view their loans and manage repayments.

---

## Features
- **User Authentication:**
  - Secure registration and login with hashed passwords (using bcrypt).
  - JWT-based authentication and role-based access control.
- **Loan Management:**
  - Customers can create loans with scheduled repayments.
  - Admins can approve pending loans.
  - Loans transition from \`PENDING\` → \`APPROVED\` → \`PAID\`.
- **Repayment Management:**
  - Customers can make repayments.
  - Automatic status updates for scheduled repayments (\`PENDING\` → \`PAID\`).
- **Responsive UI:**
  - Built with React.js and Tailwind CSS for a clean and modern design.

---

## Technologies Used
### Frontend
- **React.js**: v18.2.0
- **React Router**: v6.16.0
- **Axios**: v1.5.0
- **Tailwind CSS**: v3.3.2

### Backend
- **Node.js**: v18.17.1
- **Express.js**: v4.18.2
- **MongoDB**: v5.0
- **Mongoose**: v7.3.4
- **JSON Web Token (JWT)**: v9.0.1
- **Bcrypt.js**: v5.1.0

---

## Installation
### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the Repository:**
   \`\`\`bash
   git clone https://github.com/your-username/loan-management-system.git
   cd loan-management-system
   \`\`\`

2. **Install Dependencies:**
   - **Backend:**
     \`\`\`bash
     cd backend
     npm install
     \`\`\`
   - **Frontend:**
     \`\`\`bash
     cd frontend
     npm install
     \`\`\`

3. **Setup Environment Variables:**
   - Create a \`.env\` file in the \`backend\` directory with the following variables:
     \`\`\`
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     PORT=5000
     \`\`\`

4. **Run the Application:**
   - **Backend:**
     \`\`\`bash
     cd Server
     npm start
     \`\`\`
   - **Frontend:**
     \`\`\`bash
     cd Client
     cd loan_app
     npm start
     \`\`\`

5. **Access the Application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## API Endpoints
### Authentication
- **POST** \`/api/register\`: Register a user.
- **POST** \`/api/login\`: Authenticate and get a token.

### Loans
- **POST** \`/api/loans\`: Create a new loan (Customer only).
- **GET** \`/api/loans\`: Get all loans (Admin only).
- **PATCH** \`/api/loans/:id/approve\`: Approve a loan (Admin only).

### Repayments
- **POST** \`/api/loans/:id/repayments\`: Make a repayment (Customer only).

---

## Environment Variables
| Variable       | Description                       |
|----------------|-----------------------------------|
| \`MONGO_URI\`    | MongoDB connection URI            |
| \`JWT_SECRET\`   | Secret key for JWT authentication |
| \`PORT\`         | Port for the backend server       |

---

## Usage
### Admin
1. Register as an admin during signup.
2. Log in to access the admin dashboard.
3. Approve pending loans.

### Customer
1. Register as a customer during signup.
2. Log in to view your loans.
3. Make repayments as per the schedule.

---

## Folder Structure
\`\`\`
loan-management-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │
│   ├── public/
│
├── README.md
\`\`\`

---

## License
This project is licensed under the MIT License.

---

`;

// Write the README.md file
fs.writeFile('README.md', readmeContent, (err) => {
  if (err) {
    console.error('Error writing README.md:', err);
  } else {
    console.log('README.md file created successfully.');
  }
});
