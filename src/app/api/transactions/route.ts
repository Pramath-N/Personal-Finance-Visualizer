import { NextResponse } from 'next/server';
import connect from '@/app/api/db/connect';
import Transaction from '@/models/transactions';

// POST: Create a new transaction
export async function POST(request: Request) {
  try {
    await connect();
    const { amount, date, description, category } = await request.json();

    // Validate required fields
    if (!amount || !date || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, date, description, or category' },
        { status: 400 }
      );
    }

    // Create and save the transaction
    const transaction = new Transaction({ amount, date, description, category });
    await transaction.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: An unknown error occurred' }, { status: 500 });
  }
}

// GET: Fetch all transactions
export async function GET() {
  try {
    console.log('Fetching transactions...');
    await connect();

    // Fetch transactions sorted by date (newest first)
    const transactions = await Transaction.find().sort({ date: -1 });
    console.log('Transactions fetched successfully:', transactions.length);

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: An unknown error occurred' }, { status: 500 });
  }
}

// PUT: Update a transaction
export async function PUT(request: Request) {
  try {
    await connect();
    const { _id, amount, date, description, category } = await request.json();

    // Validate required fields
    if (!_id || !amount || !date || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: _id, amount, date, description, or category' },
        { status: 400 }
      );
    }

    // Update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      { amount, date, description, category },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: An unknown error occurred' }, { status: 500 });
  }
}

// DELETE: Delete a transaction
export async function DELETE(request: Request) {
  try {
    await connect();
    const { id } = await request.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: An unknown error occurred' }, { status: 500 });
  }
}