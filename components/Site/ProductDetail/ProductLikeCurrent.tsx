import React, { useState } from 'react';
import { message } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import styles from '../../Common/SocialItem/socialItem.module.scss';

interface Props {
  id?: any;
  liked?: boolean;
  countLikes?: string;
}

const ProductLikeCurrent: React.FC<Props> = ({ countLikes }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <div style={{ border: '0 !important', padding: '0 !important', marginRight: '5px' }}>
      <div className={styles.socialItem}>
        <HeartFilled />
        <span>{countLikes}</span>
      </div>
      {errorMessage && <>{message.error(errorMessage)}</>}
    </div>
  );
};

export default ProductLikeCurrent;
