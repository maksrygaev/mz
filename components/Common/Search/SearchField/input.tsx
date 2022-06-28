import React, { useCallback } from 'react';
import cls from 'classnames';
import { Input } from 'antd';

import styles from '../search.module.scss';

const { Search } = Input;

interface Props {
  isBottomSpace?: boolean;
  name: string;
  onSearch?: () => void;
  placeholder?: string;
}

const SearchField: React.FC<Props> = ({ isBottomSpace, name, onSearch, placeholder }) => {
  const onSubmit = useCallback(() => {
    if (onSearch) {
      onSearch();
    }
  }, [onSearch]);

  const classes = cls(`${styles.searchField}`, { [styles.searchFieldSpace]: isBottomSpace });

  return <Search placeholder={placeholder} name={name} onSearch={onSubmit} className={classes} />;
};

export default SearchField;
