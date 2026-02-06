
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useAuth from "./auth/useAuth.js";
import LoginSuccess from './pages/LoginSuccess.jsx'
import { SpinnerButton } from './components/SpinnerButton';


function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>
      <SpinnerButton/>
    </div>;
  }

  return (
    <Routes>
      {/* Root entry point */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Public route */}
      <Route path="/login" element={<Login />} />

      <Route path="/login-success" element={<LoginSuccess />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App
