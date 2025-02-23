import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

export default function TransactionList() {
  const { state, dispatch } = useExpense();
  const [filter, setFilter] = useState({
    dateRange: 'all',
    category: 'all'
  });

  const filteredTransactions = state.transactions.filter(transaction => {
    if (filter.category !== 'all' && transaction.category !== filter.category) return false;
    
    if (filter.dateRange === '7days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(transaction.date) >= sevenDaysAgo;
    }
    
    if (filter.dateRange === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(transaction.date) >= thirtyDaysAgo;
    }
    
    return true;
  });

  const allCategories = [...new Set(state.transactions.map(t => t.category))];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      
      <div className="flex gap-4 mb-4">
        <select
          value={filter.dateRange}
          onChange={(e) => setFilter(prev => ({ ...prev, dateRange: e.target.value }))}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All Categories</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded dark:border-gray-700"
          >
            <div>
              <p className="font-semibold">{transaction.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              
              <button
                onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}