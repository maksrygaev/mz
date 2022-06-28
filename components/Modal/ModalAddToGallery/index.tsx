import React from 'react';
import { Button, Form, Input } from 'antd';
import { ProductsServices } from 'core/services';
import { TAppState } from 'core/store';
import { useSelector } from 'react-redux';
import { OrdersServices } from 'core/services/orders';
import { ProposalsServices } from 'core/services/proposals';
import router from 'next/router';

type TInitialValues = {
  link: string;
  message?: string
}

const styles = {
  btn: {
    display: 'block',
    margin: '0 auto',
    borderColor: 'black',
    borderRadius: 50,
  } 
}

type Props = {
  closeModal: () => void;
}

const ModalAddToGallery = (props: Props) => {
  const { TextArea } = Input;
  const initialValues: TInitialValues = {link: '', message: ''};
  const user = useSelector((state: TAppState) => state.session.user);

  const onSubmit = (values: TInitialValues) => {
    const idFromLink = values.link.split('/');
    const id = idFromLink[idFromLink.length - 1];
    
    ProductsServices.getProduct({id: id})
    .then(res => {
      OrdersServices.search({productID: id})
      .then(res2 => {
        /* Check that i'm owner this product and no product in the any gallery and products is not for sale */
        if(res.userID == user?.id && !Boolean(res?.galleryID) && !res2.length && res2.status !== 'Opened') {
          ProposalsServices.create({
            galleryID: router.query?.id,
            productID: id,
            message: values?.message
          })
          .then(res => {
            alert('Thank you! Your request has been sent')
            props.closeModal()
          })
          .catch(error => console.log(error))
        } else {
          null
        }
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));

  }
  return (
    <div>
      <Form onFinish={onSubmit} initialValues={initialValues} layout={'vertical'}>
        <Form.Item rules={[{ required: true, message: 'Please enter link' }]} name={'link'} label={'link'}>
          <Input placeholder={'Enter your link'}/>
        </Form.Item>
        <Form.Item name={'message'} label={'message'}>
          <TextArea placeholder={'Enter your message'}/>
        </Form.Item>
        <Button style={styles.btn} htmlType={'submit'}>Send request</Button>
      </Form>
    </div>
  );
};

export default ModalAddToGallery;