import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './GioHangPage.module.css'

const initialItems = [
  {
    key: 'com',
    name: 'Cơm Gà Xối Mỡ NEU',
    price: 45000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeR7Cwdi-S391gQPC2w-AWU1Kxg3sPNgNbuHw3hUdmk__96ux97dd04b1FXgnWkx8fWjB66dZ4KadjMoe7OtCIIOcXc9YhzaBtDgvVmTBopzJxgYXGzzea1_nqOogQwLgO3Vcq263lQVjqlcWSWxsFJ8xzW-dAgM35zBVT8_Rslrc6-5EspYTH1lX3iksUmd-Ol7RxJKREJHbdFB9o8bjBba0fi5yqmNgYHjYU4C7tn9A8NtbOkdo_pnkwGvAiMjoVDqC39SCzFhI',
  },
  {
    key: 'tra',
    name: 'Trà Sữa Trân Châu',
    price: 35000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDO6qkML26cdiEbqaNrf0GQlcoPK0KnKgTzzvWl49MlXrdppCo8XUub3XCX4lNbw46yG_dLVes_rNDfXTY89zSC1OCnU1bOBEhPPFLFTY8THL63VDtj4O3mNMriw6BA0nVGO5VAXOKOWosqWDJNr0-kKrvUJ9ooisMah3cpKzwIwtxV4QUpBAPSHl5CVmBmasgtj_U8E_u9Cpei0BC2Yl17bvbJBv9pqO1wTQHV28KbZ0OLEkHd-fHnXeU5DDGU0gOFN5dvnHAoxjI',
  },
]

function formatPrice(vnd) {
  return `${vnd.toLocaleString('vi-VN')}đ`
}

export default function GioHangPage() {
  const [quantities, setQuantities] = useState(() =>
    initialItems.reduce((acc, item) => {
      acc[item.key] = 1
      return acc
    }, {}),
  )

  const { subtotal, totalItems } = useMemo(() => {
    let sub = 0
    let count = 0
    initialItems.forEach((item) => {
      const q = quantities[item.key] ?? 0
      sub += item.price * q
      count += q
    })
    return { subtotal: sub, totalItems: count }
  }, [quantities])

  const shipping = totalItems > 0 ? 10000 : 0
  const discount = totalItems > 0 ? 5000 : 0
  const total = Math.max(0, subtotal + shipping - discount)

  function setQty(key, delta) {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[key] ?? 0) + delta)
      if (next === 0) {
        const { [key]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [key]: next }
    })
  }

  const visibleItems = initialItems.filter((item) => (quantities[item.key] ?? 0) > 0)

  return (
    <main class={styles.cart}>
      <div class={`wrap ${styles.cartWrap}`}>
        <header class={styles.cartHead}>
          <h1 class={styles.cartTitle}>Giỏ hàng của bạn</h1>
          <p class={styles.cartSub}>
            Bạn đang có <span class={styles.cartHl}>{totalItems} món ăn</span> trong giỏ hàng NEUFood
          </p>
        </header>

        <div class={styles.cartGrid}>
          <div class={styles.cartList}>
            {visibleItems.length === 0 ? <p class={styles.cartEmpty}>Giỏ hàng trống.</p> : null}
            {visibleItems.map((item) => (
              <div key={item.key} class={styles.line}>
                <div class={styles.lineThumb}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div class={styles.lineMain}>
                  <h3 class={styles.lineName}>{item.name}</h3>
                  <p class={styles.linePrice}>{formatPrice(item.price)}</p>
                  <div class={styles.lineQty}>
                    <div class={styles.stepper}>
                      <button type="button" class={styles.stepperBtn} onClick={() => setQty(item.key, -1)} aria-label="Giảm">
                        <span class={`material-symbols-outlined ${styles.stepperIcon}`}>remove</span>
                      </button>
                      <span class={styles.stepperN}>{quantities[item.key]}</span>
                      <button type="button" class={styles.stepperBtn} onClick={() => setQty(item.key, 1)} aria-label="Tăng">
                        <span class={`material-symbols-outlined ${styles.stepperIcon}`}>add</span>
                      </button>
                    </div>
                  </div>
                </div>
                <button type="button" class={styles.lineDel} onClick={() => setQuantities((prev) => ({ ...prev, [item.key]: 0 }))} aria-label={`Xóa ${item.name}`}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}

            <div class={styles.ship}>
              <div class={styles.shipHead}>
                <span class={`material-symbols-outlined ${styles.shipIconBrand}`}>location_on</span>
                <h3 class={styles.shipTitle}>Địa điểm giao hàng</h3>
              </div>
              <div class={styles.shipField}>
                <select class={styles.shipSelect} defaultValue="" aria-label="Chọn phòng học">
                  <option value="">Chọn phòng học/Giảng đường</option>
                  <option value="A1.101">Giảng đường A1 - Phòng 101</option>
                  <option value="B2.203">Giảng đường B2 - Phòng 203</option>
                  <option value="C1.405">Giảng đường C1 - Phòng 405</option>
                  <option value="D2.510">Giảng đường D2 - Phòng 510</option>
                </select>
                <div class={styles.shipChev}>
                  <span class="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <p class={styles.shipHint}>
                <span class={`material-symbols-outlined ${styles.shipHintIcon}`}>info</span>
                Đơn hàng sẽ được giao tận cửa phòng học trong vòng 15-20 phút.
              </p>
            </div>
          </div>

          <aside class={styles.sum}>
            <div class={styles.sumBox}>
              <h2 class={styles.sumTitle}>Tóm tắt đơn hàng</h2>
              <div class={styles.sumRows}>
                <div class={styles.sumRow}>
                  <span>Tạm tính ({totalItems} món)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div class={styles.sumRow}>
                  <span>Phí vận chuyển</span>
                  <span class={styles.sumRowAccent}>{formatPrice(shipping)}</span>
                </div>
                <div class={styles.sumRow}>
                  <span>Giảm giá Campus</span>
                  <span class={styles.sumRowBrand}>-{formatPrice(discount)}</span>
                </div>
              </div>
              <div class={styles.sumTotal}>
                <span class={styles.sumTotalLabel}>Tổng cộng</span>
                <span class={styles.sumTotalValue}>{formatPrice(total)}</span>
              </div>
              <div class={styles.sumActions}>
                {totalItems > 0 ? (
                  <Link class={styles.sumPay} to="/thanh-toan">
                    Thanh toán ngay
                  </Link>
                ) : (
                  <span class={styles.sumNoop}>Thêm món để thanh toán</span>
                )}
                <Link class={styles.sumMore} to="/menu">
                  Tiếp tục đặt món
                </Link>
              </div>
              <p class={styles.sumNote}>
                <span class={`material-symbols-outlined ${styles.sumNoteIcon}`}>verified_user</span>
                Thanh toán an toàn qua VNPAY hoặc Tiền mặt
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
