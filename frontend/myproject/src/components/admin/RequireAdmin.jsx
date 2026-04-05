import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function RequireAdmin({ children }) {
  const { isAdmin } = useAdminAuth()
  const { pathname } = useLocation()

  if (!isAdmin) {
    return <Navigate to="/quan-ly/dang-nhap" replace state={{ from: pathname }} />
  }

  return children
}
