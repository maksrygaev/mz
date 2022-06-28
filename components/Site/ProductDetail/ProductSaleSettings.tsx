import React, {useEffect, useState} from 'react';
import { Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import ProductSellForm from './ProductSellForm';
import { TAppState } from 'core/store';
import { ProductsServices } from 'core/services';
import useWallet from '../../../core/hooks/useWallet';
import styles from './product.module.scss';

const ProductSaleSettings = ({ productData, onSuccess, onSuccessMint }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user: any = useSelector((state: TAppState) => state.session.user);
  const { address, mintNFT } = useWallet();

  const ownerData =
    productData?.owners && user ? productData.owners.find((item: any) => item.userID === user.id) : null;

  if (ownerData) {
    ownerData.countCanSell = (ownerData?.amount || 0) - (ownerData?.amountListed || 0);
  }

  const handleApprove = (): void => {
    setIsSubmitting(true);
    ProductsServices.approve({ id: productData.id })
      .then(() => {
        setIsSubmitting(false);
        onSuccess();
      })
      .catch(error => {
        setIsSubmitting(false);
        console.log(error);
      });
  };

  const handleMintNFT = (): void => {
    setIsSubmitting(true);
    mintNFT(productData.metadataHash, productData.amount)
      .then(() => {
        setTimeout(() => {
          setIsSubmitting(false);
          onSuccessMint();
        }, 12000);
      })
      .catch(error => {
        setIsSubmitting(false);
        console.log(error);
      });
  };

  if (!ownerData?.countCanSell && user?.role !== 'Administrator') return null;

  return (
    <div className={styles.product__user}>
      <Space>
        {ownerData && ownerData?.countCanSell > 0 && (
          <button className="ant-btn btn btn-rounded-black" style={{ marginRight: '10px', width: '200px' }}>
            Sale settings
          </button>
        )}
        {(productData?.userID === user?.id && !productData?.contract && address) && (
          <Button
            className="ant-btn btn btn-rounded-white-black-border"
            onClick={handleMintNFT}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Mint NFT
          </Button>
        )}
        {user?.role === 'Administrator' && productData?.status === 'Moderation' && (
          <Button
            className="ant-btn btn btn-rounded-white-black-border"
            onClick={handleApprove}
            disabled={isSubmitting}
          >
            Approve
          </Button>
        )}
      </Space>
      {productData?.userID === user?.id && (
        <ProductSellForm product={productData} ownerData={ownerData} onSuccess={onSuccess} disabled={isSubmitting} />
      )}
    </div>
  );
};

export default ProductSaleSettings;
