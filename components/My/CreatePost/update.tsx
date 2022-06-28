import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, message, Row, Space } from 'antd';
import AddCollection from './AddCollection';
import WorkSetup from './WorkSetup';
import { ProductsServices } from 'core/services';
import Preview from './Preview';
import useWallet from 'core/hooks/useWallet';
import { useRouter } from 'next/router';
import { useSubmit } from 'core/hooks';
import { OrdersServices } from 'core/services/orders';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import styles from './createPost.module.scss';

interface Product {
  isAuthorized?: boolean;
  author?: any;
  userPreviewFilePath?: string;
  userName?: string;
  collections?: any;
  countLikes?: any;
  countViews?: any;
  dateCreated?: any;
  description?: string;
  fileID?: any;
  id?: any;
  previewFilePath?: string;
  liked?: boolean;
  name?: string;
  ownerAvatar?: string;
  ownerName?: string;
  previewFileID?: any;
  sale?: any;
  status?: string;
  tags?: [];
  type?: string;
  categoryID?: any;
  userID?: any;
  amount?: any;
}

const UpdatePost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = Array.isArray(id) ? id[0] : id || '';
  const user = useSelector((state: TAppState) => state.session.user);
  const { address, connect } = useWallet();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();
  const [preview, setPreview] = useState({ title: '', description: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [productData, setProductData] = useState({} as Product);
  const [collectionsID, setCollectionsID] = useState<any>([]);
  const [isSubmittingApprove, setIsSubmittingApprove] = useState(false);
  const [onApprove, setOnApprove] = useState(false);

  const onChangeCollections = (collectionsID: []) => {
    setCollectionsID(collectionsID);
  };

  const loadProduct = async () => {
    try {
      const loadedProduct = await ProductsServices.getProductById(idProduct);
      loadedProduct.sales = await OrdersServices.search({ productID: id, type: 'Sale' }).catch(() => []);
      setProductData(loadedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);

  let tags = '';
  productData.tags?.map((item: any) => {
    tags = tags + item.value + ',';
  });

  tags = tags.slice(0, -1);

  const tagsToDelete: Array<any> = [];
  productData?.tags?.map((item: any) => {
    tagsToDelete.push(item.id);
  });
  const collectionArray: Array<any> = [];
  productData?.collections?.map((item: any) => {
    collectionArray.push(item.collectionID);
  });
  const collectionToDelete: Array<any> = [];
  productData?.collections?.map((item: any) => {
    collectionToDelete.push(item.id);
  });

  const initialValues = {
    category: productData.categoryID,
    description: productData.description,
    file: [],
    hashtag: tags,
    title: productData.name,
    amount: productData.amount,
    collection: collectionArray,
  };

  const onSubmit = (values: any) => {
    const productUpdate = {
      id: productData.id,
      name: values.title,
      description: values.description,
      amount: values.amount,
      ... values.category ? { categoryID: Number(values.category) } : {},
    };
    const tags = values?.hashtag ? values.hashtag.split(',').map((item: string) => item.trim()) : [];
    submit(
      ProductsServices.updateWithCollections,
      { productUpdate, tagsToDelete, tags, collectionToDelete: collectionToDelete, collectionID: collectionsID.length ? collectionsID : values.collection },
      () => {
        message.success('Changes saved successfully');
        if (onApprove) {
          ProductsServices.review({ id: productData.id })
            .then(() => {
              router.push(`/product/${productData.id}`)
            })
            .catch(error => {
              console.log(error);
            })
          setOnApprove(false);
        } else {
          router.back();
        }
      },
      error => {
        console.log(error);
      },
    );
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
  } else {
    if (user?.id !== productData?.userID) {
      return <div>You cannot edit this product</div>;
    }
  }

  return (
    <Form form={form} initialValues={initialValues} layout="vertical" name="create_form" onFinish={onSubmit}>
      {productData.status !== 'Draft' ? <h2>This product cannot be changed.</h2> : null}
      <Row gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <WorkSetup onChange={onChange} />
          {errorMessage && <div className="form-message-error">{errorMessage}</div>}
        </Col>
        <Col xs={24} md={12} xl={{ span: 7, offset: 5 }}>
          <Preview
            title={productData.name}
            image={productData.previewFilePath}
            avatar={productData.userPreviewFilePath}
          />
        </Col>
      </Row>
      <AddCollection
        onChangeCollections={onChangeCollections}
        selectedCollections={collectionArray}
        hideSearch
      />
      {productData.status === 'Draft' ? (
        <div className={styles.buttonWrapper}>
          <div>
            <Button size="large" type="default" htmlType="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button size="large" type="primary" htmlType="submit" style={{ marginLeft: '15px' }}>
              Update draft
            </Button>
          </div>
          <Space>
            <Button htmlType="submit" disabled={isSubmittingApprove} onClick={() => setOnApprove(true)}>Send to review</Button>
          </Space>
        </div>
      ) : null}
    </Form>
  );
};

export default UpdatePost;
