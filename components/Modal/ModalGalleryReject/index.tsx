import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import { GalleriesServices } from 'core/services/galleries';
import { TGallery } from 'core/constants/types';

interface Props {
  loadData: () => void;
  closeModal: () => void;
  gallery: TGallery;
}

const { TextArea } = Input;

const ModalGalleryReject: FC<Props> = ({ loadData, closeModal, gallery}) => {
  const title = 'Please describe the reason';
  const initalValues = {reason: ''};

  const handleRejectGallery = (values: any) => {
    const params = {id: gallery.id, reason: values.reason};
    GalleriesServices.reject(params)
    .then(() => {
      message.success('Gallery was rejected');
      loadData()
      closeModal()
    })
    .catch(error => console.log('Gallery reject error', error))
  }

  return (
    <div>
      <h3>{title}</h3>
      <Form initialValues={initalValues} onFinish={handleRejectGallery}>
        <Form.Item rules={[{ required: true, message: title }]} name={'reason'}>
          <TextArea name={'reason'}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalGalleryReject;