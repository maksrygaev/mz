import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { CollectionsServices } from 'core/services';
import styles from '../../Common/SocialItem/socialItem.module.scss';

interface Props {
  id?: any,
  liked?: boolean,
  countLikes?: string;
  styling?: boolean;
}

const CollectionLike: React.FC<Props> = ({ id, liked, countLikes, styling }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(liked || false);
  const [likes, setLikes] = useState<number>(Number(countLikes) || 0);

  useEffect(() => setIsLiked(liked || false), [liked]);
  useEffect(() => setLikes(Number(countLikes) || 0), [countLikes]);

  const handleLike = async () => {
    try {
      await CollectionsServices.likesAdd({ id: id })
      setIsLiked(true);
      setLikes(likes + 1);
    }  catch (error) {
      setErrorMessage(error.message);
    }
  }
  const handleUnLike = async () => {
    try {
      await CollectionsServices.likesRemove({ id: id })
      setIsLiked(false);
      setLikes(likes - 1);
    }  catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div style={{border: '0 !important', padding: '0 !important', marginRight: '5px'}}>
      <div className={styles.socialItem}>
        {styling ?
          <span style={{fontFamily: 'Helvetica', fontSize: '25px'}}>{likes}</span>
          :
          <span>{likes}</span>
        }
        <Button onClick={isLiked ? handleUnLike : handleLike} className="btn-like">
          {isLiked ? (
            <HeartFilled />
          ): (
            <HeartOutlined />
          )}
        </Button>
      </div>
      {errorMessage && <>{message.error(errorMessage)}</>}
    </div>
  );
};

export default CollectionLike;
