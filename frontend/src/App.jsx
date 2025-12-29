import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';

// Placeholder components - we will build these properly later
const Dashboard = () => <div className="p-10 text-2xl font-bold">Dashboard (Protected)</div>;
const Login = () => <div className="p-10 text-2xl font-bold">Login Page</div>;

function App() {
  // Mock auth state for now
  const isAuthenticated = false; 

  return (

      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        
        {/* Auth Page */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>

  );
}

export default App;