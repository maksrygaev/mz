import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, Row } from 'antd';
import { GalleriesServices } from 'core/services/galleries';
import GalleryCard from 'components/Common/Cards/MyGalleryCard';
import { TGallery } from 'core/constants/types';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import style from '../../Common/Cards/index.module.scss';

type Props = {
  artist?: any;
};

const GalleriesBlock:React.FC<Props> = ({artist}) => {
  const router = useRouter();
  const [galleries, setGalleries] = useState<TGallery[]>([]);
  const user = useSelector((state: TAppState) => state.session.user);

  useEffect(() => {
    const params = {
      userID: artist.id,
      limitation: { count: user?.id === artist.id ? 3 : 4, firstRow: 0},
      sorting: { column: 'dateCreated', isAscending: false }
    }
    GalleriesServices.search(params)
      .then((res: TGallery[]) => setGalleries(res))
      .catch(error => console.log(error));
  }, []);

  const path = router.query?.id ? `/user/${router.query?.id}/galleries` : router.query?.hash ? `/artist/${router.query?.hash}/galleries` : '/my/galleries';

  return (
    <div className="container">
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <h2 className={'section_title'}>Galleries</h2>
        </Col>
        <Col>
          <Link href={path}>
            <Button className="btn btn-see-all">See all</Button>
          </Link>
        </Col>
      </Row>
      <ul className={style.list}>
        {user?.id === artist.id && (
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
    </div>
  );
};

export default GalleriesBlock;
