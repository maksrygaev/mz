import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { CollectionsServices } from 'core/services';
import CollectionsCard from 'components/Common/Cards/CollectionsCard';
import style from '../PortfolioCollection/PortfoloioCollection.module.scss';
import styles from '../../Common/Cards/index.module.scss';
import { useInfiniteFetch } from 'core/hooks';

interface Props {
  artist?: any;
}

const DropsCollection: React.FC<Props> = ({ artist }) => {
  const [collectionList, setCollectionList] = useState([]);

  const { data, loadMore, isFetching, hasNextPage } = useInfiniteFetch({
    service: CollectionsServices.search,
    count: 20,
    filters: { 
      userID: artist?.id,
      status: 'Private',
      type: 'Drop'
    }
  });

  useEffect(() => {
    if(data.length) setCollectionList(data);
  }, [data]);

  return (
    <div className={style.explore}>
      <div className={style.explore__head} style={{ marginTop: '25px' }}>
        <h2 className={'section_title'}>Drops</h2>
      </div>
      {collectionList.length > 0 ? (
        <>
          <ul className={styles.list}>
            {collectionList?.map((collection: any) => (
              <Link href={`/my/collection/${collection.id}`} key={collection.id}>
                <li className={styles.card}>
                  <CollectionsCard key={collection.id} collection={collection} />
                </li>
              </Link>
            ))}
          </ul>
          {hasNextPage && (
            <div style={{textAlign: 'center'}}>
              <Button 
                onClick={loadMore}
                disabled={isFetching}
                className="btn btn-rounded-small-white-border-black-text ">
                Load more
              </Button>
            </div>
          )}
        </>
      ) : (
        <h3 style={{ textAlign: 'center' }}>You do not have ‘Drops’ collections yet</h3>
      )}
    </div>
  );
};

export default DropsCollection;
