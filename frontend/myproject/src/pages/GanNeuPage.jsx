import styles from './GanNeuPage.module.css'

export default function GanNeuPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Khám phá</p>
          <h1 className={styles.title}>Các quán ăn gần NEU</h1>
          <p className={styles.description}>
            Tìm kiếm những lựa chọn món ăn nhanh, tiện lợi và phù hợp cho sinh viên quanh khu vực NEU.
          </p>
        </div>
      </section>
      <section className={styles.cards}>
        <article className={styles.card}>
          <h2>Đang cập nhật</h2>
          <p>
            Danh sách các món ăn gần NEU sẽ được cập nhật sớm. Trong thời gian này, bạn có thể xem toàn bộ
            thực đơn và tìm món yêu thích trong mục Menu.
          </p>
        </article>
      </section>
    </main>
  )
}
