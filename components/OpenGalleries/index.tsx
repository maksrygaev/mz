import React, { FC } from 'react';
import {Button, Spin} from 'antd';
import Link from 'next/link';
import {useRouter} from "next/router";
import {CloseOutlined} from "@ant-design/icons";
import { GalleriesServices } from 'core/services/galleries';
import style from '../../components/Common/Cards/index.module.scss';
import GalleryCard from 'components/Common/Cards/MyGalleryCard';
import { TGallery } from 'core/constants/types';
import {useInfiniteFetch} from "../../core/hooks";
import styles from './index.module.scss';

const OpenGalleries: FC = () => {
  const router = useRouter();
  const tag = router.query?.tag;
  const { data, isFetching, infiniteRef, hasNextPage } = useInfiniteFetch({
    service: GalleriesServices.search,
    count: 20,
    sorting: { column: 'dateCreated', isAscending: false },
    filters: {
      availability: 'Opened',
      status: 'Approved',
      tag: tag ? tag : null,
    },
  });

  const handleClearQueryParams = () => router.replace('/galleries');

  return (
    <section className="container">
      <div style={{display: 'flex'}}>
        <h2 className={'section_title'}>Open galleries</h2>
      </div>
      {Boolean(tag) && (
        <div className={styles.tag}>
          #{tag}
          <div style={{position: 'relative', right: '-13px'}}>
            <CloseOutlined onClick={handleClearQueryParams} />
          </div>
          {/*<Button onClick={handleClearQueryParams} shape="circle" icon={<CloseOutlined onClick={handleClearQueryParams} /> />*/}
        </div>
      )}
      <ul className={style.list}>
        {data.map((gallery: TGallery) => (
          <Link key={gallery?.id} href={`/gallery/${gallery.id}`}>
            <li className={`${style.card} ${style.card__gallery}`}>
              <GalleryCard gallery={gallery} />
            </li>
          </Link>
        ))}
      </ul>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
    </section>
  );
};

export default OpenGalleries;
