import { FC, useState, useEffect } from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';
import style from './TopSlider.module.scss';
import { request } from 'core/helpers';

export const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1360,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TopSlider: FC = () => {
  const [galleryData, setGalleryData]: any = useState([]);
  const [collectionData, setCollectionData]: any = useState([]);

  useEffect(() => {
    galleryDataFunc();
    collectionDataFunc();
  }, []);

  const galleryDataFunc = async () => {
    const data = {
      limitation: { count: 2, firstRow: 0 },
      sorting: { column: 'dateCreated', isAscending: 'false' },
      pinned: true,
      availability: 'Opened',
    };
    const galleryData = await request({ url: `/galleries/search`, data });
    setGalleryData(galleryData);
  };

  const collectionDataFunc = async () => {
    const data = {
      limitation: { count: 2, firstRow: 0 },
      sorting: { column: 'dateCreated', isAscending: 'false' },
      pinned: true,
    };
    const collectionData = await request({ url: `/collections/search`, data });
    setCollectionData(collectionData);
  };

  const mergedData = [...galleryData, ...collectionData].sort(() => Math.random() - 0.5);

  return (
    <section className="container top-slider">
      <div className={style.topslider}>
        <div className={style.topslider__wrapper}>
          <Carousel {...settings} className={style.topslider__carousel}>
            {mergedData.map((item: any) => {
              return (
                <div className={style.topslider__card} key={item.id}>
                  <div className={style.topslider__image} style={{ background: `url(${item?.previewFilePath})` }}>
                    {/* eslint-disable-next-line no-prototype-builtins */}
                    <Link href={!Object(item).hasOwnProperty('availability') ? `/collection/${item.id}` : `/gallery/${item.id}`}>
                      <a>{''}</a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TopSlider;
