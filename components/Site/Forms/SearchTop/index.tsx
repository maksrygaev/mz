import { FC, useState } from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import header from '../../../Common/Header/Header.module.scss';

const SearchTop: FC = () => {
  const [value, setValue] = useState('');
  return (
    <div className={header.header_search}>
      <Input
        placeholder="Search by artist, asset or collection"
        className={'input input-rounded'}
        value={value}
        onChange={e => setValue(e.target.value)}
        suffix={
          <Button
            shape="circle"
            className={header.header_searchButton}
            icon={<SearchOutlined className={header.header_searchButtonImg} />}
          ></Button>
        }
      />
    </div>
  );
};

export default SearchTop;
