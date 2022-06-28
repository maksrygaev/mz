import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import useTranslation from 'next-translate/useTranslation';
import style from './EditionsLive.module.scss';
import { OrdersServices } from 'core/services/orders';
import LiveNowCard from 'components/Common/Cards/LiveNowCard';
import useFetch from 'core/hooks/useFetch';
import styles from '../../Common/Cards/index.module.scss';

const EditionsLive: React.FC = () => {
  const { fetch } = useFetch();
  const [auctionOrders, setAuctionOrders] = useState([]);
  const { t } = useTranslation();
  const loadAuctions = () => {
    fetch(
      OrdersServices.search,
      {
        type: 'Auction',
        sorting: { column: 'dateCreated', isAscending: 'false' },
        limitation: { count: 12 },
        status: 'Opened',
      },
      response => setAuctionOrders(response.filter((item: any) => item.dateValid > new Date())),
      () => setAuctionOrders([]),
    );
  };

  useEffect(() => {
    loadAuctions();
  }, []);

  return (
    <section className="container arrow-top">
      <div className={style.trending}>
        <div className={style.trending__title}>
          <h2 className={'section_title'}> {t('common:open editions')}</h2>
        </div>
        <ul style={{justifyContent: 'space-between'}} className={`${styles.list} ${styles.cards__list}`}>
          <Carousel
            {...settings}
            className={`carousel-responsive carousel-edition ${style.trending__carousel}`}
          >
            {auctionOrders.map((order: any) => (
              <Link key={order.id} href={`/product/${order.productID}`}>
                <li className={`${styles.card} ${styles.card__artwork} ${styles.card__carousel}`}>
                  <LiveNowCard order={order} />
                </li>
              </Link>
            ))}
          </Carousel>
        </ul>
      </div>
    </section>
  );
};

export default EditionsLive;
