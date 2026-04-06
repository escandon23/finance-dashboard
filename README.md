# Finance Dashboard

A clean and interactive finance dashboard built to help users track, explore, and understand their financial activity.

This project was developed as part of a Frontend Developer Internship assignment.

---

## 🚀 Live Demo

[View Live Demo](https://finance-dashboard-7a6t.vercel.app/)

## 📁 GitHub Repository

[GitHub Repo](https://github.com/escandon23/finance-dashboard.git)

## 📋 Overview

This dashboard allows users to:

- View financial summaries (balance, income, expenses)
- Explore and manage transactions
- Analyze spending patterns through charts
- Gain insights from financial data
- Experience role-based UI behavior (Admin vs Viewer)

The focus of this project is on **UI design, component structure, and frontend state management**, not backend integration.

---

## 🧠 Approach

I approached this project by focusing on:

- **Clarity over complexity**
- **Reusable components**
- **Simple but effective state management**
- **Good user experience across devices**

The application uses mock data and simulates real-world dashboard behavior while keeping the implementation lightweight.

---

## 🏗️ Features

### 📊 Dashboard Overview
- Summary cards:
  - Total Balance
  - Total Income
  - Total Expenses
- Time-based visualization (Balance trend)
- Category-based visualization (Spending breakdown)

### 📄 Transactions
- View all transactions with:
  - Date
  - Amount
  - Category
  - Type (Income/Expense)
- Features:
  - Search functionality
  - Filtering (by type/category)
  - Sorting
  - Add, edit, delete (Admin only)
  - Export to CSV

### 🔐 Role-Based UI (Simulated)
- **Viewer**
  - Can only view transactions
- **Admin**
  - Can add, edit, and delete transactions

Role switching is handled via a simple UI toggle.

### 📈 Insights
- Largest expense
- Highest spending category
- Monthly comparison
- Basic financial observations based on data

### 🌙 Additional Features
- Dark/Light theme toggle
- Responsive design
- Local storage persistence
- Smooth animations with Framer Motion

---

## 🧩 State Management

State is managed using:

- React Context API
- Handles:
  - Transactions data
  - Filters (search, type, sort)
  - User role
  - Theme preference

---

## 🎨 UI/UX Highlights

- Responsive design (mobile + desktop)
- Clean and minimal layout
- Empty state handling
- Smooth interactions and animations

---

## ⚙️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **MUI X Charts** - Chart components
- **Lucide React** - Icons
- **React Context** - State management

---


## 🛠️ Setup Instructions

1. **Clone the repository:**
   git clone https://github.com/escandon23/finance-dashboard.git
   

2. **Navigate into the project:**
   cd finance-dashboard

3. **Install dependencies:**
   npm install

4. **Run the development server:**
   npm run dev

5. **Open your browser** and visit `http://localhost:5173`

---

## 📸 Screenshots

### Dashboard Overview
![Dashboard](./screenshots/dashboard.png)

### Transactions Management
![Transactions](./screenshots/transactions.png)

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)

---

## Acknowledgements

Thanks to the Zorvyn FinTech team for this opportunity.

---

