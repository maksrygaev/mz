import React, { FC, useEffect, useRef, useState } from 'react';
import { Carousel, Select } from 'antd';
import Link from 'next/link';
import { CarouselRef } from 'antd/lib/carousel';
import { useSelector } from 'react-redux';
import style from './Trending.module.scss';
import { OrdersServices } from 'core/services/orders';
import styles from '../../Common/Cards/index.module.scss';
import TrendingNowCard from 'components/Common/Cards/TrendingNowCard';
import useTranslation from 'next-translate/useTranslation';
import { TAppState } from '../../../core/store';
import { settings } from 'core/config/carousel';

const Trending: FC = () => {
  const [category, setCategory] = useState<string | number>('all');
  const [auctionOrders, setAuctionOrders] = useState([]);
  const categories = useSelector((state: TAppState) => state.categories.list);
  const { t } = useTranslation();

  const carouselRef = useRef<CarouselRef>(null);

  const loadAuctions = (): void => {
    carouselRef.current?.goTo(0);
    OrdersServices.search({
      type: 'Sale',
      sorting: { column: 'dateCreated', isAscending: true },
      status: "Opened",
      limitation: { count: 12 },
      productCategoryID: category !== 'all' ? category : null,
    })
      .then(rs => setAuctionOrders(rs))
      .catch(() => []);
  };

  useEffect(() => {
    loadAuctions();
  }, [category]);

  return (
    <section className="container arrow-top-shift">
      <div className={style.trending}>
        <div className={style.trending__title}>
          <h2 className={`${style.title} section_title`}>{t('common:trending now')}</h2>
          <div className={style.trending__select}>
            <Select defaultValue="all" onSelect={value => setCategory(value)}>
              <Select.Option value={'all'}>In All Categories</Select.Option>
              {categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div style={{justifyContent: 'space-between'}} className={styles.list}>
          <Carousel
            ref={carouselRef}
            {...settings}
            infinite={(Boolean(auctionOrders?.length >= 4) && auctionOrders.length % 2 === 0)}
            className={`carousel-responsive ${style.trending__carousel} carousel-trending`}
          >
            {auctionOrders.map((item: any) => (
              <Link key={item.id} href={`/product/${item.productID}`}>
                <div className={`${styles.card} ${styles.card__trending}`}>
                  <TrendingNowCard item={item} />
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Trending;
