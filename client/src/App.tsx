import { useState, useEffect } from 'react';
import './App.css';
import { User } from './types';
import { getUser, getAllUsers } from './services/api';
import OwnerDashboard from './components/OwnerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Header from './components/Header';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers();
      setAllUsers(users);
      
      // Select first user by default
      if (users.length > 0) {
        setCurrentUser(users[0]);
      }
    } catch (err) {
      setError('Failed to load users. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = async (userId: number) => {
    try {
      const user = await getUser(userId);
      setCurrentUser(user);
    } catch (err) {
      console.error('Failed to load user:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!currentUser) {
    return <div className="error">No users found in database</div>;
  }

  return (
    <div className="App">
      <Header user={currentUser} />
      
      <div className="container">
        <div className="user-selector">
          <h2>Select User</h2>
          <select 
            value={currentUser.user_id} 
            onChange={(e) => handleUserChange(Number(e.target.value))}
          >
            {allUsers.map(user => (
              <option key={user.user_id} value={user.user_id}>
                {user.user_name} - {user.role}
              </option>
            ))}
          </select>
        </div>

        {currentUser.role === 'OWNER' ? (
          <OwnerDashboard ownerId={currentUser.user_id} />
        ) : (
          <CustomerDashboard customerId={currentUser.user_id} />
        )}
      </div>
    </div>
  );
}

export default App;
