import React, { FC, useState, useEffect } from 'react';
import { Col, message, Row } from 'antd';
import ProductListing from './ProductListing';
import ProductSaleSettings from './ProductSaleSettings';
import ProductControls from './ProductControls';
import ProductMediaPlayer from './ProductMediaPlayer';
import ProductDescription from './ProductDescription';
import ProductPlace from './ProductPlace';
import ProductPrice from './ProductPrice';
import ProductOwners from './ProductOwners';
import ProductTags from './ProductTags';
import { ProductsServices } from 'core/services';
import styles from './product.module.scss';
import ProductStatus from './ProductStatus';

interface IProps {
  id: string;
  product: any;
}

const ProductDetail: FC<IProps> = ({ id, product }) => {
  const [productData, setProductData] = useState(product);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadProduct = async (): Promise<void> => {
    try {
      const product = await ProductsServices.getProductById(id);
      product.owners = await ProductsServices.getOwnersById({ productID: id }).catch(() => []);
      setProductData(product);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleSuccess = (text = 'This is success message!'): void => {
    message.success(text);
    loadProduct();
  };

  const handleSuccessMint = (): void => {
    message.success('Was minted successfully!');
    loadProduct();
  };

  if (!productData) {
    return (
      <section className="container_first">
        <h1>{errorMessage}</h1>
      </section>
    );
  }

  return (
    <section className="container_first">
      <Row justify="space-between">
        <Col xs={24} sm={24} md={10}>
          <ProductMediaPlayer productData={productData} customControls={false} />
          <ProductControls productData={productData} id={id} />
          <ProductDescription productData={productData} />
        </Col>
        <Col xs={24} sm={24} md={13}>
          <h1 className={styles.product__name} style={{ wordBreak: 'break-all' }}>
            {productData?.name}
          </h1>
          <ProductStatus product={productData} />
          <ProductPrice product={productData} />
          <ProductSaleSettings productData={productData} onSuccess={handleSuccess} onSuccessMint={handleSuccessMint} />
          <ProductOwners owners={productData?.owners || []} />
          <ProductTags product={productData} />
          <ProductPlace product={productData} />
          {productData?.sales?.length > 0 || productData?.auctions.length > 0 ? (
            <ProductListing product={productData} onSuccess={handleSuccess} />
          ) : null}
        </Col>
      </Row>
    </section>
  );
};

export default ProductDetail;
