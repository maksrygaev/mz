import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { CollectionsServices, UsersServices } from 'core/services';
import styles from './CollectionTop.module.scss';
import {sliceCardUserName} from "../../../core/helpers";

interface IProfile {
  collection: any;
  user?: any;
}

export const CollectionTop = ({ collection, user }: IProfile): JSX.Element => {
  const [owner, setOwner] = useState<any>([]);
  const [collectionsCount, setCollectionsCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(collection.liked || false);
  const [likes, setLikes] = useState<number>(Number(collection.countLikes) || 0);

  const handleLike = async () => {
    try {
      await CollectionsServices.likesAdd({ id: collection.id });
      setIsLiked(true);
      setLikes(likes + 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleUnLike = async () => {
    try {
      await CollectionsServices.likesRemove({ id: collection.id });
      setIsLiked(false);
      setLikes(likes - 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const params = {
      collectionID: router.query?.id,
      status: collection?.userID == user?.id ? null : 'Published',
    }
    CollectionsServices.productsCount(params)
      .then(res => setCollectionsCount(res))
      .catch(error => console.log(error));

    if (collection.userID) {
      UsersServices.getUser(collection.userID)
        .then(res => {

          setOwner(res)
        })
        .catch(err => console.log(err));
    }
  }, [collection]);

  useEffect(() => setIsLiked(collection.liked || false), [collection.liked]);
  useEffect(() => setLikes(Number(collection.countLikes) || 0), [collection.countLikes]);

  return (
    <section className="container">
      <h2 className={styles.portfoliotop__title}>{collection.name}</h2>
      <div className={styles.portfoliotop__social}>
        <div className={styles.portfoliotop__social__left}></div>
        <div className={styles.portfoliotop__social__right}>
          <button onClick={isLiked ? handleUnLike : handleLike} style={{ border: 'none', backgroundColor: 'white' }}>
            <div className={styles.portfoliotop__btn}>{isLiked ? <HeartFilled /> : <HeartOutlined />}</div>
          </button>
        </div>
      </div>
      <div className={styles.portfoliotop__data}>
        <div className={styles.portfoliotop__data__item}>
          {collectionsCount}
          <span>{collectionsCount === 1 ? 'Artwork' : 'Artworks'}</span>
        </div>
        <div className={styles.portfoliotop__data__item}>
          {likes}
          <span>{likes === 1 ? 'Like' : 'Likes'}</span>
        </div>
      </div>
      <div className={styles.portfoliotop__intro} style={{wordBreak: 'break-all'}}>{collection.description}</div>
      <div className={styles.portfoliotop__avatar}>
        <img src={owner?.previewFilePath ? owner?.previewFilePath : '/icons/userpage/user-default.jpg'} alt="Avatar" />
      </div>
      <div className={styles.portfoliotop__creator__wrap}>
        <div className={styles.portfoliotop__creator__by}>By</div>
        <h2 className={styles.portfoliotop__creator} style={{wordBreak: 'break-all'}}>{sliceCardUserName(owner?.name)}</h2>
      </div>
    </section>
  );
};
