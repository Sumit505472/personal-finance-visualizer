"use client";

import { useState, useEffect } from 'react';
import AddTransactionForm from "@/components/AddTransactionForm";
import { Button } from "@/components/ui/button"; 
import TransactionsChart from "@/components/TransactionsChart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components
import { Trash2 } from "lucide-react"; // Import Trash icon for delete button


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const data = await response.json();
        // Ensure transactions are sorted by date (newest first) when fetched
        setTransactions(data.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch transactions');
      }
    } catch (err) {
      setError('An error occurred while fetching transactions.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTransaction) => {
    // Add new transaction to the beginning and re-sort
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  // NEW FUNCTION: handle delete
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Transaction deleted successfully!');
        // Remove the deleted transaction from the local state
        setTransactions((prevTransactions) => prevTransactions.filter(tx => tx._id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete transaction: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('An error occurred while deleting the transaction.');
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary dark:text-white">Personal Finance Visualizer</h1>

      <div className="w-full max-w-md mb-8">
        <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
      </div>

      <section className="w-full max-w-md p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800 mb-8"> {/* Added mb-8 for spacing */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Transactions</h2>
        {loading && <p className="text-center">Loading transactions...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && transactions.length === 0 && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400">No transactions yet. Add one above!</p>
        )}
        {!loading && transactions.length > 0 && (
          <ul className="space-y-3">
            {transactions.map(tx => (
              <li key={tx._id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-medium text-lg">{tx.description || 'No description'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="font-bold text-xl">${tx.amount.toFixed(2)}</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    transaction.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTransaction(tx._id)}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* NEW SECTION FOR THE CHART */}
      <section className="w-full max-w-md p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-center">Transaction Overview</h2>
        <TransactionsChart transactions={transactions} />
      </section>
    </main>
  );
}
