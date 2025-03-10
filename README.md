# Transaction Management App

This is a full-stack application built with **Next.js** and **MongoDB** for managing transactions. It allows users to create, read, update, and delete transactions.

---

## Features

- **Create a Transaction**: Add a new transaction with amount, date, and description.
- **Read Transactions**: Fetch and display all transactions sorted by date.
- **Update a Transaction**: Edit an existing transaction.
- **Delete a Transaction**: Remove a transaction from the list.

---

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB (with Mongoose for schema modeling)
- **State Management**: React hooks (useState, useEffect)
- **Styling**: Tailwind CSS

---

## API Documentation

The backend provides the following RESTful API endpoints:


#
### 1. **Create a Transaction**
- **Method**: `POST`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
  {
    "amount": 100,
    "date": "2023-10-01",
    "description": "Groceries"
  }
- **Response**:
  ```json
  {
    "_id": "650f1c8e8b1f8e1a2c3b4d5e",
    "amount": 100,
    "date": "2023-10-01T00:00:00.000Z",
    "description": "Groceries",
    "__v": 0
  }
  
#
### 2. **Fetch All Transactions**
- **Method**: `GETT`
- **URL**: `/api/transactions`
- **Response**:
  ```json
  [
    {
      "_id": "650f1c8e8b1f8e1a2c3b4d5e",
      "amount": 100,
      "date": "2023-10-01T00:00:00.000Z",
      "description": "Groceries",
      "__v": 0
    }
  ]
 
 #
 ### 3. **Update a Transaction**
- **Method**: `PUT`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
  {
    "_id": "650f1c8e8b1f8e1a2c3b4d5e",
    "amount": 150,
    "date": "2023-10-01",
    "description": "Updated Groceries"
  }
- **Response Body**:
  ```json
  {
    "_id": "650f1c8e8b1f8e1a2c3b4d5e",
    "amount": 150,
    "date": "2023-10-01T00:00:00.000Z",
    "description": "Updated Groceries",
    "__v": 0
  }
#
### 4. **Delete a Transaction**
- **Method**: `DELETE`
- **URL**: `/api/transactions`
- **Request Body**:
  ```json
  {
    "id": "650f1c8e8b1f8e1a2c3b4d5e""
  }
- **Response Body**:
  ```json
  {
    "message": "Transaction deleted"
  }
  
---
## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)