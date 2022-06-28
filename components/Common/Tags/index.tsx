import React from 'react';
import cls from 'classnames';

import styles from './tags.module.scss';

interface Props {
  className?: string;
}

const Tags: React.FC<Props> = ({ children, className }) => {
  const classes = cls(`${styles.root}`, className);
  return <div className={classes}>{children}</div>;
};

export default Tags;
