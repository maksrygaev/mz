import React, { useCallback, useState, FC } from 'react';
import { Button, Col, Form, Row } from 'antd';
import AddCollection from './AddCollection';
import Download from './Download';
import WorkSetup from './WorkSetup';
import { ProductsServices } from 'core/services';
import Preview from './Preview';
import useWallet from 'core/hooks/useWallet';
import { useRouter } from 'next/router';
import { useSubmit } from 'core/hooks';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { Element, scroller } from 'react-scroll';
import style from './create.module.scss';

const FILE_TYPES: string[] = ['Image', 'Video', 'Audio'];

const CreatePost: FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const router = useRouter();
  const { address, connect } = useWallet();
  const [form] = Form.useForm();
  const { submit } = useSubmit();
  const [preview, setPreview] = useState({ title: '', description: '' });
  const [backgroundInfo, setBackgroundInfo] = useState<any>(null);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [fileType, setFileType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isForDraft, setIsForDraft] = useState<boolean>(true);
  const [collectionsID, setCollectionsID] = useState([]);

  const onChangeCollections = (collectionsID: []) => {
    setCollectionsID(collectionsID);
  };

  const avatarImage = user?.avatarSrc ? user.avatarSrc : '/icons/userpage/user-default.jpg';

  const initialValues = {
    background: 0,
    category: null,
    description: '',
    file: 0,
    hashtag: '',
    title: '',
    amount: 1,
  };

  const optionsScroll = {
    duration: 1000,
    delay: 100,
    smooth: true,
    offset: -100,
  };

  const onSubmit = (values: any): void => {
    if (fileInfo === '') {
      scroller.scrollTo('addImagesScroll', optionsScroll);
      return;
    }
    if (backgroundInfo === '') {
      scroller.scrollTo('addImagesScroll', optionsScroll);
      return;
    }
    const productData = {
      walletAddress: address,
      name: values.title,
      description: values.description,
      contentFileID: fileInfo?.id,
      previewFileID: backgroundInfo?.id,
      type: fileType,
      galleryID: Number(router.query?.galleryid),
      ... values.category ? { categoryID: values.category } : {},
      amount: values.amount,
    };

    const tags = values?.hashtag ? values.hashtag.split(',').map((item: string) => item.trim()) : [];
    let tagErr = false;
    tags.map((item: string) => {
        if (item.length > 100) {
          tagErr = true;
        }
      }
    );
    if (!tagErr) {
      submit(
        ProductsServices.create,
        { productData, collectionID: collectionsID, tags, withReview: isForDraft },
        response => router.push(`/product/${response}`),
        error => {
          console.log(error);
          setErrorMessage(error.message);
        },
      );
    } else {
      setErrorMessage('Each hashtag must be maximum 100 characters.');
    }
  };

  const onFinishFailed = (): void => {
    scroller.scrollTo('workSetupScroll', optionsScroll);
  };

  const handleOnDownload = (background: any) => {
    setBackgroundInfo(background);
  };

  const handleOnDownloadFile = (file: any, mimeType: string): void => {
    const type = FILE_TYPES.find(t => mimeType.includes(t.toLowerCase())) || 'Other';
    setFileType(type);
    setFileInfo(file);
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const current = e.target.value;
      setPreview({ ...preview, [e.target.name]: current });
    },
    [preview, setPreview],
  );

  if (!address) {
    return <Button onClick={connect}>Connect Metamask</Button>;
  }

  return (
    <>
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        name="create_form"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        className="upload-product upload-collection"
      >
        <h1 className={style.title}>Create artwork</h1>

        <Row gutter={[30, 30]}>
          <Col xs={24} md={13}>
            <Element name="addImagesScroll" />
            <Download onDownloadBackground={handleOnDownload} onDownloadFile={handleOnDownloadFile} />
            <Element name="workSetupScroll" />
            <WorkSetup onChange={onChange} />
            {errorMessage && <div className="form-message-error">{errorMessage}</div>}
          </Col>
          <Col xs={24} md={11}>
            <Preview
              title={preview.title}
              image={backgroundInfo ? backgroundInfo?.path : '/images/preview-artwork.png'}
              avatar={avatarImage}
              author={(user?.name as string).length > 20 ? `${user?.name.slice(0, 20)} ...` : user?.name || 'Master'}
            />
          </Col>
        </Row>
        <AddCollection onChangeCollections={onChangeCollections} hideSearch={true} />
        <Row justify={'center'} align={'middle'}>
          <>
            <Col style={{ marginTop: '25px', marginRight: 20, textAlign: 'center' }}>
              <Button
                onClick={() => setIsForDraft(true)}
                htmlType="submit"
                className="btn btn-rounded-small-black-border-white-text "
              >
                Send for approval
              </Button>
            </Col>
          </>
          <Col style={{ marginTop: '25px', textAlign: 'center' }}>
            <Button
              htmlType="submit"
              onClick={() => setIsForDraft(false)}
              className="btn btn-rounded-small-black-border-white-text "
            >
              Save draft
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreatePost;
