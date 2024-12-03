import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/home/HomePage';
import { InventoryMovementsTab } from './components/inventory/InventoryMovementsTab';
import { SalesTab } from './components/SalesTab';
import { ReportsTab } from './components/ReportsTab';
import { LoadingAnimation } from './components/LoadingAnimation';
import { Toast } from './components/Toast';
import { LoginPage } from './components/auth/LoginPage';
import { ClientView } from './components/ClientView';
import { SongRequestPage } from './components/client/SongRequestPage';
import { UserManagement } from './components/admin/UserManagement';
import { useStore } from './store/useStore';
import { useAuthStore } from './store/authStore';
import { initializeAdminUser } from './scripts/initAdmin';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { loadProducts, loadSales, loadMovements, products } = useStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const initializeApp = async () => {
      await initializeAdminUser(); // Initialize admin user
      await loadProducts();
      if (user?.role !== 'client') {
        await loadSales();
        await loadMovements();
      }
      setTimeout(() => setIsLoading(false), 2000);
    };
    initializeApp();
  }, [loadProducts, loadSales, loadMovements, user?.role]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    if (user.role === 'client') {
      switch (activeTab) {
        case 'home':
          return <HomePage />;
        case 'products':
          return <ClientView products={products} />;
        case 'songs':
          return <SongRequestPage />;
        default:
          return <HomePage />;
      }
    }

    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'inventory':
        return <InventoryMovementsTab canModify={['admin', 'employee'].includes(user.role)} />;
      case 'sales':
        return <SalesTab />;
      case 'reports':
        return <ReportsTab canModify={user.role === 'admin'} />;
      case 'users':
        return user.role === 'admin' ? <UserManagement /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        userRole={user.role}
      />
      <main className="py-6">
        {renderContent()}
      </main>
      <Toast />
    </div>
  );
}

export default App;