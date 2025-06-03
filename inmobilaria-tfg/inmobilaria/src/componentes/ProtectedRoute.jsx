import { Navigate } from 'react-router-dom';
import { authService } from '../servicios/authService';

export const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}; 