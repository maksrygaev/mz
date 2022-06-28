import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Alert, Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { UsersServices } from 'core/services';
import { useRouter } from 'next/router';
import ButtonGroup from 'components/Common/ButtonGroup';
import store from 'core/store';
import { useSubmit } from 'core/hooks';
import { getSelf, TGetSelfType } from 'core/actions';
import { UserProps } from '../../models';
import AvatarEdit from '../../AvatarEdit';
import SocialBlock from '../SocialBlock';

import styles from '../editProfile.module.scss';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  bannerFileID?: string;
  user?: UserProps;
}

const EditProfileForm: React.FC<Props> = ({ bannerFileID, user }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [avatarFileID, setAvatarFileID] = useState<string>('');
  const { errorCode, isSubmitting, submit, clearError } = useSubmit();
  const router = useRouter();

  const initialValues = {
    biography: user?.biography || '',
    hash: user?.hash || '',
    name: user?.name || '',
  };

  const onUploadFile = (value: string): void => {
    setAvatarFileID(value);
  };

  const onSubmit = (values: any): void => {
    const userValue = { ...values, previewFileID: avatarFileID, contentFileID: bannerFileID };
    submit(UsersServices.updateUser, userValue, () => {
      store.dispatch(getSelf(TGetSelfType.UPDATE));
      message.info('The data was changed successfully');
      setTimeout(() => router.push('/my'), 100);
    });
  };

  return (
    <div className={styles.edition}>
      {errorCode && errorCode !== 'EXISTS_USER_HASH' && <Alert message={t(`errors:${errorCode}`)} type="error" showIcon />}
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
        onFieldsChange={clearError}
        layout="vertical"
        className={styles.form}
      >
        <Row gutter={[20, 30]}>
          <Col xs={24} lg={16}>
            <div className={styles.root}>
              <div className={styles.avatar}>
                <AvatarEdit
                  alt={user?.name}
                  avatarPath={user?.previewFilePath}
                  onUploadFile={onUploadFile}
                  sessionIdFile={user?.previewFileID?.toString()}
                />
              </div>
              <div className={styles.information}>
                <h2 className="section_title">Information</h2>
                <Form.Item
                  label="Change your name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input name' },
                    { min: 1, message: 'Name must be minimum 1 characters.' },
                    { max: 100, message: 'Name must be maximum 100 characters.' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Setup URL" name="hash">
                  <Input addonBefore="http://mz-dev.agamora.dev/artist/" />
                </Form.Item>
                {errorCode && errorCode == 'EXISTS_USER_HASH' && <p className={'error-text'}>User’s url already exists</p>}
                <Form.Item
                  label="Bio"
                  name="biography"
                  rules={[
                    { required: true, message: 'Please input biography' },
                    { max: 300, message: 'Biography must be maximum 300 characters.' },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <Title level={4}>Social networks</Title>
            <SocialBlock user={user} />
          </Col>
        </Row>
        <ButtonGroup variant="right" className="form-submit-button">
          <Button type="default" htmlType="button" size="large" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}>
            {isSubmitting && <LoadingOutlined />}
            Save
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default EditProfileForm;
