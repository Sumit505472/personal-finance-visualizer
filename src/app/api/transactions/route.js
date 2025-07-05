import dbConnect from '@/lib/dbConnect';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();

  try {
    const transactions = await Transaction.find({}).sort({ date: -1 });
    // --- ADD THESE TWO LINES ---
    console.log('Transactions fetched from DB:', transactions);
    console.log('Returning GET response:', { success: true, data: transactions });
    // --- END ADDITIONS ---
    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    // --- ADD THIS LINE ---
    console.error('Error fetching transactions:', error);
    // --- END ADDITION ---
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    // --- ADD THIS LINE ---
    console.log('Received POST body:', body);
    // --- END ADDITION ---
    const transaction = await Transaction.create(body);
    // --- ADD THESE TWO LINES ---
    console.log('Transaction created in DB:', transaction);
    console.log('Returning POST response:', { success: true, data: transaction });
    // --- END ADDITIONS ---
    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      // --- ADD THIS LINE ---
      console.error('Validation Error during POST:', messages.join(', '));
      // --- END ADDITION ---
      return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
    }
    // --- ADD THIS LINE ---
    console.error('Generic Error during POST:', error);
    // --- END ADDITION ---
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}