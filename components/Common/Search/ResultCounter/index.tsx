import React from 'react';
import { Select, Skeleton } from 'antd';

import styles from '../search.module.scss';

const { Option } = Select;

interface Props {
  count?: number;
  isLoading?: boolean;
  onSort?: (value: string) => void;
}

const ResultCounter: React.FC<Props> = ({ count, isLoading, onSort }) => {
  const onChange = (value: string) => {
    if (onSort) onSort(value);
  };

  return (
    <div className={styles.resultCounter}>
      {isLoading ? (
        <Skeleton.Input active style={{ width: 200, height: 20 }} />
      ) : (
        <>
          <span className={styles.counterText}>{count} results</span>
          <Select placeholder="Sort by" onChange={onChange} style={{ width: 150 }}>
            <Option value="price">Price</Option>
            <Option value="countViews">Views</Option>
            <Option value="countLikes">Likes</Option>
            <Option value="dateCreated">Created date</Option>
            <Option value="publichedDate">Published date</Option>
          </Select>
        </>
      )}
    </div>
  );
};

export default ResultCounter;
