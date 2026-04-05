import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { demoTracking } from '../data/orders'
import styles from './DonHangPage.module.css'

function formatPrice(n) {
  return `${n.toLocaleString('vi-VN')}đ`
}

export default function DonHangPage() {
  const [phase, setPhase] = useState('preparing')

  useEffect(() => {
    const t = setTimeout(() => setPhase('delivering'), 5000)
    return () => clearTimeout(t)
  }, [])

  const subtotal = useMemo(
    () => demoTracking.items.reduce((s, i) => s + i.price * i.qty, 0),
    [],
  )
  const total = subtotal + demoTracking.shipFee

  const progress = phase === 'preparing' ? 33 : 66
  const title = phase === 'preparing' ? 'Đang chuẩn bị' : 'Đang giao hàng'
  const lead =
    phase === 'preparing'
      ? 'Nhà bếp đang hối hả chuẩn bị bữa ăn tuyệt vời nhất dành riêng cho bạn.'
      : 'Shipper đang trên đường tới địa chỉ của bạn. Chuẩn bị nhận món nhé!'

  return (
    <main class={styles.page}>
      <div class={`wrap ${styles.layout}`}>
        <div class={styles.main}>
          <Link class={styles.back} to="/lich-su-don">
            ← Lịch sử đơn
          </Link>
          <header class={styles.head}>
            <div class={styles.live}>
              <span class={styles.ping}>
                <span class={styles.pingDot} />
              </span>
              Cập nhật trực tiếp
            </div>
            <h1 class={styles.title}>{title}</h1>
            <p class={styles.lead}>{lead}</p>
          </header>

          <section class={styles.track} aria-label="Tiến trình đơn hàng">
            <div class={styles.steps}>
              <div class={styles.line} aria-hidden>
                <div class={styles.fill} style={{ width: `${progress}%` }} />
              </div>
              <div class={styles.step}>
                <div class={`${styles.dot} ${styles.dotOn}`}>
                  <span class={`material-symbols-outlined ${styles.ico} ${styles.icoFill}`}>check</span>
                </div>
                <span class={styles.lbl}>Đã đặt</span>
              </div>
              <div class={styles.step}>
                <div
                  class={`${styles.dot} ${phase === 'preparing' ? `${styles.dotOn} ${styles.dotPulse}` : styles.dotOn}`}
                >
                  {phase === 'preparing' ? (
                    <span class={`material-symbols-outlined ${styles.ico}`}>restaurant</span>
                  ) : (
                    <span class={`material-symbols-outlined ${styles.ico} ${styles.icoFill}`}>check</span>
                  )}
                </div>
                <span class={styles.lbl}>Chuẩn bị</span>
              </div>
              <div class={styles.step}>
                <div
                  class={`${styles.dot} ${phase === 'delivering' ? `${styles.dotOn} ${styles.dotPulse}` : ''}`}
                >
                  <span class={`material-symbols-outlined ${styles.ico}`}>delivery_dining</span>
                </div>
                <span class={phase === 'delivering' ? styles.lbl : styles.lblOff}>Đang giao</span>
              </div>
              <div class={styles.step}>
                <div class={styles.dot}>
                  <span class={`material-symbols-outlined ${styles.ico}`}>inventory_2</span>
                </div>
                <span class={styles.lblOff}>Đã giao</span>
              </div>
            </div>
          </section>

          <section class={styles.map} aria-label="Bản đồ giao hàng">
            <img
              class={styles.mapPic}
              src={demoTracking.mapSrc}
              alt="Bản đồ khuôn viên NEU"
            />
            <div class={styles.mapGrad} aria-hidden />
            <div class={styles.mapFoot}>
              <div class={styles.glass}>
                <div class={styles.drvPic}>
                  <img src={demoTracking.driver.photo} alt="" />
                </div>
                <div>
                  <p class={styles.drvLbl}>Shipper của bạn</p>
                  <p class={styles.drvName}>{demoTracking.driver.name}</p>
                </div>
              </div>
              <div class={styles.shipBtns}>
                <button type="button" class={`${styles.round} ${styles.roundPri}`} aria-label="Gọi shipper">
                  <span class="material-symbols-outlined">call</span>
                </button>
                <button type="button" class={`${styles.round} ${styles.roundSec}`} aria-label="Nhắn tin">
                  <span class="material-symbols-outlined">chat_bubble</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside class={styles.aside}>
          <div class={styles.card}>
            <h2 class={styles.cardTitle}>Chi tiết đơn hàng #{demoTracking.id}</h2>
            <div class={styles.items}>
              {demoTracking.items.map((item) => (
                <div key={item.name} class={styles.row}>
                  <div class={styles.thumb}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div class={styles.rowBody}>
                    <h3 class={styles.rowName}>{item.name}</h3>
                    <p class={styles.rowNote}>{item.note}</p>
                    <div class={styles.rowFoot}>
                      <span class={styles.qty}>x{item.qty}</span>
                      <span class={styles.price}>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div class={styles.bill}>
                <div class={styles.billRow}>
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div class={styles.billRow}>
                  <span>Phí giao hàng</span>
                  <span>{formatPrice(demoTracking.shipFee)}</span>
                </div>
                <div class={styles.billTotal}>
                  <span>Tổng cộng</span>
                  <span class={styles.billSum}>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div class={styles.info}>
            <div class={styles.infoList}>
              <div class={styles.infoRow}>
                <span class="material-symbols-outlined">location_on</span>
                <div>
                  <p class={styles.infoLbl}>Địa chỉ nhận</p>
                  <p class={styles.infoTxt}>{demoTracking.address.line1}</p>
                  <p class={styles.infoSub}>{demoTracking.address.line2}</p>
                </div>
              </div>
              <div class={styles.infoRow}>
                <span class="material-symbols-outlined">schedule</span>
                <div>
                  <p class={styles.infoLbl}>Dự kiến giao</p>
                  <p class={styles.infoTxt}>{demoTracking.eta}</p>
                </div>
              </div>
            </div>
          </div>

          <div class={styles.act2}>
            <Link to="/menu" class={`${styles.actBtn} ${styles.actGhost}`}>
              <span class="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                replay
              </span>
              Đặt lại
            </Link>
            <button type="button" class={`${styles.actBtn} ${styles.actPri}`}>
              <span class={`material-symbols-outlined ${styles.icoFill}`} style={{ fontSize: '1.125rem' }}>
                star
              </span>
              Đánh giá
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}
