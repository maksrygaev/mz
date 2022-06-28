import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { CollectionsServices } from 'core/services';
import DownloadCollectionImg from './DownloadCollectionImg';
import styles from './create.module.scss';

interface IProps {
  element: any | null;
  onSuccess: () => void;
  onClose: any;
}

const AddCollectionModal: FC<IProps> = ({ onClose, element, onSuccess }) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [collectionFileID, setCollectionFileID] = useState<string>('');
  const [collectionAvatarID, setCollectionAvatarID] = useState<string>('');
  const [isDrop, setIsDrop] = useState<string>('Standard');
  const initialValues = element
    ? element
    : {
        name: '',
      };
  const onChangeDrops = (e: any) => {
    if (e.target.checked) {
      setIsDrop('Drop');
    } else {
      setIsDrop('Standard');
    }
  };
  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    CollectionsServices.createCollection({
      name: values.name.trim(),
      description: values.description,
      previewFileID: collectionFileID,
      contentFileID: collectionAvatarID,
      status: 'Private',
      type: isDrop,
    })
      .then(() => {
        setIsSubmitting(false);
        form.resetFields();
        onSuccess();
      })
      .catch(error => {
        setIsSubmitting(false);
        setErrorMessage(error.message);
      });
  };
  const onUploadFile = (value: string) => {
    setErrorMessage('');
    setCollectionFileID(value);
  };
  const onUploadAvatar = (value: string) => {
    setErrorMessage('');
    setCollectionAvatarID(value);
  };

  return (
    <Modal
      title="Adding Collection" visible onCancel={onClose} footer={null} width={500}
      className="upload-product adding-collection"
    >
      <DownloadCollectionImg onUploadFile={onUploadFile} collectionIdFile={''} type="Banner" />
      <DownloadCollectionImg onUploadFile={onUploadAvatar} collectionIdFile={''} type="Avatar" />
      {errorMessage && <div
        className="form-message-error"
        style={{marginBottom: '10px'}}
      >
        {errorMessage.indexOf('File doesn') === 0 ? 'Avatar or Banner wasn\'t uploaded' :
          errorMessage.indexOf('Name must be between') === 0 ? 'Collection name should be between 1 and 100 characters' :
          errorMessage}
      </div>}
      <Form layout="vertical" form={form} initialValues={initialValues} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Collection name"
          rules={[
            { required: true, message: 'Collection name should not be empty.'},
            { min: 2, message: 'Collection name must be minimum 2 characters.' },
            { max: 40, message: 'Collection name must be maximum 40 characters.' },
          ]}
          className="add_collections"
        >
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Collection description"
          rules={[
            { required: true, message: 'Description should not be empty. ' },
            { min: 2, message: 'Description must be minimum 2 characters.' },
            { max: 500, validateTrigger: ' ', message: 'Description must be maximum 500 characters.' },
          ]}
        >
          <TextArea className={styles.input} rows={4} />
        </Form.Item>
        <Checkbox onChange={onChangeDrops} style={{ marginBottom: '15px' }}>
          <span className={styles.chek_drop}>Go Live Now</span>
        </Checkbox>
        <br />
        <div className={styles.centered}>
          <Form.Item>
            <Button
              type="primary" htmlType="submit" block disabled={isSubmitting}
              className="btn btn-rounded-small-black-border-white-text"
              style={{width: 'auto'}}
            >
              Add
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default AddCollectionModal;
