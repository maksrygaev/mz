import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Space, TimePicker } from 'antd';
import useWallet from 'core/hooks/useWallet';
import moment from 'moment';
import { ethers } from 'ethers';
import { OrdersServices } from 'core/services/orders';
import modal from './ModalOffers.module.scss';

interface IProps {
  product: any;
  onCancel: () => void;
  onSuccess: () => void;
}

const OffersModal = ({ product, onCancel, onSuccess }: IProps) => {
  const [form] = Form.useForm();
  const { address, connect, signPermit, chainId } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const format = 'HH:mm';
  const timeInMs = new Date().toISOString().split('T')[0];
  const hm = `${new Date().getHours()}:${new Date().getMinutes()}`;
  const dateFormat = 'YYYY-MM-DD';

  const handleSubmit = async (values: any) => {
    if (address && chainId) {
      const typeOrder = 'Purchase';
      const price = values.price;
      const createdAt = Math.floor(Date.now() / 1000);
      const dateTimeStart = moment(
        values.offerDate.format('DD/MM/YYYY') + ' ' + values.offerHour.format('HH:mm'),
        'DD/MM/YYYY HH:mm',
      ).valueOf();
      const deadline = Math.floor(dateTimeStart / 1000);
      try {
        setIsSubmitting(true);
        const message = {
          tokenId: product.token,
          tokenAmount: values.amount,
          nonce: Date.now(),
          currency: '0x0000000000000000000000000000000000000000',
          minimumPrice: ethers.utils.parseEther(price.toString()).toString(),
          payee: address,
          recipient: '0x0000000000000000000000000000000000000000',
          gallery: '0x0000000000000000000000000000000000000000',
          createdAt: createdAt,
          deadline: deadline,
        };
        const { signature, signedStr } = await signPermit(message);
        await OrdersServices.create({ permission: signedStr, signature, type: typeOrder });
        setIsSubmitting(false);
        onSuccess();
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsSubmitting(false);
        console.log(error);
      }
    }
  };

  const initialValues = {
    quantity: 0,
    price: 0,
    offerDate: moment(timeInMs, dateFormat),
    offerHour: moment(hm, format),
    agreement: 1,
  };

  return (
    <Modal visible footer={null} onCancel={onCancel}>
      {!address ? (
        <>
          <Space>
            <div style={{ margin: '20px 0' }}>
              <Button type="link" onClick={connect}>
                Connect metamask
              </Button>
            </div>
          </Space>
        </>
      ) : (
        <div className={modal.modal}>
          <div className={modal.modal__name}>Make offer</div>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="create_form"
            onFinish={handleSubmit}
          >
            <div className={`upload-product offers-form ${modal.modal__field}`}>
              <div className={modal.label_input}>Quantity (max: {product.amount})</div>
              <Form.Item
                name="quantity"
                rules={[
                  {
                    type: 'number',
                    min: 1,
                    max: product.amount,
                    required: true,
                    message: 'Please input quantity',
                  },
                ]}
              >
                <InputNumber className={'input-number'} type={'number'} />
              </Form.Item>
              <div className={modal.label_input}>Price per item</div>
              <div className={modal.modal__price}>
                <div className={modal.modal__price__left}>
                  <div>
                    <select className={modal.modal__select}>
                      <option value="1">ETH</option>
                      <option value="2">$</option>
                    </select>
                  </div>
                </div>
                <div className={`input-white ${modal.modal__price__value}`}>
                  <Form.Item
                    label=""
                    name="price"
                    rules={[
                      {
                        min: 0.00001,
                        required: true,
                        message: 'Please input price',
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputNumber
                      className={'input-number'} 
                      type={'number'}
                      placeholder="Amount"
                      onKeyDown={e => /[+\-,]$/.test(e.key) && e.preventDefault()}
                    />
                  </Form.Item>
                </div>
                <div className={modal.modal__price__right}>$0.00</div>
              </div>
              <div className={modal.modal__price__after}>Total amount offered: 0 ETH</div>
              <div className={modal.label_input}>Offers expiration</div>
              <div className={modal.modal__picker}>
                <Form.Item name="offerDate" rules={[{ required: true }]}>
                  <DatePicker />
                </Form.Item>
              </div>
              <div className={modal.modal__picker}>
                <Form.Item name="offerHour" rules={[{ required: true }]}>
                  <TimePicker format={format} />
                </Form.Item>
              </div>
              <div className={modal.modal__agreement}>
                <div className={modal.modal__agreement__radio}>
                  <Form.Item name="agreement">
                    <Radio value="1" checked />
                  </Form.Item>
                </div>
                <div className={modal.modal__agreement__text}>
                  By checking this box, I agree to Metazon Terns of Service
                </div>
              </div>
            </div>
            <div className={modal.modal__button}>
              <Button disabled={isSubmitting} className={`btn btn-rounded-black`} htmlType="submit">
                Make offer
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default OffersModal;
