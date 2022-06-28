import { FC, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import style from './OpenMarketGallery.module.scss';
import { OrdersServices } from 'core/services/orders';
import styles from '../Common/Cards/index.module.scss';
import Link from 'next/link';
import LiveAuctionCard from 'components/Common/Cards/LiveAuctionCard';

const OpenMarketGalleryAuction = () => {
  const [auctionOrder, setAuctionOrder] = useState([]);

  const current: any = new Date();

  const loadAuctions = () => {
    OrdersServices.search({
      type: 'Auction',
      sorting: { column: 'dateCreated', isAscending: 'false' },
      limitation: { count: 12 },
    })
      .then(rs => setAuctionOrder(rs.filter((item: any) => item.dateValid > Date.parse(current))))
      .catch(() => []);
  };
  useEffect(() => {
    loadAuctions();
  }, []);

  return (
    <section className="container arrow-top">
      <div className={style.trending}>
        <div className={style.trending__title}>
          <h2>Live auction</h2>
        </div>
        <ul className={`${styles.list} ${styles.cards__list}`}>
          <Carousel {...settings} className={`carousel-responsive ${style.sellers__carousel}`}>
            {auctionOrder.map((item: any) => (
              <Link key={item.id} href={`/product/${item.productID}`}>
                <li className={`${styles.card} ${styles.card__trending}`}>
                  <LiveAuctionCard item={item} />
                </li>
              </Link>
            ))}
          </Carousel>
        </ul>
      </div>
    </section>
  );
};

export default OpenMarketGalleryAuction;
