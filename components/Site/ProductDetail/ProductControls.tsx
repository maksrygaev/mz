import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ProductsServices } from 'core/services';
import ProductLike from './ProductLikeCurrent';
import styles from './product.module.scss';

const ProductControls = ({ productData, id }: any) => {
  const [isLiked, setIsLiked] = useState<boolean>(productData?.liked || false);
  const [likes, setLikes] = useState<number>(Number(productData?.countLikes) || 0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLike = async (): Promise<void> => {
    try {
      await ProductsServices.likesAdd({ id: id });
      setIsLiked(true);
      setLikes(likes + 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleUnLike = async (): Promise<void> => {
    try {
      await ProductsServices.likesRemove({ id: id });
      setIsLiked(false);
      setLikes(likes - 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => setIsLiked(productData?.liked || false), [productData?.liked]);

  return (
    <div className={styles.product__controls}>
      <div className={styles.product__settings}>
        {productData.status !== 'Draft' && productData.status !== 'Moderation' && (
          <button
            onClick={isLiked ? handleUnLike : handleLike}
            style={{ border: 'none', backgroundColor: 'white' }}
            disabled={productData?.status == 'Draft'}
          >
            <div className={styles.product__btn}>
              {isLiked ? <HeartFilled /> : <HeartOutlined />}
              {/* <img src="/images/auction-1.png" alt="" /> */}
            </div>
          </button>
        )}
        {errorMessage && <>{message.error(errorMessage)}</>}
        {/* !isMediaFile && <Link href="#">
          <div className={styles.auctionblock__btn} onClick={imageHandler}>
            <img src="/images/auction-2.png" alt="" />
          </div>
        </Link> */}
        {/*                <Link href="#">
              <div className={styles.auctionblock__btn}>
                <img src="/icons/icon-share.svg" alt="" />
              </div>
            </Link>*/}

      </div>
      <div className={styles.product__voices__wrap}>
        <div className={styles.product__voices}>
          <div className={styles.product__voices__value}>
            <img src="/images/pic-eye.png" alt="" />
            {productData?.countViews}
          </div>
          <div className={styles.product__voices__value}>
            {productData.status !== 'Draft' && productData.status !== 'Moderation' && (
              <ProductLike id={id} countLikes={likes.toString()} liked={productData?.liked} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductControls;
