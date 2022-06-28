import React from 'react';
import styles from './price.module.scss';
import { getBalanceString, getPriceStr } from '../../../../core/helpers';
import { useSelector } from 'react-redux';
import { TAppState } from '../../../../core/store';

interface Props {
  product: any;
}

const ProductPrice: React.FC<Props> = ({ product }) => {
  const rates: any = useSelector((state: TAppState) => state.rates);

  const priceEth: string = product?.minimalPrice
    ? getBalanceString(Number(getPriceStr(product.minimalPrice)), 2, 5)
    : '0';
  const priceCurrency: number = rates.isLoaded && Number(priceEth) > 0 ? Number(priceEth) * rates.rates.usd : 0;

  if (!Number(priceEth)) return null;

  return (
    <div className={styles.price}>
      <div className={styles.price__amount}>
        {`${priceEth} ETH`}
        {priceCurrency ? (
          <span>{`( ${priceCurrency.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })} )`}</span>
        ) : null}
      </div>
      <p className={styles.price__description}>Current price</p>
    </div>
  );
};

export default ProductPrice;
