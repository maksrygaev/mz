import { FC } from 'react';
import styles from './product.module.scss';
import { useSelector } from 'react-redux';
import { TAppState } from '../../../core/store';

interface Props {
  product: any;
}

const ProductStatus: FC<Props> = ({ product }) => {
  const user: any = useSelector((state: TAppState) => state.session.user);
  if (product?.status !== 'Moderation' || user?.role === 'Administrator') return null;
  return <p className={styles.product__status}>Please wait for the admin approval to put up your artwork for sale.</p>;
};

export default ProductStatus;
