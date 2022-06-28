import React from 'react';
import { Button, Form, Input } from 'antd';

type TInitialValues = {
  fee: number;
  walletAddress: string;
}

const Fees:React.FC = () => {
  const initialValues: TInitialValues = { fee: 0, walletAddress: '' };

  const handleSubmit = (values: TInitialValues): void => console.log(values);

  return (
    <div>
      <Form 
        initialValues={initialValues} 
        onFinish={handleSubmit}
        layout={'vertical'} 
        name={'fee-settings'}
      >
        <Form.Item name={'fee'} label={'Fee'}>
          <Input />
        </Form.Item>
        <Form.Item name={'wallet-address'} label={'Manager address'}>
          <Input />
        </Form.Item>
        <Form.Item style={{textAlign: 'end'}}>
          <Button type={'primary'} htmlType={'submit'}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Fees;