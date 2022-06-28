import React, {FC, useEffect, useRef} from 'react';
import style from "../Sample.module.scss";
import {Button, Carousel} from "antd";
import {settings} from "../../../../core/config/carousel";
import Link from "next/link";
import styles from "../../../Common/Cards/index.module.scss";
import MarketplaceCard from "../../../Common/Cards/MarketplaceCard";
import {useRouter} from "next/router";
import {CarouselRef} from "antd/lib/carousel";

interface IProps {
  data: any;
  type: string;
  title: string;
}

const MarketPlaceCarousel:FC<IProps> = ({data, type, title}) => {
  const carouselRef = useRef<CarouselRef>(null);
  const router = useRouter();
  const handleSubmit = (type: string): void => {
    router.push(type);
  };

  useEffect(() => {
    carouselRef.current?.goTo(0);
  }, [data])

  if(!data.length) return null;

  return (
    <div className="arrow-see-all" style={{ paddingTop: '16px' }}>
      <div className={style.sample}>
        <div className={style.sample__title}>
          <h2 className={'section_title'}>{title}</h2>
          <Button onClick={() => handleSubmit(type)} className="btn btn-see-all">
            See all
          </Button>
        </div>
        <Carousel
          ref={carouselRef}
          {...settings}
          infinite={data.length >= 4}
          initialSlide={0}
          className={`marketplace-carousel carousel-responsive ${style.sample__carousel}`}
        >
          {data.map((item: any) => (
            <Link key={item.id} href={`/${item.token ? 'product' : 'gallery'}/${item.id}`}>
              <div
                className={`${styles.card} ${styles.card__artwork} ${styles.card__carousel} ${styles.card__marketplace}`}
              >
                <MarketplaceCard item={item} />
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MarketPlaceCarousel;
