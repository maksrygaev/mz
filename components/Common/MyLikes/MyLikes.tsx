import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ProductsServices } from 'core/services';
import { TAppState } from 'core/store';
import style from './MyLikes.module.scss';
import styles from '../../Common/Cards/index.module.scss';
import MyLikesCard from '../Cards/MyLikesCard';
import { TLIkedProduct } from 'core/constants/types';

const MyLikes: React.FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [searchList, setSearchList] = useState<TLIkedProduct[]>([]);

  useEffect(() => {
    ProductsServices.getProductsLikedSelf({ userID: user?.id, sorting: { column: 'dateCreated', isAscending: 'false' } })
      .then(res => setSearchList(res))
      .catch(error => console.log(error))
  }, []);

  return (
    <section className="container">
      <h2 className="section_title">My likes</h2>
      {searchList.length > 0 ? (
        <ul className={styles.list}>
          {searchList.map((item: TLIkedProduct) => (
            <Link key={item.id} href={`/product/${item?.productID}`}>
              <li className={`${styles.card} ${styles.card__artwork}`}>
                <MyLikesCard item={item} />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <h3 className={style.likes__nothing}>You do not have ‘liked’ artworks yet </h3>
      )}
    </section>
  );
};

export default MyLikes;
