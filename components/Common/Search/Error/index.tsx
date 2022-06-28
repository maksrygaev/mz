import React from 'react';
import { StopOutlined } from '@ant-design/icons';

import styles from '../search.module.scss';

interface Props {
  title?: string;
  text?: string;
}

const Error: React.FC<Props> = ({ title, text }) => {
  return (
    <div className={styles.error}>
      <StopOutlined />
      <p className={styles.errorTitle}>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default Error;
