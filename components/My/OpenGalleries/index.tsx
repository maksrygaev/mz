import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { UsersServices } from 'core/services';
import style from '../../Common/Cards/index.module.scss';
import GalleryCard from 'components/Common/Cards/MyGalleryCard';
import { TGallery } from 'core/constants/types';
import { useInfiniteFetch } from 'core/hooks';

type Props = {
  artist?: any;
};

const OpenGalleries:React.FC<Props> = ({ artist }) => {
  const [openGalleries, setOpenGalleries] = useState<TGallery[]>([]);

  const { data, loadMore, isFetching, hasNextPage } = useInfiniteFetch({
    service: UsersServices.galleries,
    count: 20,
    sorting: { column: 'galleryID', isAscending: false },
    filters: { userID: artist.id }
  });

  useEffect(() => {
    if(data?.length) setOpenGalleries(data)
  }, [data]);

  return (
    <div className="container">
      <h2 className={'section_title'}>Open galleries</h2>
      <ul className={style.list}>
        {openGalleries.map((gallery: TGallery) => (
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

export default OpenGalleries;
