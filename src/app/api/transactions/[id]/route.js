import dbConnect from '@/lib/dbConnect';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params; // Extract the dynamic 'id' from the URL

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json({ success: false, message: 'Transaction not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 }); // 200 OK for successful deletion
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

