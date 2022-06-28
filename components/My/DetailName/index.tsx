import React from 'react';
import styles from './detailName.module.scss';

interface Props {
  name?: string;
  description?: string;
}

const DetailName: React.FC<Props> = ({ children, description, name }) => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{name}</p>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};

export default DetailName;
