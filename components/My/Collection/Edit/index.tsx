import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import ButtonGroup from 'components/Common/ButtonGroup';
import { useSubmit } from 'core/hooks';
import { CollectionsServices } from 'core/services';
import { useRouter } from 'next/router';
import CollectionAvatarEdit from './collectionAvatarEdit';
import styles from './index.module.scss';

const { TextArea } = Input;

interface Props {
  id: number;
  collection?: any;
}

const CollectionEdit: React.FC<Props> = ({ id, collection }) => {
  const { submit } = useSubmit();
  const [form] = Form.useForm();
  const router = useRouter();
  const [preview, setPreview] = useState({ title: '', description: '' });
  const [isDrop, setIsDrop] = useState<string>(collection?.type);
  const [avatarFileID, setAvatarFileID] = useState<string>('');

  const onChangeDrops = (e: any) => {
    e.target.checked ? setIsDrop('Drop') : setIsDrop('Standard');
  };

  const initialValues = {
    description: collection?.description || '',
    name: collection?.name || '',
    hashtag: '',
  };

  const onSubmit = (values: any): void => {
    const collectionValue = {
      id: id,
      name: values.name,
      description: values.description,
      type: isDrop,
      previewFileID: avatarFileID,
    };

    submit(CollectionsServices.collectionUpdate, collectionValue, () => {
      message.info('The data was changed successfully');
      router.push(`/my/collection/${id}`);
    });
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const current = e.target.value;
      setPreview({ ...preview, [e.target.name]: current });
    },
    [preview, setPreview],
  );

  const onUploadFile = (value: string): void => setAvatarFileID(value);

  return (
    <>
      <h2 className="section_title">Edit collection</h2>
      <Form form={form} initialValues={initialValues} onFinish={onSubmit} layout="vertical" className="upload-product">
        <Row gutter={[30, 30]}>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name">
              <Input onChange={onChange} />
            </Form.Item>
            {/* <Form.Item label="Hashtag" name="hashtag">
            <Input />
          </Form.Item> */}
            <Form.Item name="type">
              <Checkbox
                defaultChecked={collection?.type === 'Drop'}
                onChange={onChangeDrops}
                style={{ marginBottom: '15px' }}
              >
                <span className={styles.chek_drop}>Go live now</span>
              </Checkbox>
              <br />
            </Form.Item>
            {/* <Form.Item label="Time">
            <Row gutter={10}>
              <Col xs={12} md={6}>
                <DatePicker name="date" />
              </Col>
              <Col xs={12} md={6}>
                <Input name="time" placeholder="Choose the time" />
              </Col>
            </Row>
          </Form.Item> */}
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            {/* <Form.Item label="Show/Hide Collection" name="status">
            <Switch
              defaultChecked
              onChange={onSelectedChange}
              checkedChildren="Show"
              unCheckedChildren="Hide"
            />
          </Form.Item> */}
          </Col>
          <Col xs={24} md={12}>
            <CollectionAvatarEdit
              avatarPath={collection?.previewFilePath}
              alt={collection?.name}
              onUploadFile={onUploadFile}
              sessionIdFile={collection?.avatarFileID?.toString()}
            />
          </Col>
        </Row>

        <ButtonGroup variant="center" className="form-submit-button">
          <Button
            type="default"
            htmlType="button"
            size="large"
            onClick={() => router.back()}
            className="btn btn-rounded-small-black-border-white-text"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="btn btn-rounded-small-black-border-white-text"
          >
            Save
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default CollectionEdit;
