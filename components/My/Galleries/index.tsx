import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import {useRouter} from "next/router";
import { GalleriesServices } from 'core/services/galleries';
import style from '../../Common/Cards/index.module.scss';
import GalleryCard from 'components/Common/Cards/MyGalleryCard';
import { TGallery } from 'core/constants/types';
import { useInfiniteFetch } from 'core/hooks';

type Props = {
  artist?: any;
};

const Galleries:React.FC<Props> = ({ artist }) => {
  const router = useRouter();
  const [galleries, setGalleries] = useState<TGallery[]>([]);

  const { data, loadMore, isFetching, hasNextPage } = useInfiniteFetch({
    service: GalleriesServices.search,
    count: 20,
    sorting: {column: 'dateCreated', isAscending: false},
    filters: { userID: artist.id }
  });

  useEffect(() => {
    if(data.length) setGalleries(data)
  }, [data]);

  return (
    <div className="container">
      <h2 className={'section_title'}>Galleries</h2>
      <ul className={style.list}>
        {router.pathname === '/my/galleries' && (
          <Link href={'/my/create-gallery'}>
            <li className={`${style.card} ${style.card__create}`}>
              <div className={style.create_image_wrapper}>
                <img src="/images/create-element.png" alt="Create new collection" />
              </div>
              <p className={style.createNewTitle}>
                Create
                <br /> <span className={style.bottom__title}>new gallery</span>
              </p>
            </li>
          </Link>
        )}
        {galleries.map((gallery: TGallery) => (
          <Link key={gallery?.id} href={`/gallery/${gallery.id}`}>
            <li className={style.card}>
              <GalleryCard showStatus gallery={gallery} />
            </li>
          </Link>
        ))}
      </ul>
      {hasNextPage && (
        <div className={'loading-spinner'}>
          <Button
            onClick={loadMore}
            disabled={isFetching}
            className="btn btn-rounded-small-white-border-black-text ">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Galleries;
