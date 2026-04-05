import { Link, NavLink } from 'react-router-dom'
import { Home, UtensilsCrossed, ShoppingCart, User, Search, Package, Shield } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import styles from './Navbar.module.css'

const linkClass = ({ isActive }) =>
  isActive ? `${styles.topnavLink} ${styles.topnavLinkOn}` : styles.topnavLink

export default function Navbar({ cartCount = 2 }) {
  const { isAdmin } = useAdminAuth()

  return (
    <header class={styles.topnav}>
      <div class={styles.topnavInner}>
        <div class={styles.topnavLeft}>
        <Link to="/" className={styles.topnavLogo}>
          <img 
            src="/neu-food.png" 
            alt="NEUFood" 
            className={styles.logoImg}
          />
          <span>NEUFood</span>
        </Link> 
          <nav class={styles.topnavMenu}>
            <NavLink className={linkClass} end to="/">
              <Home className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Trang chủ
            </NavLink>
            <NavLink className={linkClass} to="/menu">
              <UtensilsCrossed className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Menu
            </NavLink>
            <NavLink className={linkClass} to="/gio-hang">
              <ShoppingCart className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Giỏ hàng
            </NavLink>
            <NavLink className={linkClass} to="/lich-su-don">
              <Package className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Đơn hàng
            </NavLink>
            <NavLink className={linkClass} to="/tai-khoan">
              <User className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Tài khoản
            </NavLink>
            {isAdmin ? (
              <NavLink className={linkClass} to="/quan-ly">
                <Shield className={styles.topnavIcon} strokeWidth={2} aria-hidden />
                Quản trị
              </NavLink>
            ) : null}
          </nav>
        </div>
        <div class={styles.topnavRight}>
          <div class={styles.topnavSearch}>
            <Search className={styles.topnavSearchIcon} strokeWidth={2} aria-hidden />
            <input class={styles.topnavInput} type="search" placeholder="Thèm món gì hôm nay?" aria-label="Tìm món" />
          </div>
          <div class={styles.topnavActions}>
            <Link class={styles.topnavRound} to="/gio-hang" aria-label={`Giỏ hàng, ${cartCount} món`}>
              <ShoppingCart strokeWidth={2} />
              <span class={styles.topnavBadge}>{cartCount}</span>
            </Link>
            <Link class={styles.topnavRound} to="/tai-khoan" aria-label="Tài khoản">
              <User strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
