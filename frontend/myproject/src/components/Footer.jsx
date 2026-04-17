import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.container}>
        
        
        <div className={styles.left}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8139388581217!2d105.83992427503058!3d21.000094180642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac71752d8f79%3A0xd2ec575c01017afa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBLaW5oIFThur8gUXXhu5FjIETDom4gKE5FVSk!5e0!3m2!1svi!2s!4v1775844449994!5m2!1svi!2s"
            className={styles.map}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        
        <div className={styles.right}>

          <div className={styles.item}>
            <span className={styles.icon}>📍</span>
            <span className={styles.label}>Địa Chỉ:</span>
            <a
              href="https://www.google.com/maps?q=207 Giải Phóng, Hà Nội"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              207 Giải Phóng, Phường Bạch Mai, Hà Nội
            </a>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>✉️</span>
            <span className={styles.label}>Email:</span>
            <a href="mailto:NeuFood@neu.edu.vn" className={styles.link}>
              NeuFood@neu.edu.vn
            </a>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>📞</span>
            <span className={styles.label}>Hotline:</span>
            <a href="tel:0812852613" className={styles.link}>
              0812852613
            </a>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>📨</span>
            <span className={styles.label}>Mọi Thắc Mắc Xin Liên Hệ:</span>
            <a href="mailto:ask-cait@neu.edu.vn" className={styles.link}>
              ask-cait@neu.edu.vn
            </a>
          </div>
        </div>
      </div>
  <div className={styles.bottom}>
  <span className={styles.copy}>
    © 2026 NEUFood
  </span>

  <div className={styles.footerLinks}>

    <a href="/about" className={styles.footerLink}>
      Câu chuyện của chúng tôi
    </a>
    <a href="/recruit" className={styles.footerLink}>
      NEUFood đang tuyển nhân sự
    </a>
  </div>
</div>
    </footer>
  )
}