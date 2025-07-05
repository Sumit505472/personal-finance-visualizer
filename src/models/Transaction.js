import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount.'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [100, 'Description cannot be more than 100 characters.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amountType: { // NEW FIELD: 'income' or 'expense'
    type: String,
    enum: ['income', 'expense'], // Only allows these two values
    required: [true, 'Please specify if it is income or expense.'],
  },
  category: { // NEW FIELD: e.g., 'Food', 'Rent', 'Salary'
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters.'],
    required: [true, 'Please provide a category.'],
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);