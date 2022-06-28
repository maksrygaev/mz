import React, { FC } from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';
import { settings } from 'core/config/carousel';
import style from './AuctionMore.module.scss';
import styles from '../Common/Cards/index.module.scss';
import ArtworksCard from 'components/Common/Cards/ArtworksCard';

interface IProps {
  data: any;
}

const AuctionMore: FC<IProps> = ({ data }) => {
  return (
    <section className="container arrow-top">
      <div className={style.trending}>
        <h2 className={'section_title'}>More for this artist</h2>
        <ul className={`${styles.list} ${styles.cards__list}`}>
          <Carousel {...settings} className={`carousel-responsive ${style.trending__carousel}`}>
            {data.map((item: any) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <li className={`${styles.card} ${styles.card__artwork} ${styles.card__carousel} ${styles.card__live}`}>
                  <ArtworksCard artwork={item} />
                </li>
              </Link>
            ))}
          </Carousel>
        </ul>
      </div>
    </section>
  );
};

export default AuctionMore;
