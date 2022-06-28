import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import { ProductsServices } from 'core/services/products';
import style from './TopSellers.module.scss';
import TrendingNowCard from '../Cards/TrendingNowCard';
import styles from '../Cards/index.module.scss';

const TopSellers: FC = () => {
  const [sellers, setSellers] = useState([]);

  const loadSellers = () => {
    ProductsServices.search({
      sorting: { column: 'countOrders', isAscending: 'false' },
      limitation: { count: 12 },
    })
      .then(rs => setSellers(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadSellers();
  }, []);

  return (
    <section className="container arrow-top">
      <div className={style.sellers}>
        <div className={style.sellers__title}>
          <h2>Top sales</h2>
        </div>
        <ul className={`${styles.list} ${styles.cards__list}`}>
          <Carousel {...settings} className={`carousel-responsive ${style.sellers__carousel}`}>
            {sellers.map((item: any) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <li className={`${styles.card} ${styles.card__trending}`}>
                  <TrendingNowCard item={item} />
                </li>
              </Link>
            ))}
          </Carousel>
        </ul>
      </div>
    </section>
  );
};

export default TopSellers;
