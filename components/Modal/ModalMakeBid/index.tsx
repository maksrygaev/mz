import React, { FC, useState } from 'react';
import modal from './ModalMakeBid.module.scss';
import { Button, Form, Input } from 'antd';

interface Props {
  onBid?: (value: number) => void;
}

export const ModalMakeBid: FC<Props> = (onBid) => {
  const [form] = Form.useForm();
  const [valueBid, setValueBid] = useState('0');

  const onSubmit = (values: any) => {
    console.log(values);
    //onBid(values.bid);
  }

  const initialValues = {
    bid: 0,
  };
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Make a bid
        </div>
        <div className={modal.modal__bids}>
          <div className={modal.modal__bids__item}>
            <span>1.125 ETH</span>
            Last Bid
          </div>
          <div className={modal.modal__bids__item}>
            <span>1 ETH</span>
            Minimal Bid
          </div>
        </div>
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          name="create_form"
          onFinish={onSubmit}
        >
        <div className={modal.modal__field}>
          <span>Your Bid</span>
          <Form.Item
            name="bid"
            rules={[
              { required: true, message: 'Please input bid' },
            ]}
          >
            <Input
              name="bid"
              value={valueBid}
              onChange={e => setValueBid(e.target.value)}
              placeholder="Enter your bid"
              className={'input input-small-rounded-black-border'}
            />
          </Form.Item>
        </div>
        <div className={modal.modal__button}>
          <Button className={`btn btn-rounded-black`} htmlType="submit">
            Make a Bid
          </Button>
        </div>
        </Form>
      </div>
  );
};