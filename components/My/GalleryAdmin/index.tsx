import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Artworks from './Artworks/Artworks';
import Artists from './Artists/Artists';
import style from './galleryAdmin.module.scss';
import ArtistWorkplace from '../ArtistWorkplace';
import { GalleriesServices } from '../../../core/services';
import { TAppState } from '../../../core/store';
import { TGallery } from '../../../core/constants/types';

const GalleryAdministration: React.FC = () => {
  const router = useRouter();
  const [section, setSection] = useState('Artworks');
  const user = useSelector((state: TAppState) => state.session.user);
  const [gallery, setGallery] = useState<TGallery | null>(null);

  const galleryID = Number(router?.query?.id) || 0;

  useEffect(() => {
    GalleriesServices.get(galleryID)
      .then(res => setGallery(res))
      .catch(() => []);
  }, []);

  if (!gallery) return null;

  if (gallery?.userID != user?.id) router.push(`/gallery/${galleryID}`);

  return (
    <div className={style.gallery}>
      <h2 className={style.title}>Gallery admin workspace</h2>
      <div className={style.button__container}>
        <Button
          className={
            section === 'Artworks'
              ? `${style.btnMargin} btn btn-rounded-small-black-border-white-text`
              : `${style.btnMargin} btn btn-rounded-small-white-border-black-text`
          }
          onClick={() => setSection('Artworks')}
        >
          Artworks
        </Button>
        <Button
          className={
            section === 'Artists'
              ? `${style.btnMargin} btn btn-rounded-small-black-border-white-text`
              : `${style.btnMargin} btn btn-rounded-small-white-border-black-text`
          }
          onClick={() => setSection('Artists')}
        >
          Artists
        </Button>
        <Button
          className={
            section === 'My artworks'
              ? `${style.btnMargin} btn btn-rounded-small-black-border-white-text`
              : `${style.btnMargin} btn btn-rounded-small-white-border-black-text`
          }
          onClick={() => setSection('My artworks')}
        >
          My artworks
        </Button>
      </div>
      {section === 'Artworks' && <Artworks galleryID={galleryID} />}
      {section === 'Artists' && <Artists galleryID={galleryID} />}
      {section === 'My artworks' && <ArtistWorkplace gallery={gallery} />}
    </div>
  );
};

export default GalleryAdministration;
