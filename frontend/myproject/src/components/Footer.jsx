import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer class={styles.foot}>
      <div class={`wrap ${styles.footMain}`}>
        <div>
          <span class={styles.footTitle}>NEUFood Campus Dining</span>
          <p class={styles.footDesc}>
            Hệ thống đặt món ăn nhanh chóng dành riêng cho sinh viên Đại học Kinh tế Quốc dân.
          </p>
          <div class={styles.footSocial}>
            <a class={styles.footSocBtn} href="#" aria-label="Bảng xếp hạng">
              <span class={`material-symbols-outlined ${styles.footIcon}`}>social_leaderboard</span>
            </a>
            <a class={styles.footSocBtn} href="#" aria-label="Ảnh">
              <span class={`material-symbols-outlined ${styles.footIcon}`}>camera</span>
            </a>
          </div>
        </div>
        <div class={styles.footCols}>
          <div class={styles.footCol}>
            <span class={styles.footLabel}>Khám phá</span>
            <a class={styles.footLink} href="#">
              Về Campus
            </a>
            <a class={styles.footLink} href="#">
              Cửa hàng liên kết
            </a>
          </div>
          <div class={styles.footCol}>
            <span class={styles.footLabel}>Hỗ trợ</span>
            <a class={styles.footLink} href="#">
              Liên hệ
            </a>
            <Link class={styles.footLink} to="/thanh-toan">
              Điều khoản dịch vụ
            </Link>
            <a class={styles.footLink} href="#">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
      <div class={`wrap ${styles.footBar}`}>
        <p class={styles.footCopy}>© 2024 NEUFood Campus Dining. All rights reserved.</p>
        <div class={styles.footStatus}>
          <span class={styles.footDot} />
          <span class={styles.footStatusText}>Hệ thống đang hoạt động</span>
        </div>
      </div>
    </footer>
  )
}
