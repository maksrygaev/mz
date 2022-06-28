import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, notification, Row } from 'antd';
import CollectionsCard from 'components/Common/Cards/CollectionsCard';
import { CollectionsServices } from 'core/services';
import AddCollectionModal from '../CreatePost/AddCollectionModal';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import style from '../../Portfolio/PortfolioCollection/PortfoloioCollection.module.scss';
import styles from '../../Common/Cards/index.module.scss';

interface Props {
  artist?: any;
}

const initialValues = {
  name: '',
};

const CollectionsBlock: React.FC<Props> = ({ artist }) => {
  const router = useRouter();
  const [collectionList, setCollectionList] = useState([]);
  const [element, setElement] = useState<any | null>(null);
  const user = useSelector((state: TAppState) => state.session.user);

  const loadCollections = (): void => {
    CollectionsServices.search({
      userID: artist?.id,
      limitation: {count: user?.id === artist.id ? 3 : 4},
      sorting: { column: 'dateCreated', isAscending: false },
    })
    .then(res => setCollectionList(res))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const onCreate = (): void => {
    setElement(initialValues);
  };

  const handleOnSuccess = (): void => {
    notification.success({ message: 'Collection created' });
    loadCollections();
    setElement(null);
  };

  const path = router.query.id ? `/user/${router.query.id}/collections` : router.query?.hash ? `/artist/${router.query?.hash}/collections` : '/my/collections';

  return (
    <section className="container">
      <div className={style.explore}>
        <Row align={'middle'} justify={'space-between'}>
          <Col>
            <h2 className={'section_title'}>collections</h2>
          </Col>
          <Col className={style.explore__navigation}>
            <Link href={path}>
              <Button className="btn btn-see-all">
                See all
              </Button>
            </Link>
          </Col>
        </Row>
        <ul className={styles.list}>
          {user?.id === artist.id && (
          <li onClick={onCreate} className={`${styles.card} ${styles.card__create}`}>
            <div className={styles.create_image_wrapper}>
              <img src="/images/create-element.png" alt="Create new collection" />
            </div>
            <p className={styles.createNewTitle}>
              Create
              <br /> <span className={styles.bottom__title}>new collection</span>
            </p>
          </li>
          )}
          {collectionList?.map((collection: any) => (
            <Link key={collection?.id} href={`/collection/${collection.id}`}>
              <li className={styles.card}>
                <CollectionsCard collection={collection} />
              </li>
            </Link>
          ))}
        </ul>
        {element && (
          <AddCollectionModal onClose={() => setElement(null)} element={element} onSuccess={handleOnSuccess} />
        )}
      </div>
    </section>
  );
};

export default CollectionsBlock;