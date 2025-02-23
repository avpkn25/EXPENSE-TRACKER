import { useExpense } from '../context/ExpenseContext';

export default function Header() {
  const { state } = useExpense();
  const { transactions } = state;

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);
  

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-5xl font-bold">Expense Tracker</h1>
        <nav className="flex items-center gap-6">
          <a 
            href="https://avpkn.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            About Me
          </a>
          <a 
            href="mailto:praveenkumarnaidu88@gmail.com?%20subject=Contact%20to%20Praveen!"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            Contact Me
          </a>
        </nav>
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