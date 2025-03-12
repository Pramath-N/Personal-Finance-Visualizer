# Transaction Management App

This is a full-stack application built with Next.js and MongoDB for managing transactions. It allows users to create, read, update, and delete transactions. Additionally, it provides a dashboard to visualize transaction data, including a breakdown of expenses by category, recent transactions, and budget management features.

---

# Features of the Expense Tracker

## Transaction Management
- **Create a Transaction**: Add a new transaction with amount, date, description, and category.
- **Read Transactions**: Fetch and display all transactions sorted by date.
- **Update a Transaction**: Edit an existing transaction.
- **Delete a Transaction**: Remove a transaction from the list.

## Dashboard
- **Visualize transaction data** with a pie chart showing category breakdown.
- **Table of recent transactions** for a quick overview.

## Time Range Filtering
- Filter transactions by time ranges such as:
  - Last 24 hours
  - Last week
  - Last month
  - All time

## Budget Management
- **Set Monthly Budgets**: Define monthly budgets for each category.
- **Budget vs Actual Comparison**: Compare actual spending against the budget using a bar chart.
- **Spending Insights**:
  - Percentage of budget used
  - Remaining budget
  - Over/under budget status

---

# Technologies Used

## Frontend
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: UI library for building interactive components.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Recharts**: Library for data visualization (used for charts).

## Backend
- **Next.js API Routes**: Server-side API handling within Next.js.

## Database
- **MongoDB**: NoSQL database for storing transactions.
- **Mongoose**: ODM (Object Data Modeling) library for schema modeling.

## State Management
- **React hooks**: Using `useState` and `useEffect` for managing component state.

## Styling
- **Tailwind CSS**: For responsive and modern UI design.

---
# API Documentation

### 1. **Create a Transaction**
- **Method**: `POST`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
    {
      "amount": 100,
      "date": "2023-10-01",
      "description": "Groceries",
      "category": "Food"
    }
- **Response**:
  ```json
    {
        "_id": "650f1c8e8b1f8e1a2c3b4d5e",
        "amount": 100,
        "date": "2023-10-01T00:00:00.000Z",
        "description": "Groceries",
        "category": "Food",
        "__v": 0
    }
  
  
 ### 2. **Fetch All Transactions**
- **Method**: `GET`
- **URL**: `/api/transactions`
- **Response**:
  ```json
    [
      {
        "_id": "650f1c8e8b1f8e1a2c3b4d5e",
        "amount": 100,
        "date": "2023-10-01T00:00:00.000Z",
        "description": "Groceries",
        "category": "Food",
        "__v": 0
      }
    ]
  
  
### 3. **Update a Transaction**
- **Method**: `PUT`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
      {
        "_id": "650f1c8e8b1f8e1a2c3b4d5e",
        "amount": 150,
        "date": "2023-10-01",
        "description": "Updated Groceries",
        "category": "Food"
      }
- **Response**:
  ```json
    {
      "_id": "650f1c8e8b1f8e1a2c3b4d5e",
      "amount": 150,
      "date": "2023-10-01T00:00:00.000Z",
      "description": "Updated Groceries",
      "category": "Food",
      "__v": 0
    } 
  
  
### 4. **Delete a Transaction**
- **Method**: `DELETE`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
    {
      "id": "650f1c8e8b1f8e1a2c3b4d5e"
    }
- **Response**:
  ```json
    {
      "message": "Transaction deleted"
    }
  
  
### 5. **Set or Update a Budget**
- **Method**: `POST`
- **URL**: `/api/budgets`
- **Request Body**:
  ```json
    {
      "category": "Food",
      "budget": 500,
      "month": "2023-10"
    }
- **Response**:
  ```json
  {
    "message": "Budget saved successfully"
  }
  
### 6. **Fetch Budgets for a Specific Month**
- **Method**: `GET`
- **URL**: `/api/budgets?month=2023-10`
- **Response**:
  ```json
    [
      {
        "_id": "650f1c8e8b1f8e1a2c3b4d5e",
        "category": "Food",
        "budget": 500,
        "month": "2023-10",
        "__v": 0
      }
    ]

# Dashboard Features

## Total Expenses
- Displays the total amount of expenses.

## Category Breakdown
- A pie chart showing the distribution of expenses across different categories.

## Recent Transactions
- A table displaying the most recent transactions with details such as:
  - Date  
  - Description  
  - Category  
  - Amount  

## Time Range Filtering
- Allows users to filter transactions by time ranges:
  - Last 24 hours  
  - Last week  
  - Last month  
  - All time  

## Budget Management
- **Set Monthly Budgets**: Define monthly budgets for each category.  
- **Budget vs Actual Comparison**: Compare actual spending against the budget using a bar chart.  
- **Spending Insights**:
  - Percentage of budget used  
  - Remaining budget  
  - Over/under budget status  

# Budget Page Features

## Set Monthly Budgets
- Users can set or update monthly budgets for each category.

## Budget vs Actual Comparison Chart
- A bar chart comparing the budgeted amount vs actual spending for each category.

## Spending Insights
- **Progress Bars**: Visual representation of how much of the budget has been spent.  
- **Remaining Budget**: Display the remaining budget for each category.  
- **Status Icons**:  
  - ✅ for under budget  
  - ❌ for over budget  
- **Color Coding**:  
  - Green for under budget  
  - Red for over budget  

# Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)  
- [Mongoose Documentation](https://mongoosejs.com/docs/)  
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
- [Recharts Documentation](https://recharts.org/en-US/)  

  
 