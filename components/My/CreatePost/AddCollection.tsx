import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Element, scroller } from 'react-scroll';
import { notification, Form, Input, Button, Checkbox } from 'antd';
import { CardProps } from 'components/Common/Card/models';
import { CollectionsServices } from 'core/services';
import { TAppState } from 'core/store';
import AddCollectionModal from './AddCollectionModal';
import CollectionsCard from 'components/Common/Cards/CollectionsCard';
import styles from './createPost.module.scss';
import style from '../../Portfolio/PortfolioCollection/PortfoloioCollection.module.scss';
import cardStyles from '../../Common/Cards/index.module.scss';

interface Props {
  collections?: CardProps[];
  selectedCollections?: Array<any>;
  onChangeCollections: (value: []) => void;
  hideSearch?: boolean;
}
const initialValues = {
  name: '',
};

const AddCollection: FC<Props> = ({ selectedCollections, onChangeCollections, hideSearch }) => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [collectionList, setCollectionList] = useState([]);
  const [element, setElement] = useState<any | null>(null);
  const [value, setValue] = useState(selectedCollections);
  const [valueSearch, setValueSearch] = useState('');
  const [countCollection, setCountCollection] = useState(3);
  const [numbersOfCollection, setNumbersOfCollections] = useState(0);

  const loadCollections = (): void => {
    CollectionsServices.search({
      userID: user?.id,
      limitation: { count: countCollection, firstRow: 0 },
      sorting: {column: 'dateCreated', isAscending: false},
    })
      .then(rs => setCollectionList(rs))
      .catch(() => []);
  };

  const loadNumbersOfCollections = (): void => {
    CollectionsServices.search({
      userID: user?.id,
    })
      .then(rs => setNumbersOfCollections(rs.length))
      .catch(() => []);
  };

  useEffect(() => loadCollections(), [countCollection]);
  useEffect(() => loadNumbersOfCollections(), []);

  const onCreate = (): void => {
    setElement(initialValues);
  };

  const handleOnSuccess = (): void => {
    notification.success({ message: 'Collection created' });
    loadCollections();
    setElement(null);
  };
  const onChange = (e: any) => {
    setValue(e);
    onChangeCollections(e);
  };

  return (
    <div className={styles.tabContentBlock}>
      <div className={styles.searchCollection}>
        <div className={styles.collectionTitle}>Add to collection</div>
        <div className={`search-input ${style.explore__search}`}>
          {!hideSearch && (
            <Input
              style={{ width: 300 }}
              placeholder="Search"
              className={'input-small-rounded-black-border '}
              value={valueSearch}
              onChange={e => setValueSearch(e.target.value)}
              suffix={<img src="/icons/icon-loop.svg" alt="" />}
            />
          )}
        </div>
      </div>
      <Form.Item name="collection">
        <div className="radio-button-collection">
          <Checkbox.Group onChange={onChange} value={value}>
            <ul className={cardStyles.list}>
              <li onClick={onCreate} className={`${cardStyles.card} ${cardStyles.card__create}`}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img width={100} height={100} src="/images/create-element.png" alt="Create new collection" />
                </div>
                <p className={cardStyles.createNewTitle}>
                  Create
                  <br /> <span className={cardStyles.bottom__title}>new collection</span>
                </p>
              </li>
              {collectionList?.map((item: any) => {
                return (
                  <li className={cardStyles.card} key={item.id}>
                    <Checkbox value={item.id}>
                      <CollectionsCard collection={item} />
                    </Checkbox>
                  </li>
                );
              })}
            </ul>
          </Checkbox.Group>
        </div>
      </Form.Item>
      {collectionList.length !== 0 && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          {numbersOfCollection > 3 && (
            <>
              {numbersOfCollection >= countCollection ? (
                <Button className="btn-rounded-black" onClick={() => setCountCollection(countCollection + 4)}>
                  LOAD MORE
                </Button>
              ) : (
                <Button
                  className="btn-rounded-black"
                  onClick={() => {
                    setCountCollection(3);
                    scroller.scrollTo('collections', {
                      duration: 1000,
                      delay: 500,
                      smooth: true,
                      offset: -100,
                    });
                  }}
                >
                  HIDE
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {element && <AddCollectionModal element={element} onClose={() => setElement(null)} onSuccess={handleOnSuccess} />}
    </div>
  );
};

export default AddCollection;
