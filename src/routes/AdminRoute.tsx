import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken')

  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

export default AdminRoute
