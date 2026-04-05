import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

const BOTTOM_NAV_PATHS = ['/', '/menu', '/gio-hang']

export default function Layout() {
  const { pathname } = useLocation()
  const showBottomNav = BOTTOM_NAV_PATHS.includes(pathname)

  return (
    <>
      <Navbar />
      <Outlet />
      {showBottomNav ? <BottomNav /> : null}
    </>
  )
}
