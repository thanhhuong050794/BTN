import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, Receipt, LogOut } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import styles from './AdminLayout.module.css'

const navCls = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.navOn}` : styles.navLink

export default function AdminLayout() {
  const { logout } = useAdminAuth()
  const { pathname } = useLocation()

  let topTitle = 'Thống kê & báo cáo'
  if (pathname.includes('/mon')) topTitle = 'Quản lý món'
  else if (pathname.includes('/don')) topTitle = 'Quản lý đơn'

  return (
    <div class={styles.root}>
      <aside class={styles.aside} aria-label="Menu quản trị">
        <div class={styles.brand}>
          <p class={styles.brandTitle}>NEUFood Admin</p>
          <p class={styles.brandSub}>Campus dining</p>
        </div>
        <nav class={styles.nav}>
          <NavLink to="/quan-ly" className={navCls} end>
            <LayoutDashboard size={20} strokeWidth={2} aria-hidden />
            Tổng quan
          </NavLink>
          <NavLink to="/quan-ly/mon" className={navCls}>
            <UtensilsCrossed size={20} strokeWidth={2} aria-hidden />
            Thực đơn
          </NavLink>
          <NavLink to="/quan-ly/don" className={navCls}>
            <Receipt size={20} strokeWidth={2} aria-hidden />
            Đơn hàng
          </NavLink>
        </nav>
        <div class={styles.navFoot}>
          <button type="button" class={styles.out} onClick={() => logout()}>
            <LogOut size={20} strokeWidth={2} aria-hidden />
            Đăng xuất
          </button>
        </div>
      </aside>
      <div class={styles.main}>
        <header class={styles.top}>
          <h1 class={styles.topTitle}>{topTitle}</h1>
          <div class={styles.topTools}>
            <span class={`material-symbols-outlined ${styles.ico}`} aria-hidden>
              notifications
            </span>
            <span class={`material-symbols-outlined ${styles.ico}`} aria-hidden>
              settings
            </span>
          </div>
        </header>
        <div class={styles.body}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
