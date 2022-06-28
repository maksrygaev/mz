import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Input, Select } from 'antd';
import { CollectionsServices } from 'core/services';
import ProductCard from '../Common/Cards/ProductCard';
import { useRouter } from 'next/router';
import { TProduct } from 'core/constants/types';
import style from './SearchCollection.module.scss';
import styles from '../Common/Cards/index.module.scss';

interface IProps {
  id: any;
  userID: any;
  user?: any;
  collection?: any;
}

const SearchCollection: FC<IProps> = ({ id, userID, user, collection }) => {
  const router = useRouter();
  const idUser = user?.id;
  const filterQueryName = router.query?.q;
  const [sorting, setSorting] = useState<any>({ column: 'productDateCreated', isAscending: false });
  const [fullWidth, setFullWidth] = useState('__fullwidth');
  const [searchList, setSearchList] = useState([]);
  const [activeItem, setActiveItem] = useState(filterQueryName?.toString() || 'all');
  const routeQueryName = router.query?.artworkname;
  const [value, setValue] = useState<string>(routeQueryName?.toString() || '');
  const [filteredArray, setFilteredArray] = useState<TProduct[]>([]);

  const handleSubmit = React.useCallback((value?: string) => {
    router.push({
      pathname: `/collection/${id}/`,
      query: value?.length ? { artworkname: value.toLowerCase() } : {},
    });
  }, []);

  useEffect(() => {
    const searchSortColumn = localStorage.getItem('searchCollectionSortColumn');
    let column = searchSortColumn || 'productDateCreated';
    column === 'none' ? (column = 'productDateCreated') : column;
    setSorting({ column, isAscending: false });
  }, []);

  const handleOnSort = (value: string) => {
    localStorage.setItem('searchCollectionSortColumn', value);
    setSorting({ column: value === 'none' ? 'productDateCreated' : value, isAscending: false });
  };

  useEffect(() => {
    if(collection) {
      const params = {
        collectionID: id,
        sorting,
        status: collection?.userID == user?.id ? null : 'Published',
      };
      CollectionsServices.listCollectionsProducts(params)
        .then(res => {
          setSearchList(res)
        })
        .catch(error => console.log('error', error));
    }
  }, [router.query, sorting, collection]);

  return (
    <section className="container market-arrow">
      {searchList.length > 0 ? (
        <div className={`${style.search__right}${fullWidth}`}>
          <div className="arrow-top">
            <div className={style.search}>
              <div className={style.search__title}>
                <h2 className={style.search__head}>
                  {searchList.length} {searchList.length === 1 ? 'result' : 'results'}
                </h2>
                <div className={style.search__buttons}>
                  <div className={style.inputWrapper}>
                    <Input
                      placeholder="Search"
                      className={`${style.input} input input-small-rounded-black-border`}
                      value={value}
                      onChange={e => setValue(e.target?.value)}
                      suffix={
                        <Button style={{ border: 'none' }} onClick={() => handleSubmit(value)}>
                          <img src="/icons/icon-loop.svg" alt="" />
                        </Button>
                      }
                    />
                  </div>
                  <Select
                    placeholder="Sort by"
                    defaultValue="Created date"
                    // style={}
                    className={style.select}
                    onSelect={handleOnSort}
                  >
                    <Select.Option value="productCountLikes">Likes</Select.Option>
                    <Select.Option value="productDateCreated">Created date</Select.Option>
                  </Select>
                </div>
              </div>
              <ul className={styles.list}>
                {searchList.map((artwork: any) => (
                  <Link key={artwork.productID} href={`/product/${artwork?.productID}`}>
                    <li className={`${styles.card} ${styles.card__artwork}`}>
                      <ProductCard artwork={artwork} editable={idUser === userID} />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {/*        <div className={style.search__load}>
          <Button
            className="btn btn-load-more"
          >
            Load more
          </Button>
        </div>*/}
        </div>
      ) : (
        <h3 className={style.search__nothing}>There are no any arts in this collection</h3>
      )}
    </section>
  );
};

export default SearchCollection;
