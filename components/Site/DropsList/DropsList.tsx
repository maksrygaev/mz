import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Carousel, Popover } from 'antd';
import { settings } from 'core/config/carousel';
import style from './DropsList.module.scss';
import styles from '../../Common/Cards/index.module.scss';
import DropsCard from 'components/Common/Cards/DropsCard';

interface IProps {
  data: any;
}

const DropsList: FC<IProps> = ({ data }) => {
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(()=> {
    if (window.innerWidth < 993) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
    window.addEventListener('resize', ()=> {
      if (window.innerWidth < 993) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    })
  }, [])

  return (
    <section className="container market-arrow">
      <div>
        {data.filter((item: any) => item?.products.length > 0).map((itm: any) => {
          return (
            <div className="arrow-top" key={itm.id}>
              <div className={style.sample}>
                <div className={style.sample__title}>
                  <h2 className={'section_title drop-title'}>
                    {mobileSize ? (
                      <>
                        {itm.name.substr(0, 15)}
                        {itm.name.length >= 15 && (
                          <Popover content="" title={<div>{itm.name}</div>}>
                            ...
                          </Popover>
                        )}
                      </>
                    ) : (
                      <>
                      {itm.name}
                      </>
                    )}
                  </h2>
                  <Link href={`/collection/${itm.id}`}>
                    <Button className="btn btn-see-all">See all</Button>
                  </Link>
                </div>
                <ul style={{paddingLeft: 12}} className={styles.list}>
                  <Carousel {...settings} className={`carousel-responsive drops-carousel ${style.sample__carousel}`}>
                    {itm.products.filter((item: any) => item.productStatus === 'Published').map((item: any) => (
                      <Link href={`/product/${item.productID}`} key={item.id}>
                        <li
                          className={`${styles.card} ${styles.card__artwork} ${styles.card__carousel} ${styles.card__marketplace}`}
                        >
                          <DropsCard item={item} />
                        </li>
                      </Link>
                    ))}
                  </Carousel>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DropsList;
