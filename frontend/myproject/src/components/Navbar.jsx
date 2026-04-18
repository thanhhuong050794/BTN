import { Link, NavLink } from 'react-router-dom'
import { Home, UtensilsCrossed, ShoppingCart, User, Search, Package, Shield, MapPin, LogIn, UserPlus, Gamepad2 } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useCart } from '../context/CartContext'
import { useMenuSearch } from '../context/MenuSearchContext'
import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'

const linkClass = ({ isActive }) =>
  isActive ? `${styles.topnavLink} ${styles.topnavLinkOn}` : styles.topnavLink

export default function Navbar() {
  const { isAdmin } = useAdminAuth()
  const { totalCount } = useCart()
  const { menuSearch, setMenuSearch } = useMenuSearch()
  const cartCount = totalCount
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const accountMenuRef = useRef(null)

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
            <NavLink className={linkClass} to="/gan-neu">
              <MapPin className={styles.topnavIcon} strokeWidth={2} aria-hidden />
              Các quán ăn gần NEU
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
            <input
              className={styles.topnavInput}
              type="search"
              placeholder="Tìm món theo tên hoặc mô tả..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              aria-label="Tìm món"
            />
          </div>
          <div class={styles.topnavActions}>
            <Link class={styles.topnavRound} to="/gio-hang" aria-label={`Giỏ hàng, ${cartCount} món`}>
              <ShoppingCart strokeWidth={2} />
              <span class={styles.topnavBadge}>{cartCount}</span>
            </Link>
            <div class={styles.accountMenu} ref={accountMenuRef}>
              <button 
                class={styles.topnavRound} 
                onClick={toggleAccountMenu}
                aria-label="Tài khoản"
              >
                <User strokeWidth={2} />
              </button>
              {showAccountMenu && (
                <div class={styles.accountDropdown}>
                  <Link 
                    to="/tai-khoan" 
                    class={styles.accountMenuItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <User className={styles.accountMenuIcon} strokeWidth={2} />
                    Tài khoản
                  </Link>
                  <Link 
                    to="/dang-nhap" 
                    class={styles.accountMenuItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <LogIn className={styles.accountMenuIcon} strokeWidth={2} />
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/dang-ky" 
                    class={styles.accountMenuItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <UserPlus className={styles.accountMenuIcon} strokeWidth={2} />
                    Đăng ký
                  </Link>
                  <a 
                    href="/RANDOM.html" 
                    class={styles.accountMenuItem}
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <Gamepad2 className={styles.accountMenuIcon} strokeWidth={2} />
                    Game ngẫu nhiên
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
