import React, {FC, useState} from 'react';
import style from './Sample.module.scss';
import MarketPlaceCarousel from "./CarouselComponent";
import {TGallery, TProduct} from "../../../core/constants/types";

interface IProps {
  createdProducts?: TProduct[];
  popularProducts?: TProduct[];
  likedProducts?: TProduct[];
  likedGalleries?: TGallery[];
}

const Sample: FC<IProps> = ({ createdProducts, likedGalleries, popularProducts, likedProducts }) => {
  const [fullWidth] = useState('__fullwidth');

  return (
    <section className="container market-arrow">
      <div className={`${style.sample__right}${fullWidth}`}>
        <MarketPlaceCarousel data={createdProducts} title={"Top sellers"} type={'/search?=&sort=countOrders'} />
        <MarketPlaceCarousel data={popularProducts} title={"Trending artists"} type={'/search?=&sort=countLikes'} />
        <MarketPlaceCarousel data={likedProducts} title={"Featured artists"} type={'/search?=&sort=countViews'} />
        <MarketPlaceCarousel data={likedGalleries} title={"Featured gallery"} type={'/galleries'} />
      </div>
    </section>
  );
};

export default Sample;
