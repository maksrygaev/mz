import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  TimePicker,
  Popover,
  notification,
} from 'antd';
import { OrdersServices } from 'core/services/orders';
import useWallet from 'core/hooks/useWallet';
import { ethers } from 'ethers';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { TGallery, TProduct } from 'core/constants/types';
import { ProposalsServices } from 'core/services/proposals';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { priceRounding } from 'core/services/rounding';
import {ellipseString} from "core/helpers";

const orderTypes = ['Fixed price', 'Fixed Time', 'Auction'];

interface IProduct extends TProduct {
  productName?: string;
  productPreviewFilePath?: string;
}

interface IProps {
  product: IProduct;
  ownerData: any;
  gallery?: TGallery;
  onSuccess: (text: string) => void;
  disabled?: boolean;
}

type Wallet = {
  wallet: string;
  percent: number;
};

const { TextArea } = Input;

const ProductSellForm: React.FC<IProps> = ({ product, ownerData, onSuccess, gallery = null, disabled = false }) => {
  const { address, connect, signPermit, setApprovalForAll, chainId, balanceCrypto } = useWallet();
  const [form] = Form.useForm();
  const user = useSelector((state: TAppState) => state.session.user);
  const contract = useSelector((state: any) => state.contract);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [saleType, setSaleType] = useState<string>(orderTypes[0]);

  const isSwap = Boolean(product?.contract);

  const timeFormat = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const now = new Date();
  const now15min = now.setMinutes(now.getMinutes() + 15);
  const timeInMs = new Date(now15min);
  const hm = `${timeInMs.getHours()}:${timeInMs.getMinutes()}`;
  const now1hour = now15min + 3600000;
  const timeInMs1 = new Date(now1hour);
  const hmFinish = `${timeInMs1.getHours()}:${timeInMs1.getMinutes()}`;

  const initialValues = {
    price: 0,
    amount: ownerData?.countCanSell || 0,
    type: orderTypes[0],
    startDate: moment(timeInMs, dateFormat),
    startHour: moment(hm, timeFormat),
    finishDate: moment(timeInMs1, dateFormat),
    finishHour: moment(hmFinish, timeFormat),
    message: '',
    wallets: [],
  };

  const clearFieldErrors = (_changedValues: any, allValues: any): void => {
    const updatedFields = Object.keys(allValues)
      .filter(name => form.getFieldError(name).length)
      .map(name => ({ name, errors: [] }));
    form.setFields(updatedFields);
  };

  const handleChangeSaleType = (e: RadioChangeEvent): void => {
    setSaleType(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [ownerData]);

  const handleSubmit = async (values: any) => {
    setErrorMessage('');
    if (address && chainId && user) {
      let type = 'Sale';
      let createdAt = Math.floor(Date.now() / 1000);
      let deadline = createdAt + 31536000;
      if (values.type === 'Auction') type = 'Auction';
      if (values.type === 'Auction' || values.type === 'Fixed Time') {
        const dateTimeStart = moment(
          values.startDate.format('DD/MM/YYYY') + ' ' + values.startHour.format('HH:mm'),
          'DD/MM/YYYY HH:mm',
        ).valueOf();
        const dateTimeFinish = moment(
          values.finishDate.format('DD/MM/YYYY') + ' ' + values.finishHour.format('HH:mm'),
          'DD/MM/YYYY HH:mm',
        ).valueOf();
        createdAt = Math.floor(dateTimeStart / 1000);
        deadline = Math.floor(dateTimeFinish / 1000);
      }
      const beneficiaries = gallery
        ? [contract.MarketplaceWalletAddress, gallery.userWalletAddress, user.walletAddress]
        : [contract.MarketplaceWalletAddress, user.walletAddress];

      gallery && values?.wallets?.map((item: Wallet) => beneficiaries.push(item.wallet));

      const usersFee = gallery ? values?.wallets?.reduce((ac: number, item: Wallet) => ac + item.percent, 0) : 0;

      const percentOfBeneficiaries = gallery
        ? [
            contract.MarketplaceFee * 10,
            gallery.fee * 10,
            (100 - contract.MarketplaceFee - gallery.fee - usersFee) * 10,
          ]
        : [contract.MarketplaceFee * 10, (100 - contract.MarketplaceFee) * 10];

      gallery && values?.wallets?.map((item: Wallet) => percentOfBeneficiaries.push(item.percent * 10));

      if (values.type !== 'Fixed price' && createdAt - Math.floor(Date.now() / 1000) < 600) {
        notification.error({ message: 'Sale start can be no earlier than 15 minutes from the current time' });
      } else if (values.type === 'Auction' && createdAt + 3600 > deadline) {
        notification.error({ message: 'Auction must last at least 1 hour. Please change Sale finish time.' });
      } else if (values.type === 'Fixed Time' && createdAt + 3600 > deadline) {
        notification.error({ message: 'Fixed Time must last at least 1 hour. Please change Sale finish time.' });
      } else {
        try {
          if (percentOfBeneficiaries[2] <= 0) {
            setErrorMessage('Sum of all commissions exceeds 100%');
          } else {
            setIsSubmitting(true);
            const message: any = {
              tokenId: product.token,
              tokenAmount: values.amount,
              nonce: Date.now(),
              createdAt: createdAt,
              deadline: deadline,
              beneficiaries: beneficiaries,
              percentOfBeneficiaries: percentOfBeneficiaries,
              price: ethers.utils.parseEther(values.price.toString()).toString(),
            };
            if (isSwap) {
              const rs = await setApprovalForAll();
              message.tokenAddress = product.contract;
            }
            const { signature, signedStr } = await signPermit(message, isSwap);
            if (gallery) {
              await ProposalsServices.create({
                galleryID: gallery.id,
                // @ts-ignore
                productID: product?.productID,
                permission: signedStr,
                signature,
                message: values.message,
              });
            } else {
              await OrdersServices.create({
                permission: signedStr,
                signature,
                type,
                step: values.minBid,
              });
            }
            setTimeout(() => {
              setSaleType(orderTypes[0]);
              form.resetFields();
              setIsSubmitting(false);
              onSuccess('Was published successfully for sale');
            }, 4000);
          }
        } catch (error) {
          setErrorMessage(error.message);
          setIsSubmitting(false);
          console.log(error);
        }
      }
    }
  };

  const saleTypes = !gallery ? orderTypes : orderTypes.filter(item => item !== 'Auction');

  return (
    <div style={{ marginTop: '10px', borderBottom: '1px solid black', paddingBottom: '15px' }}>
      {!address ? (
        <div>
          <Button type="link" onClick={connect}>
            Connect metamask
          </Button>
        </div>
      ) : (
        <>
          {gallery && (
            <div style={{ display: 'flex', marginBottom: 8 }}>
              <img
                style={{ marginRight: 16 }}
                src={product?.productPreviewFilePath}
                width={100}
                height={100}
                alt={'banner'}
              />
              <div>
                <h2>
                  {product?.productName ? product?.productName.slice(0, 15) : ''}{' '}
                  {product?.productName ? product.productName.length > 15 && '...' : ''}
                </h2>
                <div style={{ display: 'flex' }}>
                  <img
                    style={{ borderRadius: '50%', marginRight: 16 }}
                    src={product?.userPreviewFilePath}
                    alt={'Avatar'}
                    width={25}
                    height={25}
                  />
                  <p>{ellipseString(product?.userName)}</p>
                </div>
              </div>
            </div>
          )}
          <Form
            layout="vertical"
            name="signIn"
            form={form}
            initialValues={initialValues}
            onFinish={handleSubmit}
            requiredMark={false}
            onFieldsChange={clearFieldErrors}
            className="upload-product"
          >
            <Row>
              <Col md={7}>
                <Form.Item name="type">
                  <Radio.Group onChange={handleChangeSaleType} value={saleType}>
                    <Space direction="vertical">
                      {saleTypes.map(item => (
                        <Radio key={item} value={item}>
                          {item}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col md={17}>
                <Row gutter={30}>
                  <Col md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label="Price (ETH)"
                      name="price"
                      rules={[{ type: 'number', min: 0.0001, required: true, message: 'Please input price' }]}
                      style={{ marginRight: '5px' }}
                    >
                      <InputNumber
                        className={'input-number'}
                        disabled={isSubmitting}
                        formatter={value => priceRounding(value)}
                      />
                    </Form.Item>
                    {saleType == 'Auction' && (
                      <Form.Item
                        label="Min Bid"
                        name="minBid"
                        rules={[{ type: 'number', min: 0.0001, required: true, message: 'Please input min bid' }]}
                      >
                        <InputNumber
                          className={'input-number'}
                          disabled={isSubmitting}
                          formatter={value => priceRounding(value)}
                        />
                      </Form.Item>
                    )}
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Edition size"
                      name="amount"
                      rules={[
                        {
                          type: 'number',
                          required: true,
                          min: 1,
                          max: ownerData?.countCanSell || 0,
                          message: 'Please input correct Edition size',
                        },
                      ]}
                    >
                      <InputNumber className={'input-number'} disabled={!product?.contract || isSubmitting} />
                    </Form.Item>
                    {!product?.contract && (
                      <Popover content="" title="Initial sale Edition size cannot be edited.">
                        <div
                          style={{ position: 'absolute', top: '10px', height: '65px', width: '50%', zIndex: 20 }}
                        ></div>
                      </Popover>
                    )}
                  </Col>
                </Row>
                {(saleType === orderTypes[1] || saleType === orderTypes[2]) && (
                  <>
                    <div>Sale start</div>
                    <Row gutter={30}>
                      <Col md={12}>
                        <Form.Item name="startDate" rules={[{ required: true, message: 'Field is required' }]} style={{ marginBottom: '10px' }}>
                          <DatePicker />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item name="startHour" rules={[{ required: true, message: 'Field is required' }]} style={{ marginBottom: '10px' }}>
                          <TimePicker format={timeFormat} />
                        </Form.Item>
                      </Col>
                      <div style={{ padding: '0 15px', margin: '0 0 20px' }}>
                        Sale start can be no earlier than 15 minutes from the current time
                        <span style={{ marginLeft: '15px' }}>
                        <Popover content="" title="Be aware, you have 5 mins to take action, otherwise you need to set up start time and finish time again.">
                          <InfoCircleOutlined />
                        </Popover>
                          </span>
                      </div>
                    </Row>
                    <div>Sale finish</div>
                    <Row gutter={30}>
                      <Col md={12}>
                        <Form.Item name="finishDate" rules={[{ required: true, message: 'Field is required' }]}>
                          <DatePicker />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item name="finishHour" rules={[{ required: true, message: 'Field is required' }]}>
                          <TimePicker format={timeFormat} />
                        </Form.Item>
                      </Col>
                      <div style={{ padding: '0 15px', margin: '-20px 0 20px' }}>
                        {saleType} must last at least 1 hour.
                      </div>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
            {gallery && (
              <>
                <Form.Item name={'message'} label={'Message'}>
                  <TextArea placeholder={'Please enter message'} name={'message'} />
                </Form.Item>
                <Form.List name="wallets">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Row justify={'space-between'} key={key} gutter={0}>
                          <Col xs={14}>
                            <Form.Item
                              {...restField}
                              name={[name, 'wallet']}
                              rules={[
                                { required: true, message: '' },
                                () => ({
                                  validator(_, value: string) {
                                    if (ethers.utils.isAddress(value)) {
                                      return Promise.resolve();
                                    } else {
                                      return Promise.reject(new Error('Enter correct wallet'));
                                    }
                                  },
                                }),
                              ]}
                            >
                              <Input placeholder={'Enter wallet address'} />
                            </Form.Item>
                          </Col>
                          <Col xs={6}>
                            <Form.Item
                              rules={[
                                { required: true, min: 0, max: 100, message: 'Enter correct percent', type: 'number' },
                              ]}
                              {...restField}
                              name={[name, 'percent']}
                            >
                              <InputNumber formatter={(value: any) => `${value.replace(/[^0-9]/g, '')}%`} />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Button style={{ height: 50 }} onClick={() => remove(name)}>
                              <MinusCircleOutlined />
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      {fields.length < 8 && (
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add beneficiary
                          </Button>
                        </Form.Item>
                      )}
                    </>
                  )}
                </Form.List>
              </>
            )}
            {errorMessage && (
              <p className={'error-text'} style={{ textAlign: 'center' }}>
                {errorMessage}
              </p>
            )}
            <Row justify={'center'}>
              <Button
                htmlType="submit"
                className="btn btn-rounded-small-black-border-white-text"
                disabled={isSubmitting || disabled}
                loading={isSubmitting}
              >
                {gallery ? 'Propose' : 'Sale'}
              </Button>
              {isSubmitting && (
                <Popover content="" title="Please, wait while transaction will be completed.">
                  <div style={{ position: 'absolute', top: '0', height: '40px', width: '100%', zIndex: 20 }}></div>
                </Popover>
              )}
            </Row>
          </Form>
        </>
      )}
    </div>
  );
};

export default ProductSellForm;
