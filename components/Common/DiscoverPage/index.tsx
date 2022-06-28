import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import style from './Discover.module.scss';
import { OrdersServices } from 'core/services/orders';
import styles from '../Cards/index.module.scss';
import DiscoverCard from '../Cards/DiscoverCard';

export const DiscoverPage: FC = () => {
  const [auctionOrder, setAuctionOrder] = useState([]);

  const loadAuctions = (): void => {
    OrdersServices.search({
      type: 'Sale',
      sorting: { column: 'dateCreated', isAscending: 'false' },
      limitation: { count: 12 },
    })
      .then(rs => setAuctionOrder(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadAuctions();
  }, []);

  return (
    <section className="container">
      <div className={style.container}>
        <ul className={style.list}>
          {auctionOrder.map((item: any) => (
            <Link key={item.id} href={`/product/${item?.productID}`}>
              <li
                className={`${styles.card} ${styles.card__discover}`}
                style={{ minWidth: '100%' }}
              >
                <DiscoverCard item={item} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};
