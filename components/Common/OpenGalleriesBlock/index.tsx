import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Link from 'next/link';
import style from '../Cards/index.module.scss';
import { TGallery } from '../../../core/constants/types';
import GalleryCard from '../Cards/MyGalleryCard';
import { GalleriesServices } from '../../../core/services';
import useTranslation from 'next-translate/useTranslation';

const OpenGalleriesBlock = () => {
  const [galleries, setGalleries] = useState<TGallery[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    GalleriesServices.search({
      availability: 'Opened',
      status: 'Approved',
      limitation: { count: 4, firstRow: 0 },
      sorting: { column: 'dateCreated', isAscending: false },
    })
      .then(res => setGalleries(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <section className="container">
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <h2 className={'section_title'}>{t('common:open galleries')}</h2>
        </Col>
        <Col>
          <Link href={'/galleries'}>
            <Button className="btn btn-see-all">{t('common:see all')}</Button>
          </Link>
        </Col>
      </Row>
      <ul style={{justifyContent: "space-between"}} className={style.list}>
        {galleries.map((gallery: TGallery) => (
          <Link key={gallery?.id} href={`/gallery/${gallery.id}`}>
            <li className={`${style.card} ${style.card__gallery}`}>
              <GalleryCard gallery={gallery} />
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default OpenGalleriesBlock;
