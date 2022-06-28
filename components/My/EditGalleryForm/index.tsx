import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { GalleriesServices } from 'core/services/galleries';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Switch, Upload } from 'antd';
import { FilesServices, LinkData, LinksServices } from 'core/services';
import { requiredRule } from 'core/helpers';
import ProfileBackground from '../Profile/ProfileBackground';
import SocialFormGallery from '../Profile/Edit/SocialBlock/SocialFormGallery';
import styles from '../CreateGalleryForm/createGallery.module.scss';
import { useSelector } from 'react-redux';
import { TAppState } from '../../../core/store';
import ModalGalleryNetworks from 'components/Modal/ModalGalleryNetworks';
import { useSubmit } from 'core/hooks';
import { TGallery } from 'core/constants/types';

type TInitialValues = {
  avatarFileInfo: any;
  bannerFileInfo: any;
  description?: string;
  name?: string;
  fee?: number;
  hashtags: any;
};

const EditGalleryForm: FC = () => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const [gallery, setGallery] = useState<TGallery | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [linksList, setLinksList] = useState<LinkData[]>([]);
  const [avatarFileInfo, setAvatarFileInfo] = useState<any>(null);
  const [bannerFileInfo, setBannerFileInfo] = useState<any>(null);
  const { isSubmitting, submit } = useSubmit();

  useEffect(() => {
    GalleriesServices.get(Number(router.query?.id))
      .then(res => {
        setGallery(res);
        setChecked(res.availability == 'Opened');
      })
      .catch(error => console.log(error));
  }, []);

  const initialValues: TInitialValues = {
    avatarFileInfo: gallery?.contentFilePath,
    bannerFileInfo: gallery?.previewFilePath,
    description: gallery?.description,
    name: gallery?.name,
    fee: gallery?.fee,
    hashtags: gallery?.tags.map((item: any) => item.value).join(' '),
  };

  const onSubmit = (values: any): void => {
    const tagsForDelete = gallery?.tags;
    const tags = values.hashtags ? values.hashtags.split(' ') : [];
    const galleryFee = values.fee
      ? values.fee < 1 && values.fee > 0
        ? Math.ceil(values.fee)
        : Math.round(values.fee)
      : 0;

    const data = {
      id: gallery?.id,
      name: values.name,
      description: values.description,
      // eslint-disable-next-line no-extra-boolean-cast
      contentFileID: Boolean(avatarFileInfo) ? avatarFileInfo.id : gallery?.contentFileID,
      // eslint-disable-next-line no-extra-boolean-cast
      previewFileID: Boolean(bannerFileInfo) ? bannerFileInfo?.id : gallery?.previewFileID,
      fee: galleryFee,
      availability: checked ? 'Opened' : 'Closed',
    };

    submit(
      GalleriesServices.update,
      { data, tags: tags, tagsForDelete: tagsForDelete },
      () => router.push(`/gallery/${gallery?.id}`),
      error => console.log(error),
    );
  };

  const loadLinks = () => {
    LinksServices.linksFetchGallery({ galleryID: gallery?.id })
      .then(response => setLinksList(response))
      .catch(error => console.log(error));
  };

  const showModal = (): void => {
    setVisible(true);
  };

  const closeModal = (): void => {
    setVisible(false);
  };

  const uploadAvatar = (info: any): void => {
    const data = new FormData();
    data.append('file', info.file);
    FilesServices.fileUpload(data)
      .then(response => setAvatarFileInfo(response))
      .catch(error => console.log(error));
  };

  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      // setAvatarFileError('Image should be smaller than 1MB!')
    }
    return isLt2M;
  };

  const beforeUploadBg = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      // setBannerFileError('Image should be smaller thann 1MB!')
    }
    return isLt2M;
  };

  const upploadBanner = (info: any): void => {
    const data = new FormData();
    data.append('file', info.file);
    FilesServices.fileUpload(data)
      .then(response => setBannerFileInfo(response))
      .catch(error => console.log(error));
  };

  const handleSendForReview = () => {
    GalleriesServices.review({ id: gallery?.id })
      .then(() => router.push(`/gallery/${gallery?.id}`))
      .catch(error => console.log(error));
  };

  if (!gallery) return null;

  if (gallery?.userID !== user?.id) router.push(`/gallery/${gallery?.id}`);

  const isDisabled = gallery.status !== 'Draft';

  return (
    <div>
      <Form onFinish={onSubmit} layout={'vertical'} initialValues={initialValues}>
        <ProfileBackground
          bannerImage={bannerFileInfo ? bannerFileInfo.path : initialValues.bannerFileInfo}
          className={styles.profileBackgroundBackground}
          leftButton={
            <Upload
              beforeUpload={beforeUploadBg}
              showUploadList={false}
              customRequest={upploadBanner}
            >
              <button type="button" className="btn-link-white-rounded">
                Choose Banner <img src="/icons/icon-choose-banner.svg" alt="Choose Banner icon" />
              </button>
            </Upload>
          }
        />
        <Row justify={'space-between'} style={{ marginTop: 40 }}>
          <Col>
            <div className={styles.wrapperAvatar}>
              {avatarFileInfo ? (
                <img src={avatarFileInfo?.path} className={styles.uploadImg} alt="avatar" />
              ) : (
                <img src={initialValues.avatarFileInfo} className={styles.uploadImg} alt="avatar" />
              )}
              <Upload
                beforeUpload={beforeUpload}
                showUploadList={false}
                customRequest={uploadAvatar}
              >
                <Button className={styles.changeBtn}>
                  Change avatar
                </Button>
              </Upload>
            </div>
          </Col>
          <Col xs={24} md={18} lg={14}>
            <h2 className="section_title">Information</h2>
            <Form.Item
              rules={[
                { required: true, message: 'Enter name' },
                { min: 2, message: 'Name must be minimum 3 characters.' },
                { max: 40, message: 'Name must be maximum 40 characters.' },
              ]}
              name={'name'}
              label={'name'}
            >
              <Input name={'name'} className={styles.input} placeholder={'Add name'} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Description should not be empty.' },
                { min: 2, message: 'Description must be minimum 3 characters.' },
                { max: 500, message: 'Description must be maximum 500 characters.' },
              ]}
              name={'description'}
              label={'description'}
            >
              <Input
                name={'description'}
                className={styles.input}
                placeholder={'Add description'}
              />
            </Form.Item>
            <Form.Item
              rules={[{ type: 'number', min: 0, max: 100, message: 'Please enter correct amount' }]}
              name={'fee'}
              label={'fee'}
            >
              <InputNumber
                formatter={(value: any) => value.replace(/[^0-9]/g, '')}
                name={'fee'}
                className={styles.input}
                placeholder={'Add fee'}
              />
            </Form.Item>
            <Form.Item name={'hashtags'} label={'Hashtags'}>
              <Input name={'hashtags'} className={styles.input} placeholder={'Add hashtags'} />
            </Form.Item>
            <Row gutter={20} wrap={false}>
              <Col>
                <p className={styles.setTiming}>Show gallery</p>
              </Col>
              <Col>
                <Switch
                  className={'edit-gallery-switch'}
                  onChange={() => setChecked(!checked)}
                  checked={checked}
                />
              </Col>
            </Row>
          </Col>
          <Col style={{ marginBottom: 20 }}>
            <Button id={'openModal'} onClick={showModal}>
              Share your social
            </Button>
            <SocialFormGallery linksList={linksList} loadLinks={loadLinks} />
          </Col>
        </Row>
        <Row justify={'start'}>
          <Col>
            <Button
              disabled={isSubmitting}
              htmlType="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button disabled={isSubmitting} htmlType={'submit'} className={styles.submitBtn}>
              Submit
            </Button>
          </Col>
          {!isDisabled && (
            <Col>
              <Button
                disabled={isSubmitting}
                htmlType={'submit'}
                onClick={handleSendForReview}
                className={`${styles.cancelBtn} ${styles.approve}`}
              >
                Send for approval
              </Button>
            </Col>
          )}
        </Row>
      </Form>
      <Modal title="Share your social" visible={visible} footer={null} onCancel={closeModal}>
        <ModalGalleryNetworks galleryID={gallery?.id} linksList={linksList} loadLinks={loadLinks} />
      </Modal>
    </div>
  );
};

export default EditGalleryForm;
