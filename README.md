# Transaction Management App

This is a full-stack application built with **Next.js** and **MongoDB** for managing transactions. It allows users to create, read, update, and delete transactions. Additionally, it provides a dashboard to visualize transaction data, including a breakdown of expenses by category and recent transactions.

---

## Features

- **Create a Transaction**: Add a new transaction with amount, date, description, and category.
- **Read Transactions**: Fetch and display all transactions sorted by date.
- **Update a Transaction**: Edit an existing transaction.
- **Delete a Transaction**: Remove a transaction from the list.
- **Dashboard**: Visualize transaction data with a pie chart showing category breakdown and a table of recent transactions.
- **Time Range Filtering**: Filter transactions by time ranges such as last 24 hours, last week, last month, or all time.

---

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Recharts (for data visualization)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (with Mongoose for schema modeling)
- **State Management**: React hooks (useState, useEffect)
- **Styling**: Tailwind CSS

---

## API Documentation

The backend provides the following RESTful API endpoints:

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
  
## Dashboard Features

- **Total Expenses**: Displays the total amount of expenses.
- **Category Breakdown**: A pie chart showing the distribution of expenses across different categories.
- **Recent Transactions**: A table displaying the most recent transactions with details such as date, description, category, and amount.
- **Time Range Filtering**: Allows users to filter transactions by time ranges (last 24 hours, last week, last month, or all time).

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)