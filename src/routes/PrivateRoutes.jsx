import { useAuth } from "../context/AuthContext"

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute