import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import { CollectionsServices } from 'core/services';
import HotCollectionCard from '../Cards/HotCollectionCard';
import style from '../TopSellers/TopSellers.module.scss';
import styles from '../Cards/index.module.scss';

const HotCollections: FC = () => {
  const [collections, setCollections] = useState([]);

  const loadSellers = () => {
    CollectionsServices.search({
      sorting: { column: 'countLikes', isAscending: 'false' },
      limitation: { count: 12 },
    })
      .then(rs => setCollections(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadSellers();
  }, []);

  return (
    <section className="container arrow-top">
      <div className={style.sellers}>
        <div className={style.sellers__title}>
          <h2>Hot Collections</h2>
        </div>
        <ul className={`${styles.list} ${styles.cards__list}`}>
          <Carousel {...settings} className={`carousel-responsive ${style.sellers__carousel}`}>
            {collections.map((item: any) => (
              <Link key={item.id} href={`/collection/${item.id}`}>
                <li className={`${styles.card} ${styles.card__trending}`}>
                  <HotCollectionCard item={item} />
                </li>
              </Link>
            ))}
          </Carousel>
        </ul>
      </div>
    </section>
  );
};

export default HotCollections;
