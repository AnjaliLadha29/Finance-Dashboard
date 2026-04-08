# Finance-Dashboard
A clean, responsive, and interactive finance dashboard built using React and Redux, designed to help users track financial activity, explore transactions, and gain useful insights.

# Live Demo

# Project Overview
This project was built as part of a Frontend Developer Intern assignment to demonstrate:
UI/UX design thinking
Component-based architecture
State management using Redux
Responsive and modern frontend development

The goal was to create a simple yet intuitive financial dashboard without relying on backend services.

# Features

# Dashboard Overview
Summary cards for:
Total Balance
Income
Expenses
Clean layout with responsive system

# Transactions Management
View all transactions with:
Date
Amount
Category
Type (Income/Expense)
Features:
🔍 Search by category
🔄 Filter by type
📱 Responsive table with horizontal scroll
🔐 Role-Based UI (Simulated)
Viewer
Can only view transactions
Admin
Can add new transactions
UI dynamically changes based on selected role
➕ Add Transaction
Admin can add new transactions via a simple form
Updates global state using Redux
UI updates instantly without reload
💡 Insights Section
Displays:
Highest spending category
Derived dynamically from transaction data
💾 State Persistence
Data is stored in localStorage
Preserves:
Transactions
Selected role
Filters
📱 Fully Responsive Design
Mobile-first approach
Adaptive layouts for:
Mobile
Tablet
Desktop
Scrollable tables for better UX
🎨 UI/UX Highlights
Modern gradient background
Clean card-based layout
Smooth hover animations
Consistent spacing and typography
Accessible form controls
🛠 Tech Stack
React (Hooks)
Redux Toolkit
JavaScript (ES6+)
HTML5
CSS3 (Flexbox + Grid)
📁 Project Structure
src/
│
├── components/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Insights/
│   ├── Common/
│
├── redux/
│   ├── store.js
│   ├── transactionsSlice.js
│   ├── uiSlice.js
│
├── data/
│   └── mockData.js
│
├── App.js
├── index.js
└── styles.css
🧩 Architecture & Approach
Used a feature-based component structure for scalability
Managed global state using Redux Toolkit
Separated UI logic and business logic for maintainability
Designed reusable components (cards, tables, filters)
Implemented client-side persistence using localStorage
⚙️ Setup Instructions
# Clone the repository
git clone <your-repo-link>

# Navigate to project
cd finance-dashboard

# Install dependencies
npm install

# Run development server
npm start
🚀 Deployment

The project is deployed using Vercel for fast and reliable hosting.

🔍 Key Design Decisions
Focused on clarity over complexity
Used native elements (like select) for accessibility
Avoided unnecessary libraries to showcase core frontend skills
Implemented responsive layouts using CSS Grid instead of frameworks
🧠 What I Learned
Structuring scalable frontend applications
Managing global state effectively
Designing responsive and user-friendly interfaces
Balancing simplicity with functionality
📌 Future Enhancements
Dark mode support
Advanced charts and analytics
Edit/Delete transactions
API integration
Export data (CSV/JSON)
🙌 Conclusion

This project reflects my approach to building clean, scalable, and user-friendly frontend applications using core web technologies.
