import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import SaleSetup from './SaleSetup';
import { UsersServices } from 'core/services';
import Preview from './Preview';
import useWallet from 'core/hooks/useWallet';
import { useRouter } from 'next/router';
import { useSubmit } from 'core/hooks';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { UserProps } from '../Profile/models';
import style from './create.module.scss';
import moment from 'moment';

const CreateSale: React.FC = () => {
  const router = useRouter();
  const {address, connect} = useWallet();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();
  const [preview, setPreview] = useState({ title: '', description: '', price: '' });
  const [backgroundId, setBackgroundId] = useState<any>(null);
  const [fileId, setFileId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState<UserProps>({});

  const user = useSelector((state: TAppState) => state.session.user);
  const id = null ?? user?.id

  const loadProfile = () => {
    UsersServices.getUser({ id })
      .then(rs => setUserData(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const avatarImage = userData?.previewFilePath ? userData?.previewFilePath : '/icons/userpage/user-default.jpg';
  const name = userData?.name || 'Master';

  const format = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const timeInMs = new Date().toISOString().split('T')[0]
  const hm = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;

  const initialValues = {
    price: '',
    bid: '',
    auctionStartDate: moment(timeInMs, dateFormat),
    auctionStartHour: moment(hm, format),
    auctionFinishDate: moment(timeInMs, dateFormat),
    auctionFinishHour: moment(hm, format),
  };

  const onSubmit = (values: any) => {
    const dateTimeStart = (moment(values.auctionStartDate.format("DD/MM/YYYY") + ' ' + values.auctionStartHour.format("HH:mm"), 'DD/MM/YYYY HH:mm')).valueOf();
    const dateTimeFinish = (moment(values.auctionFinishDate.format("DD/MM/YYYY") + ' ' + values.auctionFinishHour.format("HH:mm"), 'DD/MM/YYYY HH:mm')).valueOf();

    const productData = {
      walletAddress: address,
      amount: 1,
    };
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const current = e.target.value;
      setPreview({ ...preview, [e.target.name]: current });
    },
    [preview, setPreview],
  );

  if (!address) {
    return (
      <Button onClick={connect}>Connect Metamask</Button>
    )
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      name="create_form"
      onFinish={onSubmit}
      className="upload-product"
    >
      <h1 className={style.title}>Create artwork</h1>
      <Row gutter={[30, 30]}>
        <Col xs={24} md={13}>
          <SaleSetup onChange={onChange} />
          {errorMessage && <div className="form-message-error">{errorMessage}</div>}
        </Col>
        <Col xs={24} md={11} >
          <Preview
            title={preview.title}
            image={backgroundId ? backgroundId?.path : '/images/preview-artwork.png'}
            avatar={avatarImage}
            author={name}
            price={preview.price}
          />
        </Col>
      </Row>
      <div style={{marginTop: '25px', textAlign: 'center'}}>
        <Button htmlType="submit" className="btn btn-rounded-small-black-border-white-text ">Complete</Button>
      </div>
    </Form>
  );
};

export default CreateSale;
