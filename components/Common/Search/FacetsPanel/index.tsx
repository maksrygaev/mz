import React from 'react';
import { Typography } from 'antd';
import styles from '../search.module.scss';

const { Title } = Typography;

interface Props {
  onClear?: () => void;
}

const FacetsPanel: React.FC<Props> = ({ children, onClear }) => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterTop}>
        <Title level={4} className={styles.filterTitle}>Filters</Title>
        <button type="button" className={styles.filterClear} onClick={onClear}>
          Clear all
        </button>
      </div>
      {children}
    </div>
  );
};

export default FacetsPanel;
