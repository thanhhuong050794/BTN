import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useOrderHistory } from '../context/OrderHistoryContext'
import { demoHistory } from '../data/orders'
import styles from './LichSuDonHangPage.module.css'

function formatPrice(n) {
  return `${n.toLocaleString('vi-VN')}đ`
}

const statusUi = {
  preparing: { label: 'Đang xử lý', cls: styles.badgeWait },
  delivered: { label: 'Đã giao', cls: styles.badgeOk },
  cancelled: { label: 'Đã huỷ', cls: styles.badgeBad },
}

export default function LichSuDonHangPage() {
  const { orders } = useOrderHistory()
  const location = useLocation()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [orderFlash, setOrderFlash] = useState(false)

  useEffect(() => {
    if (!location.state?.orderPlaced) return
    setOrderFlash(true)
    navigate(location.pathname, { replace: true, state: {} })
  }, [location.state, location.pathname, navigate])

  useEffect(() => {
    if (!orderFlash) return
    const t = window.setTimeout(() => setOrderFlash(false), 6000)
    return () => window.clearTimeout(t)
  }, [orderFlash])

  const merged = useMemo(() => [...orders, ...demoHistory], [orders])

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/^#/, '')
    if (!s) return merged
    return merged.filter((o) => o.id.toLowerCase().includes(s))
  }, [q, merged])

  return (
    <main class={styles.page}>
      <div class={styles.inner}>
        <header class={styles.hd}>
          <h1 class={styles.title}>Lịch sử đơn hàng</h1>
          <p class={styles.lead}>Xem và quản lý các đơn đặt món tại campus.</p>
        </header>

        {orderFlash ? (
          <div class={styles.flash} role="status">
            <span class={`material-symbols-outlined ${styles.flashIco}`}>check_circle</span>
            <p class={styles.flashTxt}>Đặt hàng thành công. Đơn của bạn đã được lưu vào lịch sử.</p>
          </div>
        ) : null}

        <section class={styles.tools} aria-label="Lọc đơn hàng">
          <div class={styles.search}>
            <span class={`material-symbols-outlined ${styles.searchIco}`}>search</span>
            <input
              class={styles.searchInp}
              type="search"
              placeholder="Tìm theo mã đơn (vd. NF12345)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Tìm theo mã đơn"
            />
          </div>
          <div class={styles.filt}>
            <div class={styles.selWrap}>
              <select class={styles.sel} defaultValue="30" aria-label="Khoảng thời gian">
                <option value="30">30 ngày gần đây</option>
                <option value="90">3 tháng</option>
                <option value="2024">2024</option>
                <option value="old">Cũ hơn</option>
              </select>
              <span class={`material-symbols-outlined ${styles.selChev}`}>expand_more</span>
            </div>
            <button type="button" class={styles.filtBtn} aria-label="Bộ lọc nâng cao">
              <span class="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </section>

        <div class={styles.list}>
          {rows.length === 0 ? (
            <p class={styles.empty}>Không có đơn nào khớp “{q}”.</p>
          ) : (
            rows.map((o) => {
              const st = statusUi[o.status] ?? statusUi.preparing
              return (
                <article key={o.id} class={styles.card}>
                  <div class={styles.top}>
                    <div class={styles.meta}>
                      <div class={styles.idRow}>
                        <span class={styles.oid}>#{o.id}</span>
                        <span class={`${styles.badge} ${st.cls}`}>{st.label}</span>
                      </div>
                      <p class={styles.when}>
                        Đặt ngày {o.date} • {o.time}
                      </p>
                    </div>
                    <div class={styles.sum}>
                      <p class={styles.sumN}>{formatPrice(o.total)}</p>
                    </div>
                  </div>
                  <div class={styles.body}>
                    <div class={o.dimmed ? `${styles.thumb} ${styles.thumbDim}` : styles.thumb}>
                      <img src={o.image} alt="" />
                    </div>
                    <div class={styles.txt}>
                      <h3 class={styles.name}>{o.summary}</h3>
                      <p class={styles.sub}>{o.detail}</p>
                    </div>
                  </div>
                  <div class={styles.foot}>
                    <Link class={`${styles.btn} ${styles.btnGhost}`} to={`/don-hang/${o.id}`}>
                      Xem chi tiết
                    </Link>
                    <Link class={`${styles.btn} ${styles.btnPri}`} to="/menu">
                      Đặt lại
                    </Link>
                  </div>
                </article>
              )
            })
          )}
        </div>

        <div class={styles.more}>
          <button type="button" class={styles.moreBtn}>
            <span>Xem thêm đơn</span>
            <span class="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </main>
  )
}
