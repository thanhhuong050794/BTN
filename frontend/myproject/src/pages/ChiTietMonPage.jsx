import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDishById, suggestedDishes } from '../data/dishes'
import styles from './ChiTietMonPage.module.css'

function formatPrice(vnd) {
  return `${vnd.toLocaleString('vi-VN')}đ`
}

export default function ChiTietMonPage() {
  const { id } = useParams()
  const dish = getDishById(id)
  const [qty, setQty] = useState(1)

  const detailImg = dish.detailImage ?? dish.image
  const ingredients = dish.ingredients ?? []
  const oldPrice = dish.oldPrice

  return (
    <>
      <main class={styles.detail}>
        <div class="wrap">
          <nav class={styles.crumb}>
            <Link class={styles.crumbLink} to="/">
              Trang chủ
            </Link>
            <span class={`material-symbols-outlined ${styles.crumbSep}`}>chevron_right</span>
            <Link class={styles.crumbLink} to="/menu">
              Menu
            </Link>
            <span class={`material-symbols-outlined ${styles.crumbSep}`}>chevron_right</span>
            <span class={styles.crumbHere}>{dish.name}</span>
          </nav>

          <section class={styles.detailMain}>
            <div class={styles.detailShot}>
              <div class={styles.detailFrame}>
                <img class={styles.detailPhoto} src={detailImg} alt={dish.name} />
              </div>
              <div class={styles.detailRate}>
                <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                {dish.rating}/5 ({dish.reviewCount ?? 120}+ Đánh giá)
              </div>
            </div>

            <div class={styles.detailInfo}>
              <div>
                <h1 class={styles.detailName}>{dish.name}</h1>
                <div class={styles.detailPrices}>
                  <span class={styles.detailPrice}>{formatPrice(dish.price)}</span>
                  {oldPrice ? <span class={styles.detailOld}>{formatPrice(oldPrice)}</span> : null}
                </div>
              </div>
              <div class={styles.detailBlock}>
                <h3 class={styles.detailH}>Mô tả món ăn</h3>
                <p class={styles.detailQuote}>&quot;{dish.description}&quot;</p>
              </div>
              {ingredients.length > 0 ? (
                <div class={styles.detailIngredients}>
                  <h4 class={styles.detailIngTitle}>Thành phần chính</h4>
                  <ul class={styles.detailIngList}>
                    {ingredients.map((item) => (
                      <li key={item} class={styles.detailIngItem}>
                        <span class={styles.detailDot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div class={styles.detailBuy}>
                <div class={styles.qty}>
                  <button type="button" class={styles.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm số lượng">
                    <span class="material-symbols-outlined">remove</span>
                  </button>
                  <span class={styles.qtyNum}>{qty}</span>
                  <button type="button" class={styles.qtyBtn} onClick={() => setQty((q) => q + 1)} aria-label="Tăng số lượng">
                    <span class="material-symbols-outlined">add</span>
                  </button>
                </div>
                <Link class={styles.detailCart} to="/gio-hang">
                  <span class="material-symbols-outlined">shopping_bag</span>
                  Thêm vào giỏ hàng
                </Link>
              </div>
            </div>
          </section>

          <section class={styles.reviewsSection}>
            <div class={styles.reviewsHead}>
              <div>
                <h2 class={styles.reviewsTitle}>Đánh giá khách hàng</h2>
                <div class={styles.reviewsMeta}>
                  <div class={styles.reviewsStars}>
                    <span class="material-symbols-outlined material-symbols-fill">star</span>
                    <span class="material-symbols-outlined material-symbols-fill">star</span>
                    <span class="material-symbols-outlined material-symbols-fill">star</span>
                    <span class="material-symbols-outlined material-symbols-fill">star</span>
                    <span class="material-symbols-outlined material-symbols-fill">star_half</span>
                  </div>
                  <span class={styles.metaBold}>4.8</span>
                  <span class={styles.metaMuted}>(124 đánh giá)</span>
                </div>
              </div>
              <button type="button" class="link-muted">
                Xem tất cả
              </button>
            </div>
            <div class={styles.reviewsGrid}>
              <div class={styles.review}>
                <div class={styles.reviewTop}>
                  <div class={styles.reviewUser}>
                    <div class={styles.reviewAvatar}>
                      <img alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdypycJ5HgXj16puxulWG91hlXv4PHnZWg7sU8qH9hBRDBSPBGOXLW8nQhz0GJqr1DgfB71Mt1rDnPLrkxyZvV1WIUmUTsuiTZOmRaeRJQDBerkeHAVM5ZTSHzn1HcfVWFgPE4CIJ_cl2gYM1sh25AcRTPppaJbqwQfDqYVu_hpXl2jvbXo6nBEiEWGbWy2hGRG_wsrXDh8N35GGI_iWe71-QMR_TMKA8QylLXZ12EW375S2_LGFopPNwm5j2yjLIrrQ02Z33qNc4" />
                    </div>
                    <div>
                      <h4 class={styles.metaBold}>Hoàng Nam</h4>
                      <p class={styles.reviewRole}>Sinh viên Kinh tế</p>
                    </div>
                  </div>
                  <div class={styles.reviewStars}>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                  </div>
                </div>
                <p class={styles.reviewText}>
                  Gà giòn đúng điệu, da gà xối mỡ mặn mặn ngọt ngọt rất bắt miệng. Cơm không bị khô quá. Suất ăn khá
                  nhiều, đủ no cho cả buổi chiều lên giảng đường.
                </p>
              </div>
              <div class={styles.review}>
                <div class={styles.reviewTop}>
                  <div class={styles.reviewUser}>
                    <div class={styles.reviewAvatar}>
                      <img alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDizAUQJ2UpXGFZeK5MQUUay1UJLfmRD7SKcdyxy5JcH0mOPFSu2BrVx9_mslWsWWg52bgXe7h7PKP_oUxus0GWi4gQYq_1wQjSfgsARBgAn4yAtllXGWlebFG3jIZmtldmPqd53j_EFF1t2mIy7jTn4S3kfvlE2xwMA0UhWbD5G6g0h2MnUQiMCQgZX1AOSoW4AHo0hD61pn-E3oscqcjYoK-FTJU5Vz2aLy0y1A5TWNIu8M_2gyce98SJCVJmY1LhnnsjEB1tuAw" />
                    </div>
                    <div>
                      <h4 class={styles.metaBold}>Minh Anh</h4>
                      <p class={styles.reviewRole}>Giảng viên</p>
                    </div>
                  </div>
                  <div class={styles.reviewStars}>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined material-symbols-fill ${styles.starSm}`}>star</span>
                    <span class={`material-symbols-outlined ${styles.starSm}`}>star</span>
                  </div>
                </div>
                <p class={styles.reviewText}>
                  Dịch vụ giao hàng nhanh, cơm vẫn còn nóng hổi khi nhận. Nước mắm tỏi ớt là linh hồn của món này, rất
                  đậm đà. Sẽ tiếp tục ủng hộ NEUFood.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 class={styles.suggestTitle}>Gợi ý món liên quan</h2>
            <div class={`${styles.suggestRow} scrollbar-hide`}>
              {suggestedDishes.map((s) => (
                <div key={s.id} class={styles.suggestCard}>
                  <div class={styles.suggestImgBox}>
                    <img class={styles.suggestImg} src={s.image} alt={s.name} />
                  </div>
                  <div class={styles.suggestBody}>
                    <h4 class={styles.suggestName}>{s.name}</h4>
                    <div class={styles.suggestFoot}>
                      <span class={styles.suggestPrice}>{formatPrice(s.price)}</span>
                      <Link class={styles.suggestAdd} to={`/mon/${s.id}`} aria-label={`Thêm ${s.name}`}>
                        <span class={`material-symbols-outlined ${styles.suggestAddIcon}`}>add</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer class={styles.detailFoot}>
        <div class={`wrap ${styles.detailFootInner}`}>
          <div class={styles.detailFootBrand}>
            <div class={styles.detailFootName}>NEUFood Campus Dining</div>
            <div class={styles.detailFootCopy}>© 2024 NEUFood Campus Dining. All rights reserved.</div>
          </div>
          <div class={styles.detailFootLinks}>
            <a class={styles.detailFootA} href="#">
              Support
            </a>
            <a class={styles.detailFootA} href="#">
              Privacy Policy
            </a>
            <a class={styles.detailFootA} href="#">
              Terms of Service
            </a>
            <a class={styles.detailFootA} href="#">
              Campus Map
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
