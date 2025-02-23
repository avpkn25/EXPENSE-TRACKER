import { useExpense } from '../context/ExpenseContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const { state, dispatch } = useExpense();
  const { transactions, darkMode } = state;

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold">Expense Tracker</h1>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl mb-2">Your Balance</h2>
        <p className={`text-4xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${totalBalance.toFixed(2)}
        </p>
      </div>
    </header>
  );
}