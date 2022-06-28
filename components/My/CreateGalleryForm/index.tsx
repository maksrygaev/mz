import React, { useState, useEffect } from 'react';
import { Upload, Button, Col, Form, Row, Input, Switch, Modal, InputNumber } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FilesServices, LinksServices } from 'core/services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { request, requiredRule, urlRule } from 'core/helpers';
import { GalleriesServices } from 'core/services/galleries';
import { TAppState } from 'core/store';
import { socialOptions } from '../Profile/Edit/SocialBlock/options';
import { useSubmit } from 'core/hooks';
import {TFile} from "core/constants/types";
import styles from './createGallery.module.scss';

type TInitialValues = {
  avatarFileInfo: any;
  bannerFileInfo: any;
  description: string;
  fee: number;
  name: string;
  hashtags: any;
}

const CreateGallery = () => {
  const [checked, setChecked] = useState(true);
  const [bannerFileInfo, setBannerFileInfo] = useState<TFile | null>(null);
  const [avatarFileInfo, setAvatarFileInfo] = useState<TFile | null>(null);
  const [bannerFileError, setBannerFileError] = useState<string>('');
  const [avatarFileError, setAvatarFileError] = useState<string>('');
  const [galleryLinks, setGalleryLinks]:any[] = useState([]);
  const { clearError, errorCode, isSubmitting, submit  } = useSubmit();
  const [socialData, setSocialData]:any[] = useState([])
  const [form] = Form.useForm();
  const id = useSelector((state: TAppState) => state.session.user)?.id;
  const initialValues: TInitialValues = {avatarFileInfo: '', bannerFileInfo: '', description: '', name: '', fee: 0, hashtags: ''};
  const [visible, setVisible] = useState<boolean>(false);
  const [isForReview, setIsForReview] = useState(true);

  const router = useRouter();
  const onSubmit = (values: TInitialValues) => {
    const galleryFee = values.fee < 1 && values.fee > 0 ? Math.ceil(values.fee) : Math.round(values.fee);
    if(avatarFileInfo === null && bannerFileInfo === null) {
      setBannerFileError('Upload banner')
      setAvatarFileError('Upload avatar')
    } else {
      const data = {
        contentFileID: avatarFileInfo?.id,
        previewFileID: bannerFileInfo?.id,
        description: values.description,
        type: 'Standard',
        name: values.name,
        fee: galleryFee,
        availability: checked ? 'Opened' : 'Closed'
      };
      const tags = values?.hashtags ? values.hashtags.split(' ') : [];

      submit(
        GalleriesServices.create,
        { data, tags: tags, forReview: isForReview },
        response => router.push(`/gallery/${response}`),
        error => console.log(error)
      );
    }
  }

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const upploadAvatar = (info: any) => {
    const data = new FormData();
    data.append('file', info.file);
    FilesServices.fileUpload(data)
    .then(response => setAvatarFileInfo(response))
    .catch(err => console.log(err));
  }

  useEffect(() =>  {
    loadLinks();
    DATAFUNC();
  },[])

  const loadLinks = () => {
    LinksServices.linksFetchGallery({ id })
      .then(response => setGalleryLinks(response))
      .catch(() => []);
  };

  const DATAFUNC =  async () => {
    const data = {}
      const DATA = await request({url: `/networks/search`, data});
      setSocialData(DATA)
      return DATA
  }

  const onSubmitLink = (values: any) => {
    const obj = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != null));
    for (const key in obj){
      const idForSend = socialData.find((item: { name: string; }) => item.name === key)
      const userValue = {
        networkID: idForSend?.id,
        value: obj[key],
      };
      clearError();
      submit(LinksServices.linksCreateGallery, userValue, response => {
        loadLinks();
        form.resetFields();
      });
    }
  };

  const onSubmitDelete = (values: any) => {
    const id = galleryLinks?.find((id: { id: any; }) => id?.id === values?.id)
    const userValue = { id: id?.id };
    clearError();
    submit(LinksServices.linksDeleteGallery, userValue, response => {
      loadLinks();
      form.resetFields();
    });
  };

  const beforeUpload = (file: any) => {
    setAvatarFileError('')
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      setAvatarFileError('Image should be smaller than 1MB!')
    }
    return isLt2M;
  }
  const beforeUploadBg = (file: any) => {
    setBannerFileError('')
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      setBannerFileError('Image should be smaller than 1MB!')
    }
    return isLt2M;
  }

  const upploadBanner = (info: any) => {
    const data = new FormData();
    data.append('file', info.file);
      FilesServices.fileUpload(data)
      .then(response => setBannerFileInfo(response))
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <h2  className="section_title">Create Gallery</h2>
      <Form onFinish={onSubmit} initialValues={initialValues} layout={'vertical'}>
        <div className={styles.createGalleryForm}>
          <div className={styles.content}>
            <Form.Item
              name={'name'}
              label={'name'}
              rules={[
                { required: true, message: 'Enter name' },
                { min: 2, message: 'Name must be minimum 3 characters.' },
                { max: 40, message: 'Name must be maximum 40 characters.' },
              ]}
            >
              <Input name={'name'} className={styles.input} placeholder={'Add name'} />
            </Form.Item>
            <Form.Item
              name={'description'}
              label={'description'}
              rules={[
                { required: true, message: 'Description should not be empty.' },
                { min: 2, message: 'Description must be minimum 3 characters.' },
                { max: 500, message: 'Description must be maximum 500 characters.' },
              ]}
            >
              <Input name={'description'}className={styles.input} placeholder={'Add description'} />
            </Form.Item>
            <Form.Item rules={[{ type: 'number', min: 0, max: 100, message: 'Please enter correct amount' }]} name={'fee'} label={'fee'}>
              <InputNumber formatter={(value: any) => value.replace(/[^0-9]/g, '')} type={'number'} name={'fee'} className={`${styles.fee_input} ${styles.input}`} placeholder={'Add fee'} />
            </Form.Item>
            <Form.Item
              name={'hashtags'}
              label={'hashtags'}
              rules={[
                { max: 500, validateTrigger: ' ', message: 'Hashtag must be maximum 500 characters.' },
              ]}
            >
              <Input name={'hashtags'} className={styles.input} placeholder={'Add hashtags'} />
            </Form.Item>
            <Row gutter={20}>
              <Col>
                <p className={styles.setTiming}>Show gallery</p>
              </Col>
              <Col>
                <Switch
                  className={'edit-gallery-switch'}
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </Col>
            </Row>
          </div>
          <div style={{width: '5%'}} />
          <div className={styles.content}>
            <div style={{display: 'flex', marginBottom: 7}}>
              <Row gutter={20} align={'bottom'}>
                <Col>
                {avatarFileInfo ? (
                  <img src={avatarFileInfo?.path} className={styles.uploadImg} alt="avatar" />
                ): (
                  <img className={styles.uploadImg} src={'/images/create-element.png'} alt={'avatar'} />
                )}
                </Col>
                <Col>
                {avatarFileError && <p className={'error-text'}>{avatarFileError}</p>}
                  <Upload beforeUpload={beforeUpload} showUploadList={false} customRequest={upploadAvatar}>
                    <Button className={styles.changeBtn}>
                      Change avatar
                    </Button>
                  </Upload>
                  <p className={styles.description}>Recommended picture size <br /> 100х100px</p>
                </Col>
              </Row>
              <Row style={{marginLeft: 20}} gutter={20} align={'bottom'}>
                <Col>
                {bannerFileInfo ? (
                  <img src={bannerFileInfo?.path} className={styles.uploadImg} alt="banner" />
                ): (
                  <img className={styles.uploadImg} src={'/images/create-element.png'} alt={'banner'} />
                )}
                </Col>
                <Col>
                  {bannerFileError && <p className={'error-text'}>{bannerFileError}</p>}
                  <Upload beforeUpload={beforeUploadBg} showUploadList={false} customRequest={upploadBanner}>
                      <Button className={styles.changeBtn}>
                        Choose Banner
                      </Button>
                  </Upload>
                  <p className={styles.description}>Recommended picture size <br /> 1440х360px</p>
                </Col>
              </Row>
            </div>
            <div id={'socialBlock'}>
            {/* <SocialFormGallery />
            <Button id={'openModal'} onClick={showModal}>
              Share your social
            </Button> */}
            </div>
          </div>
        </div>
        <Row justify={'center'} align={'middle'} className={styles.buttons}>
          <>
            <Col className={styles.buttonApproval}>
              <Button
                disabled={isSubmitting}
                onClick={() => setIsForReview(true)}
                htmlType="submit"
                className="btn btn-rounded-small-black-border-white-text "
              >
                Send for approval
              </Button>
            </Col>
          </>
          <Col style={{ marginTop: '25px', textAlign: 'center' }}>
            <Button
              disabled={isSubmitting}
              htmlType="submit"
              onClick={() => setIsForReview(false)}
              className="btn btn-rounded-small-black-border-white-text "
            >
              Save draft
            </Button>
          </Col>
        </Row>
        {/* <Row justify={'center'}>
          <Col>
            <Button htmlType={'submit'} className={styles.submitBtn}>
              Complete
            </Button>
          </Col>
        </Row> */}
      </Form>
      <Modal title="Share your social" visible={visible} footer={null} onCancel={closeModal}>
      <Form
        className='myFormGallery'
        form={form}
        initialValues={{ name: '', link: '' }}
        layout="inline"
        onFinish={onSubmitLink}
      >
            {socialData.map((option: { id: number; name: string | null | undefined; link: React.Key | null | undefined; }) => {
              const findItem = galleryLinks?.find((link: { networkID: number; }) => link.networkID === option.id)
              const img =  socialOptions.find((item) => option.name === item.text)
              return (
                <>
                <div key={option.link}  style={{width:'100%' , height:0.5 , backgroundColor:'black'}}/>
                <div key={option.name}>
                  <div key={option.name} id={'name'}>
                  <span id={'icon'}>
                    {img?.icon}
                  </span>
                  <span>
                    {option.name}
                  </span>
                  </div>
                  {findItem ? (
                    <a href={findItem.value}>
                      {findItem.value}
                    </a>
                  ) : (
                    <Form.Item  name={option.name || undefined} rules={[urlRule('Enter correct url')]}>
                      <Input placeholder="Social url" />
                    </Form.Item>
                  )}
                  {findItem?.value &&
                   // eslint-disable-next-line jsx-a11y/alt-text
                   <Button onClick={() => onSubmitDelete(findItem)} id={'delete'} htmlType="submit" disabled={isSubmitting} icon={<img src="/icons/cross.png" alt={'icon'}/>} />
                  }
                </div>
                </>
              )
            })}
            <Button id={"submit"} htmlType="submit" disabled={isSubmitting}>
              {isSubmitting && <LoadingOutlined />}
              Submit
            </Button>
      </Form>
      </Modal>
    </div>
  );
};

export default CreateGallery;
