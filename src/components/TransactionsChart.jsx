"use client"; // This is a client component as it uses Recharts and client-side rendering

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

export default function TransactionsChart({ transactions }) {
  // Prepare data for the chart: group transactions by date and sum amounts
  // This is a simple aggregation. For more complex needs, consider a backend aggregation.
  const chartData = transactions.reduce((acc, transaction) => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd'); // Format date consistently
    const existingEntry = acc.find(item => item.date === date);

    if (existingEntry) {
      existingEntry.amount += transaction.amount;
    } else {
      acc.push({ date, amount: transaction.amount });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date for chronological display

  if (transactions.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Add transactions to see charts.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}