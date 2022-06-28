import React from 'react';
import cls from 'classnames';
import { Typography } from 'antd';
import styles from './product.module.scss';

interface Props {
  className?: string;
  isSmallTitle?: boolean;
  title?: string;
}

const { Title } = Typography;

const ProductBlock: React.FC<Props> = ({ className, children, isSmallTitle, title }) => {
  const classes = cls(`${styles.block}`, className);

  return (
    <div className={classes}>
      {title && <Title className={styles.blockTitle} level={isSmallTitle ? 5 : 3}>{`${title}:`}</Title>}
      {children}
    </div>
  );
};

export default ProductBlock;
