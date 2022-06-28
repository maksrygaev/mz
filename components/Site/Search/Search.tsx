import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Select, Spin } from 'antd';
import { ProductsServices } from 'core/services';
import HotCollectionCard from 'components/Common/Cards/HotCollectionCard';
import { useInfiniteFetch } from 'core/hooks/useInfiniteFetch';
import styles from '../../Common/Cards/index.module.scss';
import style from './Search.module.scss';
import { CloseOutlined } from '@ant-design/icons';

const Search: React.FC = () => {
  const router = useRouter();
  const tag = router.query?.tag || null;
  const q = router.query?.q || '';
  const [sorting, setSorting] = useState<any>({ column: router.query?.sort || 'countViews', isAscending: false });
  const [filters, setFilters] = useState<any>(() => {
    const initFilters: any = { status: 'Published' };
    if (q) initFilters.name = q;
    if (tag) initFilters.tag = tag;
    return initFilters;
  });

  useEffect(() => {
    setFilters({ ...filters, tag: tag, name: q });
  }, [router.query]);

  const { infiniteRef, data, isFetching, params, hasNextPage, amount } = useInfiniteFetch({
    service: ProductsServices.search,
    serviceCount: ProductsServices.productsCount,
    count: 20,
    sorting,
    filters,
    argReady: router.isReady,
  });

  const handleClearQueryParams = () => router.replace('/search');

  const handleSelectSort = (column: string): void => {
    const query: any = {};
    if (filters?.name) query.q = filters.name;
    if (tag) query.tag = tag;
    query.sort = column;
    router.push({ pathname: '/search', query });
    setSorting({ column, isAscending: false });
  };

  if (!router.isReady) return null;

  return (
    <section className="container container_search market-arrow">
      {Boolean(router.query?.tag) && (
        <div className={style.search__tag}>
          #{router.query?.tag}
          <div style={{ position: 'relative', right: '-13px' }}>
            <CloseOutlined onClick={handleClearQueryParams} />
          </div>
        </div>
      )}
      <div className={`${style.search__right}__fullwidth`}>
        <div className="arrow-top search-block">
          <div className={style.search}>
            <div className={style.search__title}>
              <h2>{`${amount} ${amount === 1 ? 'result' : 'results'}`}</h2>
              <Select
                defaultValue={router.query?.sort || sorting.column}
                onSelect={handleSelectSort}
                style={{ width: '325px', marginTop: '-25px' }}
              >
                <Select.Option value="countViews">Views</Select.Option>
                <Select.Option value="countOrders">Orders</Select.Option>
                <Select.Option value="countLikes">Likes</Select.Option>
              </Select>
            </div>
            <ul className={styles.list}>
              {data.map((item: any) => (
                <Link key={item.id} href={`/product/${item.id}`}>
                  <li className={`${styles.card}`}>
                    <HotCollectionCard item={item} />
                  </li>
                </Link>
              ))}
            </ul>
            {(isFetching || hasNextPage) && (
              <div ref={infiniteRef}>
                <Spin />
              </div>
            )}
            {!isFetching && params.limitation.firstRow === 0 && data.length === 0 && (
              <div className={style.search__plug}>
                <h3>No results were found for your search :(</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
