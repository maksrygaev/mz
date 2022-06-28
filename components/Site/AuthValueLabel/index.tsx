import React, { FC } from 'react';
import { Button, Space } from 'antd';
import styles from './authValueLabel.module.scss';

interface IProps {
  value: string;
  onChange: (type: string) => void;
}

const AuthValueLabel: FC<IProps> = ({ value, onChange }) => {
  return (
    <Space>
      <Button
        className={styles.valueLabel}
        type="link"
        disabled={value === 'email'}
        onClick={() => onChange('email')}
      >
        Email
      </Button>
      {/*<Button className={styles.valueLabel} type="link" disabled={value === 'phone'} onClick={() => onChange('phone')}>Phone</Button>*/}
    </Space>
  );
};

export default AuthValueLabel;
