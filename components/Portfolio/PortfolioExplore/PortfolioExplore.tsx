import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Button, Row, Col, Input, Spin } from 'antd';
import { useRouter } from 'next/router';
import { OrdersServices, ProductsServices, UsersServices } from 'core/services';
import style from './PortfoloioExplore.module.scss';
import ArtworksCard from 'components/Common/Cards/ArtworksCard';
import styles from '../../Common/Cards/index.module.scss';
import { useInfiniteFetch } from 'core/hooks';
import { useSelector } from 'react-redux';
import { TAppState } from '../../../core/store';

interface Props {
  artist?: any;
}

type queryType = 'All' | 'Draft' | 'Owned' | 'Moderation' | 'Stock';

const mapDataToProducts = (data: any) => {
  return data.map((item: any) => ({
    ...item,
    pid: item?.productID || item?.id,
    previewFilePath: item?.previewFilePath || item?.productPreviewFilePath || '',
    category: item?.productType || item?.type,
    name: item?.name || item?.productName || '',
    countLikes: item?.countLikes || item?.userCountLikes || 0,
    userName: item?.userName || 'Master',
    userPreviewFilePath: item?.userPreviewFilePath || '/icons/userpage/user-default.jpg',
  }));
};

const getService = (type: queryType) => {
  switch (type) {
    case 'Owned':
      return UsersServices.userProducts;
    case 'Stock':
      return OrdersServices.search;
    default:
      return ProductsServices.search;
  }
};

const getSorting = (type: queryType) => {
  return {
    column: type === 'Owned' || type === 'Stock' ? 'productID' : 'id',
    isAscending: false,
  };
};

const getFilters = (type: queryType, searchStr: string, userID: number) => {
  const filters: any = { userID };
  if (searchStr) {
    const nameField = type === 'Owned' || type === 'Stock' ? 'productName' : 'name';
    filters[nameField] = searchStr;
  }
  if (type === 'Moderation' || type === 'Draft') {
    filters.status = type;
  }
  filters.service = type;
  return filters;
};

const PortfolioExplore: React.FC<Props> = ({ artist }) => {
  const router = useRouter();
  const [products, setProducts] = useState<any>([]);
  const [searchStr, setSearchStr] = useState<any>(router.query?.q || '');
  const activeMenuItem: any = router.query?.t || 'All';
  const name: any = router.query?.q || '';
  const filters = getFilters(activeMenuItem, name, artist.id);
  const user = useSelector((state: TAppState) => state.session.user);

  const handleNavigateToArtworksPage = (query: any) => {
    if (router.query?.id) query.id = artist.id;
    if (router.query?.hash) query.hash = artist.hash;
    router.push({ pathname: router.pathname, query });
  };

  const handleOnClickMenuItem = (event: any) => {
    const query: any = {};
    if (router.query?.q) query.q = router.query.q;
    query.t = event.key;
    handleNavigateToArtworksPage(query);
  };

  const handleSubmitSearchInput = () => {
    const query: any = {};
    if (searchStr) query.q = searchStr;
    if (router.query?.t) query.t = router.query.t;
    handleNavigateToArtworksPage(query);
  };

  const { infiniteRef, data, isFetching, params, hasNextPage } = useInfiniteFetch({
    service: getService(activeMenuItem),
    count: 20,
    sorting: getSorting(activeMenuItem),
    filters,
  });

  useEffect(() => {
    setProducts(mapDataToProducts(data));
  }, [data]);

  return (
    <section className="container">
      <div className={style.explore}>
        <div className={style.explore__head}>
          <Row align={'middle'} className={style.header} justify={'space-between'}>
            <Col>
              <div className={style.explore__head__wrap}>
                <h2 className={'section_title'}>Artworks</h2>
              </div>
            </Col>
            <Col>
              <Input
                placeholder="Search"
                className={`${style.input} input-small-rounded-black-border`}
                value={searchStr}
                onKeyDown={e => (e.key === 'Enter' ? handleSubmitSearchInput() : null)}
                onChange={e => setSearchStr(e.target?.value)}
                suffix={
                  <Button style={{ border: 'none' }} onClick={() => handleSubmitSearchInput()}>
                    <img src="/icons/icon-loop.svg" alt="" />
                  </Button>
                }
              />
            </Col>
            <Col className={style.col_menu} style={router.query?.id ? { textAlignLast: 'right' } : {}}>
              <Menu disabledOverflow mode="horizontal" onClick={handleOnClickMenuItem} className={`profile_menu`}>
                <Menu.Item key="All">
                  <Button
                    style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}
                    className={`${activeMenuItem == 'All' ? 'menu__item-active' : 'menu__item'}`}
                  >
                    All
                  </Button>
                </Menu.Item>
                <Menu.Item key="Draft">
                  <Button className={`${activeMenuItem == 'Draft' ? 'menu__item-active' : 'menu__item'}`}>Draft</Button>
                </Menu.Item>
                <Menu.Item key="Owned">
                  <Button className={`${activeMenuItem == 'Owned' ? 'menu__item-active' : 'menu__item'}`}>Owned</Button>
                </Menu.Item>
                <Menu.Item key="Moderation">
                  <Button className={`${activeMenuItem == 'Moderation' ? 'menu__item-active' : 'menu__item'}`}>
                    Moderation
                  </Button>
                </Menu.Item>
                <Menu.Item key="Stock">
                  <Button
                    style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}
                    className={`${activeMenuItem == 'Stock' ? 'menu__item-active' : 'menu__item'}`}
                  >
                    In stock
                  </Button>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </div>
        <ul className={styles.list}>
          {user?.id === artist.id && !(!isFetching && params.limitation.firstRow === 0 && data.length === 0) && (
            <Link href="/my/create">
              <li className={`${styles.card} ${styles.card__artwork} ${styles.card__create}`}>
                <div className={styles.create_image_wrapper}>
                  <img src="/images/create-element.png" alt="Create new collection" />
                </div>
                <p className={styles.createNewTitle}>
                  Create
                  <br />
                  <span className={styles.bottom__title}> new artwork</span>
                </p>
              </li>
            </Link>
          )}
          {products.map((artwork: any) => (
            <Link key={artwork.id} href={`/product/${artwork?.pid}`}>
              <li className={`${styles.card} ${styles.card__artwork}`}>
                <ArtworksCard artwork={artwork} />
              </li>
            </Link>
          ))}
          {!isFetching && params.limitation.firstRow === 0 && data.length === 0 && (
            <h1>No results were found for your search :(</h1>
          )}
        </ul>
        {(isFetching || hasNextPage) && (
          <div className={'loading-spinner'} ref={infiniteRef}>
            <Spin />
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioExplore;
