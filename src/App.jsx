import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import { useExpense } from './context/ExpenseContext';

function AppContent() {
  const { state } = useExpense();
  
  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Dashboard />
        <div className="grid md:grid-cols-2 gap-8">
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}