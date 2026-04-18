import { useCallback, useState } from 'react'
import styles from './OrderReviewModal.module.css'

export default function OrderReviewModal({ orderId, items, onClose, onSubmitReview }) {
  const [starsByLine, setStarsByLine] = useState(() => items.map(() => 0))
  const [comment, setComment] = useState('')
  const [err, setErr] = useState('')

  const setStar = useCallback((lineIdx, value) => {
    setStarsByLine((prev) => {
      const next = [...prev]
      next[lineIdx] = value
      return next
    })
    setErr('')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const missing = starsByLine.findIndex((s) => s < 1)
    if (missing !== -1) {
      setErr('Vui lòng chọn số sao cho từng món.')
      return
    }
    onSubmitReview({ starsByLine, comment })
    onClose()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="review-title">
      <div className={styles.panel}>
        <header className={styles.head}>
          <h2 id="review-title" className={styles.title}>
            Đánh giá món ăn
          </h2>
          <p className={styles.sub}>Mã đơn #{orderId}</p>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Đóng">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
            {items.map((item, idx) => (
              <li key={`${item.name}-${idx}`} className={styles.row}>
                <div className={styles.rowInfo}>
                  <span className={styles.dishName}>{item.name}</span>
                  <span className={styles.dishMeta}>x{item.qty}</span>
                </div>
                <div className={styles.stars} role="group" aria-label={`Đánh giá ${item.name}`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={n <= starsByLine[idx] ? styles.starOn : styles.starOff}
                      onClick={() => setStar(idx, n)}
                      aria-label={`${n} sao`}
                    >
                      <span className={`material-symbols-outlined ${styles.starIco}`}>star</span>
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <label className={styles.lbl}>
            Nhận xét thêm (tuỳ chọn)
            <textarea
              className={styles.area}
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ví dụ: Giao nhanh, đóng gói cẩn thận…"
            />
          </label>

          {err ? (
            <p className={styles.err} role="alert">
              {err}
            </p>
          ) : null}

          <div className={styles.actions}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Huỷ
            </button>
            <button type="submit" className={styles.btnPri}>
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
