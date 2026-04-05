import { Link } from 'react-router-dom'
import styles from './FoodCard.module.css'

function formatPrice(vnd) {
  return `${vnd.toLocaleString('vi-VN')}đ`
}

export default function FoodCard({ dish }) {
  return (
    <article class={styles.dish}>
      <div class={styles.dishMedia}>
        <Link class={styles.dishImgWrap} to={`/mon/${dish.id}`}>
          <img class={styles.dishImg} src={dish.image} alt={dish.name} />
        </Link>
        <div class={styles.dishBadge}>
          <span class={`material-symbols-outlined ${styles.dishStar}`}>star</span>
          {dish.rating}
        </div>
      </div>
      <div class={styles.dishBody}>
        <Link to={`/mon/${dish.id}`}>
          <h3 class={styles.dishName}>{dish.name}</h3>
        </Link>
        <p class={styles.dishDesc}>{dish.shortDescription}</p>
        <div class={styles.dishRow}>
          <span class={styles.dishPrice}>{formatPrice(dish.price)}</span>
          <Link class={styles.dishAdd} to={`/mon/${dish.id}`} aria-label={`Xem ${dish.name}`}>
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
