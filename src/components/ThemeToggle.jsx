import { useExpense } from '../context/ExpenseContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { state, dispatch } = useExpense();
  const { darkMode } = state;

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
}