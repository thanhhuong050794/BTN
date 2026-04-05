import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <main class={styles.pageHome}>
        <section class={`wrap ${styles.sectionMb12}`}>
          <div class={styles.hero}>
            <video
              class={styles.heroBg}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Video nền trang chủ"
              src="https://www.shutterstock.com/shutterstock/videos/3775829335/preview/stock-footage-fast-food-leftovers-wasted-food.webm"
            />
            <div class={styles.heroBox}>
              <h1 class={styles.heroTitle}>Đặt đồ ăn giao tại phòng học</h1>
              <p class={styles.heroLead}>Cung cấp năng lượng tức thì cho những giờ học căng thẳng.</p>
              <Link class="btn-brand" to="/menu">
                Đặt ngay
              </Link>
            </div>
          </div>
        </section>

        <section class={`wrap ${styles.sectionMb12}`}>
          <div class={styles.promoBanner}>
            <div class={styles.promoTextCol}>
              <p class={styles.promoHeadline}>SƠN TÙNG ĐÃ THỬ, CÒN BẠN THÌ SAO?</p>
            </div>
            <div class={styles.promoImageCol}>
              <img
                class={styles.promoImage}
                src="https://i.pinimg.com/736x/f8/4a/1c/f84a1c045f0c5096945577c734f601ee.jpg"
                alt="Banner quảng cáo"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
