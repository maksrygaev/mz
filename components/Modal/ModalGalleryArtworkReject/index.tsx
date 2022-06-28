import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import {ProposalsServices} from "../../../core/services";

interface Props {
  loadData: () => void;
  closeModal: () => void;
  artwork: any;
}

const { TextArea } = Input;

const ModalGalleryArtworkReject: FC<Props> = ({loadData, closeModal, artwork}) => {
  const title = 'Please describe the reason';
  const initialValues = {reason: ''};

  const handleRejectGalleryArtwork = (values: any) => {
    const params = {id: artwork.id, reason: values.reason}
    console.log(params);
    ProposalsServices.reject(params)
      .then(() => {
        message.success('Proposal was rejected');
        loadData()
        closeModal()
      })
      .catch(error => console.log('Gallery reject error', error))
  }

  return (
    <div>
      <h3>{title}</h3>
      <Form initialValues={initialValues} onFinish={handleRejectGalleryArtwork}>
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

export default ModalGalleryArtworkReject;