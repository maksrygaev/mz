import { FC, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import footer from '../../../Common/Footer/Footer.module.scss';

const SubscribeBottom: FC = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <Input
        placeholder="Enter your email"
        className={'input input-rounded-black-border'}
        value={value}
        onChange={e => setValue(e.target.value)}
        suffix={
          <Button shape="circle" className={footer.footer_plusButton}>
            <PlusOutlined />
          </Button>
        }
      />
    </div>
  );
};

export default SubscribeBottom;
