import React from 'react';
import styles from './followerItem.module.scss';

interface Props {
  count?: number;
  title?: string;
}

const FollowerItem: React.FC<Props> = ({ count, title }) => {
  return (
    <div className={styles.followerItem}>
      <p>{title}</p>
      <span>{count ?? 0}</span>
    </div>
  );
};

export default FollowerItem;
