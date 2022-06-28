import React from 'react';
import cls from 'classnames';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import styles from './salesProgress.module.scss';

interface Props {
  className?: string;
  number?: number;
  variant?: 'high' | 'low';
}

const SalesProgress: React.FC<Props> = ({ className, number, variant = 'high' }) => {
  const classes = cls(`${styles.root}`, { [styles[variant]]: variant }, className);

  return (
    <span className={classes}>
      {variant === 'low' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
      {`${number}%`}
    </span>
  );
};

export default SalesProgress;
