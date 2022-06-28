import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import ProductSellForm from 'components/Site/ProductDetail/ProductSellForm';
import { TGallery } from 'core/constants/types';
import { GalleriesServices } from 'core/services/galleries';
import { TAppState } from 'core/store';
import { ProductsServices } from '../../../core/services';

interface Props {
  product: any;
  loadProducts: () => void;
  galleryID?: number;
  closeModal: () => void;
}

const ModalArtworkProposal: FC<Props> = ({ product, loadProducts, galleryID, closeModal }) => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [gallery, setGallery] = useState<TGallery | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const ownerData = product?.owners && user ? product.owners.find((item: any) => item.userID === user.id) : null;

  if (ownerData) {
    ownerData.countCanSell = (ownerData?.amount || 0) - (ownerData?.amountListed || 0);
  }

  useEffect(() => {
    GalleriesServices.get(Number(galleryID))
      .then(gallery => setGallery(gallery))
      .catch(error => console.log(error));

    ProductsServices.getProduct({ id: product.productID })
      .then(res => setUpdatedProduct({ ...updatedProduct, token: res?.token, contract: res?.contract }))
      .catch(err => console.log(err));
  }, []);

  const handleSuccess = () => {
    message.success('Proposal was successfully sended');
    closeModal();
    loadProducts();
  };

  if (!gallery) return null;

  return (
    <div>
      <ProductSellForm gallery={gallery} onSuccess={handleSuccess} ownerData={ownerData} product={updatedProduct} />
    </div>
  );
};

export default ModalArtworkProposal;
