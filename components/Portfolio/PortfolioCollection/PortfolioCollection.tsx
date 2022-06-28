import React, { useEffect, useState } from 'react';
import { Button, Modal, notification, Spin } from 'antd';
import { CollectionsServices } from 'core/services';
import { useRouter } from 'next/router';
import AddCollectionModal from '../../My/CreatePost/AddCollectionModal';
import Link from 'next/link';
import CollectionsCard from 'components/Common/Cards/CollectionsCard';
import styles from '../../Common/Cards/index.module.scss';
import { useInfiniteFetch } from 'core/hooks';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';

const initialValues = {
  name: '',
};

interface Props {
  isMyCollection?: boolean;
  artist?: any;
}

const PortfolioCollection: React.FC<Props> = ({  isMyCollection, artist }) => {
  const router = useRouter();
  const [collectionList, setCollectionList] = useState([]);
  const [element, setElement] = useState<any | null>(null);
  const user = useSelector((state: TAppState) => state.session.user);

  const { data, loadMore, isFetching, infiniteRef, hasNextPage, reLoad } = useInfiniteFetch({
    service: CollectionsServices.search,
    count: 20,
    sorting: {column: 'dateCreated', isAscending: false},
    filters: { userID: artist.id }
  });

  useEffect(() => {
    if(data.length > 0) setCollectionList(data)
  }, [data]);

  const onCreate = (): void => {
    setElement(initialValues);
  };

  const handleOnSuccess = (): void => {
    notification.success({ message: 'Collection created' });
    setElement(null);
    reLoad();
  };

  return (
    <section className="container">
      <div>
        <h2 className={'section_title'}>collections</h2>
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
            <Link key={collection?.id} href={`${isMyCollection ? `/my` : ''}/collection/${collection.id}`}>
              <li className={styles.card}>
                <CollectionsCard collection={collection} />
              </li>
            </Link>
          ))}
        </ul>
        {(router.pathname === '/my/collections' && hasNextPage) && (
          <div className={'loading-spinner'}>
            <Button 
              onClick={loadMore}
              disabled={isFetching}
              className="btn btn-rounded-small-white-border-black-text ">
              Load more
            </Button>
          </div>
        )}
        {router.pathname !== '/my/collections' && (isFetching || hasNextPage) && (
          <div className={'loading-spinner'} ref={infiniteRef}>
            <Spin />
          </div>
        )}
      </div>
      {element && (
        <AddCollectionModal onClose={() => setElement(null)} element={element} onSuccess={handleOnSuccess} />
      )}
    </section>
  );
};

export default PortfolioCollection;
