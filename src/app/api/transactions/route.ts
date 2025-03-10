import { NextResponse } from 'next/server';
import connect from '@/app/api/db/connect';
import Transaction from '@/models/transactions';

// POST: Create a new transaction
export async function POST(request: Request) {
  try {
    await connect();
    const { amount, date, description } = await request.json();

    if (!amount || !date || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transaction = new Transaction({ amount, date, description });
    await transaction.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error?.message }, { status: 500 });
  }
}

// GET: Fetch all transactions
export async function GET() {
  try {
    await connect();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error?.message }, { status: 500 });
  }
}

// PUT: Update a transaction
export async function PUT(request: Request) {
  try {
    await connect();
    const { _id, amount, date, description } = await request.json();

    if (!_id || !amount || !date || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      { amount, date, description },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error?.message }, { status: 500 });
  }
}

// DELETE: Delete a transaction
export async function DELETE(request: Request) {
  try {
    await connect();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error?.message }, { status: 500 });
  }
}