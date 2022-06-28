import { FC } from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';
import style from './../TopSlider/TopSlider.module.scss';

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

interface IProps {
  data: any;
}

const TopSliderDrops: FC<IProps> = ({ data }) => {
  return (
    <section className="container top-slider">
      <div className={style.topslider}>
        <div className={style.topslider__wrapper}>
          <Carousel {...settings} className={style.topslider__carousel}>
            {data.map((item: any) => {
              return (
                <div className={style.topslider__card} key={item.id}>
                  <div className={style.topslider__image} style={{ background: `url(${item?.previewFilePath})` }}>
                    <Link href={`/collection/${item.id}`}>
                      <a></a>
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

export default TopSliderDrops;
