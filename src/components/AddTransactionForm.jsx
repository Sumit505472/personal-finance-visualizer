"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"; // NEW: Import Select components

export default function AddTransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [amountType, setAmountType] = useState('expense'); // NEW: Default to expense
  const [category, setCategory] = useState(''); // NEW: State for category

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!amount || !date || !amountType || !category) {
      alert('Please fill in all required fields (Amount, Date, Type, Category).');
      return;
    }
    if (isNaN(parseFloat(amount))) {
      alert('Amount must be a valid number.');
      return;
    }

    const transactionData = {
      amount: parseFloat(amount),
      description,
      date: date.toISOString(), // Send as ISO string for backend
      amountType, // NEW
      category, // NEW
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Transaction added successfully!');
        onTransactionAdded(data.data); // Pass the new transaction back to the parent
        // Clear form fields
        setAmount('');
        setDescription('');
        setDate(new Date()); // Reset date to current
        setAmountType('expense'); // Reset to default
        setCategory(''); // Clear category
      } else {
        const errorData = await response.json();
        alert(`Failed to add transaction: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('An error occurred while adding the transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-50">Add New Transaction</h2>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 50.00"
          required
        />
      </div>

      {/* NEW: Amount Type Select */}
      <div>
        <Label htmlFor="amountType">Type</Label>
        <Select onValueChange={setAmountType} value={amountType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* NEW: Category Input */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Groceries, Salary, Rent"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Dinner with friends"
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">Add Transaction</Button>
    </form>
  );
}