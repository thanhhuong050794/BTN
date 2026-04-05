import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ThanhToanPage.module.css'

function formatPrice(vnd) {
  return `${vnd.toLocaleString('vi-VN')}đ`
}

export default function ThanhToanPage() {
  const [payment, setPayment] = useState('transfer')
  const [room, setRoom] = useState('')
  const [note, setNote] = useState('')

  return (
    <>
      <main class={styles.pay}>
        <div class="wrap">
          <section class={styles.paySteps}>
            <div class={styles.steps}>
              <div class={styles.stepsItem}>
                <div class={`${styles.stepsDot} ${styles.stepsDotOk}`}>
                  <span class={`material-symbols-outlined material-symbols-fill ${styles.stepsIcon}`}>check_circle</span>
                </div>
                <span class={`${styles.stepsLbl} ${styles.stepsLblOn}`}>Giỏ hàng</span>
              </div>
              <div class={`${styles.stepsBar} ${styles.stepsBarOn}`} />
              <div class={styles.stepsItem}>
                <div class={`${styles.stepsDot} ${styles.stepsDotHere}`}>
                  <span class={styles.stepsNum}>2</span>
                </div>
                <span class={`${styles.stepsLbl} ${styles.stepsLblBold}`}>Thanh toán</span>
              </div>
              <div class={styles.stepsBar} />
              <div class={styles.stepsItem}>
                <div class={`${styles.stepsDot} ${styles.stepsDotOff}`}>
                  <span class={styles.stepsNum}>3</span>
                </div>
                <span class={`${styles.stepsLbl} ${styles.stepsLblOff}`}>Hoàn tất</span>
              </div>
            </div>
          </section>

          <div class={styles.payGrid}>
            <div class={styles.payLeft}>
              <div class={styles.card}>
                <div class={styles.cardHead}>
                  <span class={`material-symbols-outlined ${styles.cardIcon}`}>location_on</span>
                  <h2 class={styles.cardH}>Thông tin giao hàng</h2>
                </div>
                <div class={styles.cardBody}>
                  <label class={styles.field}>
                    <span class={styles.fieldLbl}>Phòng học / Vị trí cụ thể (Ví dụ: A101, B203)</span>
                    <input class={styles.fieldInput} id="room" type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Nhập số phòng học của bạn..." />
                  </label>
                  <label class={styles.field}>
                    <span class={styles.fieldLbl}>Ghi chú</span>
                    <textarea class={styles.fieldArea} id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: Ít cay, thêm đá, để ở bàn bảo vệ..." rows={3} />
                  </label>
                </div>
              </div>

              <div class={styles.card}>
                <div class={styles.cardHead}>
                  <span class={`material-symbols-outlined ${styles.cardIcon}`}>account_balance_wallet</span>
                  <h2 class={styles.cardH}>Phương thức thanh toán</h2>
                </div>
                <div class={styles.payOpts}>
                  <label class={payment === 'cash' ? `${styles.payOpt} ${styles.payOptOn}` : styles.payOpt}>
                    <input class="sr-only" type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                    <div class={styles.payOptIco}>
                      <span class="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <p class={styles.payOptT}>Tiền mặt</p>
                      <p class={styles.payOptD}>Thanh toán khi nhận hàng</p>
                    </div>
                    <span class={payment === 'cash' ? `${styles.payOptRing} ${styles.payOptRingOn}` : styles.payOptRing} />
                  </label>
                  <label class={payment === 'transfer' ? `${styles.payOpt} ${styles.payOptOn}` : styles.payOpt}>
                    <input class="sr-only" type="radio" name="payment" value="transfer" checked={payment === 'transfer'} onChange={() => setPayment('transfer')} />
                    <div class={styles.payOptIco}>
                      <span class="material-symbols-outlined">qr_code_2</span>
                    </div>
                    <div>
                      <p class={styles.payOptT}>Chuyển khoản (QR)</p>
                      <p class={styles.payOptD}>Quét mã nhanh chóng</p>
                    </div>
                    <span class={payment === 'transfer' ? `${styles.payOptRing} ${styles.payOptRingOn}` : styles.payOptRing} />
                  </label>
                </div>

                {payment === 'transfer' ? (
                  <div class={styles.qr}>
                    <div class={styles.qrImg}>
                      <img
                        alt="QR thanh toán"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzmpJ6Yzy-8CIuFOtTul9dVhEGHNhtJqTSmW46lfAQNj3pKPXvohOWqbSzAcBcGpGRr4FiJCcD8nMIXou5TPyOeEesWaUsyYDh4ZXQxZnTPZH6iYO-DuL6VpFCMQ0LqbAz3h2GVU9VTkgsS1Y1Qhx-aegL3Ut8T4smSvrB4cNDfrfGtPnlvDhUOygAtDurMzrFfeve_iNpQK68VVBFdk7Fh9BfFB0EybmACihauiKdlRTL1U09guXUeFOthmpRODV6lysfikx1Cjs"
                      />
                    </div>
                    <div class={styles.qrTxt}>
                      <h3 class={styles.qrH}>Quét mã để thanh toán</h3>
                      <ul class={styles.qrList}>
                        <li>
                          <span class={styles.qrDot} />
                          Mở ứng dụng ngân hàng hoặc ví điện tử
                        </li>
                        <li>
                          <span class={styles.qrDot} />
                          Chọn quét mã QR và quét mã bên trái
                        </li>
                        <li>
                          <span class={styles.qrDot} />
                          Kiểm tra số tiền và nội dung chuyển khoản
                        </li>
                      </ul>
                      <span class={styles.qrTag}>Tự động xác nhận</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <aside class={styles.paySide}>
              <div class={styles.bill}>
                <div class={styles.billHead}>
                  <h2 class={styles.billTitle}>Chi tiết đơn hàng</h2>
                  <p class={styles.billHint}>Sẽ được giao trong vòng 15-20 phút</p>
                </div>
                <div class={styles.billBody}>
                  <div class={styles.billLines}>
                    <div class={styles.billLine}>
                      <div class={styles.billThumb}>
                        <img
                          alt="Cơm Gà Xối Mỡ"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuArlMMctdJZDssFMYe1amzzzrPKQyWn3zQXGiC8vIOz0jM2bbhGxWR1tQRw8Fvxd4L0_ATtCXAeG8gN-5HyUkMFA2HjPxhIQfCnvNB17xwwLzPa3_njP1vIp09_b1Ue8pnE1a_3nw5tgBTp4tnwrvpEatMXY3a772msn6yv6D-be44i5QEY__sbNf0k9j8cciMq1TpPshhcItLSDLYmMODCqV28lYSbl4wlsQOGWAjhxU7n0bmXeJDVulCQDWQb8Nz6DhnuXLh_9Ms"
                        />
                      </div>
                      <div class={styles.billMid}>
                        <h4 class={styles.billName}>Cơm Gà Xối Mỡ</h4>
                        <p class={styles.billMeta}>x1 • Đùi gà lớn</p>
                      </div>
                      <p class={styles.billP}>{formatPrice(45000)}</p>
                    </div>
                    <div class={styles.billLine}>
                      <div class={styles.billThumb}>
                        <img
                          alt="Trà Sữa"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWLHO440gs0rEu__4BU42TM7ZdHK8KKHAyvVBwb53RMJ5hKB_Lr24ewxbpcRSLtcJI3th6I1-Wb3ASRQgzIcLL9wgEfzYDmRsW6xk1HWAvvz44WXK9rwp-LofYMJk1LU9R6-V954RbZZQxV4tdw8U3oJ-EMH29QNbXnr7JgsPblKEweUZ7afuARgIreHCbzxB56p-H0lNkVXBb6hQOZN3rUrgLnqaVps4yXlKJSb69vhL7VOhGFje5c7oSee2fG78D3VHKxSKJ7Dc"
                        />
                      </div>
                      <div class={styles.billMid}>
                        <h4 class={styles.billName}>Trà Sữa Trân Châu</h4>
                        <p class={styles.billMeta}>x1 • Size M, 50% đường</p>
                      </div>
                      <p class={styles.billP}>{formatPrice(35000)}</p>
                    </div>
                  </div>
                  <div class={styles.billSep} />
                  <div class={styles.billRows}>
                    <div class={styles.billRow}>
                      <span>Tạm tính</span>
                      <span class={styles.billRowInk}>{formatPrice(80000)}</span>
                    </div>
                    <div class={styles.billRow}>
                      <span>Phí giao hàng</span>
                      <span class={styles.billRowInk}>{formatPrice(5000)}</span>
                    </div>
                    <div class={styles.billRow}>
                      <span>Giảm giá (Mã: NEUFREE)</span>
                      <span class={styles.billRowDanger}>-{formatPrice(5000)}</span>
                    </div>
                  </div>
                  <div class={styles.billSep} />
                  <div class={styles.billSum}>
                    <div>
                      <span class={styles.billSumL}>Tổng cộng</span>
                      <p class={styles.billVat}>Bao gồm thuế VAT</p>
                    </div>
                    <span class={styles.billSumN}>{formatPrice(80000)}</span>
                  </div>
                  <button type="button" class={styles.billGo}>
                    <span class="material-symbols-outlined material-symbols-fill">shopping_bag</span>
                    Xác nhận đặt hàng
                  </button>
                  <p class={styles.billLegal}>
                    Bằng việc nhấn đặt hàng, bạn đã đồng ý với các{' '}
                    <Link class={styles.billLegalLink} to="/thanh-toan">
                      Điều khoản &amp; Chính sách
                    </Link>{' '}
                    của NEUFood.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer class={styles.payFoot}>
        <div class={`wrap ${styles.payFootInner}`}>
          <div class={styles.payFootBrand}>NEUFood</div>
          <div class={styles.payFootLinks}>
            <a href="#">Support</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Campus Map</a>
          </div>
          <div class={styles.payFootCopy}>© 2024 NEUFood Campus Dining. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}
