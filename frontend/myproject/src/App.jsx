import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import RequireAdmin from './components/admin/RequireAdmin'
import Layout from './components/Layout'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { AdminDishesProvider } from './context/AdminDishesContext'
import { CartProvider } from './context/CartContext'
import { MenuSearchProvider } from './context/MenuSearchContext'
import AdminBaoCaoPage from './pages/admin/AdminBaoCaoPage'
import AdminDonPage from './pages/admin/AdminDonPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminMonPage from './pages/admin/AdminMonPage'
import AdminSuaMonPage from './pages/admin/AdminSuaMonPage'
import AdminThemMonPage from './pages/admin/AdminThemMonPage'
import ChiTietMonPage from './pages/ChiTietMonPage'
import DonHangPage from './pages/DonHangPage'
import GioHangPage from './pages/GioHangPage'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import LichSuDonHangPage from './pages/LichSuDonHangPage'
import TaiKhoanPage from './pages/TaiKhoanPage'
import ThanhToanPage from './pages/ThanhToanPage'
import Recruit from "./pages/Recruit"
function AdminSuite() {
  return (
    <RequireAdmin>
      <AdminDishesProvider>
        <AdminLayout />
      </AdminDishesProvider>
    </RequireAdmin>
  )
}

export default function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
      <MenuSearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/recruit" element={<Recruit />} />
          <Route path="quan-ly/dang-nhap" element={<AdminLoginPage />} />
          <Route path="quan-ly" element={<AdminSuite />}>
            <Route index element={<AdminBaoCaoPage />} />
            <Route path="mon" element={<AdminMonPage />} />
            <Route path="mon/them" element={<AdminThemMonPage />} />
            <Route path="mon/sua/:id" element={<AdminSuaMonPage />} />
            <Route path="don" element={<AdminDonPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="mon/:id" element={<ChiTietMonPage />} />
            <Route path="gio-hang" element={<GioHangPage />} />
            <Route path="thanh-toan" element={<ThanhToanPage />} />
            <Route path="lich-su-don" element={<LichSuDonHangPage />} />
            <Route path="don-hang" element={<DonHangPage />} />
            <Route path="tai-khoan" element={<TaiKhoanPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </MenuSearchProvider>
    </CartProvider>
    </AdminAuthProvider>
  )
}
