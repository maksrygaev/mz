import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { ProductsServices } from 'core/services';
import styles from '../../Common/SocialItem/socialItem.module.scss';

interface Props {
  id?: any;
  liked?: boolean;
  countLikes?: string;
}

const ProductLike: React.FC<Props> = ({ id, countLikes, liked }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(liked || false);
  const [likes, setLikes] = useState<number>(Number(countLikes) || 0);

  useEffect(() => setIsLiked(liked || false), [liked]);

  const handleLike = async () => {
    try {
      await ProductsServices.likesAdd({ id: id });
      setIsLiked(true);
      setLikes(likes + 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  const handleUnLike = async () => {
    try {
      await ProductsServices.likesRemove({ id: id });
      setIsLiked(false);
      setLikes(likes - 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div style={{ border: '0 !important', padding: '0 !important', marginRight: '5px' }}>
      <div className={styles.socialItem}>
        <Button onClick={isLiked ? handleUnLike : handleLike} className="btn-like">
          {isLiked ? <HeartFilled /> : <HeartOutlined />}
        </Button>
        <span>{likes}</span>
      </div>
      {errorMessage && <>{message.error(errorMessage)}</>}
    </div>
  );
};

export default ProductLike;
