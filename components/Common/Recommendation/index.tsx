import { FC, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import { ProductsServices } from 'core/services/products';
import style from '../TopSellers/TopSellers.module.scss';
import styles from '../Cards/index.module.scss';
import Link from 'next/link';
import TrendingNowCard from '../Cards/TrendingNowCard';

const Recommendation: FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [recommendation, setRecommendation] = useState([]);

  const loadCount = () => {
    ProductsServices.productsCount({})
      .then(rs => setProductCount(rs))
      .catch(() => []);
  };
  const loadRecommendation = () => {
    ProductsServices.search({
      limitation: {
        count: 12,
        firstRow: Math.random() * (productCount - 12 - 1) + 1,
      },
    })
      .then(rs => setRecommendation(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadCount();
  }, []);
  useEffect(() => {
    loadRecommendation();
  }, [productCount]);

  return (
    <section className="container arrow-top">
      <div className={style.sellers}>
        <div className={style.sellers__title}>
          <h2>Recommendation</h2>
        </div>
        <ul className={`${styles.list} ${styles.cards__list}`}>
          <Carousel {...settings} className={`carousel-responsive ${style.sellers__carousel}`}>
            {recommendation.map((item: any) => (
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

export default Recommendation;
