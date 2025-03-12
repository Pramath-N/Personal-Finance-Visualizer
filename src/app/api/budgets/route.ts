import { NextResponse } from 'next/server';
import connect from '@/app/api/db/connect';
import Budget from '@/models/budget';

// POST: Set or update a budget
export async function POST(request: Request) {
  try {
    await connect();
    const { category, budget, month } = await request.json();

    // Validate required fields
    if (!category || !budget || !month) {
      return NextResponse.json(
        { error: 'Missing required fields: category, budget, or month' },
        { status: 400 }
      );
    }

    // Update or create the budget
    const existingBudget = await Budget.findOne({ category, month });
    if (existingBudget) {
      existingBudget.budget = budget;
      await existingBudget.save();
    } else {
      const newBudget = new Budget({ category, budget, month });
      await newBudget.save();
    }

    return NextResponse.json({ message: 'Budget saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving budget:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET: Fetch budgets for a specific month
export async function GET(request: Request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');

    if (!month) {
      return NextResponse.json({ error: 'Month is required' }, { status: 400 });
    }

    const budgets = await Budget.find({ month });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}