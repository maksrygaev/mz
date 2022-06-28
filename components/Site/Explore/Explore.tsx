import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Button, Select } from 'antd';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { ProductsServices } from 'core/services';
import { useInfiniteFetch } from 'core/hooks/useInfiniteFetch';
import TrendingNowCard from 'components/Common/Cards/TrendingNowCard';
import styles from '../../Common/Cards/index.module.scss';
import style from './Explore.module.scss';
import useTranslation from 'next-translate/useTranslation';

const Explore: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [sorting, setSorting] = useState<any>({ column: 'dateCreated', isAscending: false });
  const rates = useSelector((state: TAppState) => state.rates);
  const [products, setProducts] = useState<any[]>([]);
  const categoriesList = useSelector((state: TAppState) => state.categories.list);
  const { t } = useTranslation();
  const handleItem = (e: any) => setActiveItem(e.key);

  const { infiniteRef, data, loadMore } = useInfiniteFetch({
    service: ProductsServices.search,
    count: 8,
    sorting,
    filters: {
      status: 'Published',
      isAscending: 'false',
      ...(activeItem != 0 ? { categoryID: activeItem } : {}),
    },
    ready: Boolean(sorting),
  });

  useEffect(() => {
    setProducts(
      data.map((item: any) => {
        return {
          ...item,
          priceCurrency: rates.isLoaded && item?.minimalPrice ? item.minimalPrice * rates.rates.usd : 0,
        };
      }),
    );
  }, [data, rates]);

  const handleOnSort = (value: string) => {
    setSorting({ column: value, isAscending: false });
  };

  useEffect(() => {
    if (activeItem == 0) setProducts(data);
    else {
      setProducts(
        data.filter((item: any) => {
          return item.cathegory == activeItem;
        }),
      );
    }
  }, [activeItem]);

  return (
    <section className="container">
      <div className={style.explore}>
        <h2 className={'section_title'}>{t('common:explore')}</h2>
        <div className={style.explore__head}>
          <Menu disabledOverflow mode="horizontal" onClick={e => handleItem(e)} className={style.menu}>
            <Menu.Item key={0}>
              <Button className={activeItem == 0 ? 'menu__item-active' : 'menu__item'}>
                {t('common:all categories')}
              </Button>
            </Menu.Item>
            {categoriesList.map(category => (
              <Menu.Item key={category.id}>
                <Button className={activeItem == category.id ? 'menu__item-active' : 'menu__item'}>
                  {category.name}
                </Button>
              </Menu.Item>
            ))}
          </Menu>
          <Select
            placeholder="Sort by"
            defaultValue={sorting.column}
            className={'explore-select'}
            onSelect={handleOnSort}
          >
            <Select.Option value="countViews">{t('common:views')}</Select.Option>
            <Select.Option value="countLikes">{t('common:likes')}</Select.Option>
            <Select.Option value="dateCreated">{t('common:date created')}</Select.Option>
          </Select>
        </div>

        <ul style={{justifyContent: 'space-between'}} className={styles.list}>
          {products.map((product: any) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <li className={`${styles.card} ${styles.card__explore}`}>
                <TrendingNowCard hideMiddleBlock item={product} likes />
              </li>
            </Link>
          ))}
        </ul>
        <div className={style.explore__button}>
          {products.length % 8 == 0 && (
            <Button onClick={loadMore} className="btn btn-load-more">
              {t('common:load more')}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Explore;
