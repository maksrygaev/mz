import React, { FC, useEffect, useState } from 'react';
import { Button, Carousel, message } from 'antd';
import { settingsWithOneElement } from 'core/config/carousel';
import Link from 'next/link';
import TrendingNowCard from '../Cards/TrendingNowCard';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { getQueryParams } from 'core/helpers';
import AuthModal from '../../Site/AuthModal';
import promoCarusel from './PromoCarusel.module.scss';
import styles from '../Cards/index.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { settings } from 'core/config/carousel';

interface IProps {
  data: any;
}

export const PromoCarusel: FC<IProps> = ({ data }) => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // @ts-ignore
    const { a, id, code } = getQueryParams();
    if (a && id && code && a === 'confirm') {
      setIsConfirm(true);
      setAuthModalVisible(true);
    }
  }, []);

  const onSignIn = (e: any) => {
    e.preventDefault();
    setAuthModalVisible(true);
  };

  const handleConfirmSuccess = () => {
    message.info('Password changed');
    setIsConfirm(false);
    setAuthModalVisible(false);
    setAuthModalVisible(true);
  };
  return (
    <section className={`container top-carousel ${promoCarusel.container}`}>
      <ul className={promoCarusel.list}>
        <Carousel  className={`carousel-promo`} {...settingsWithOneElement}>
          {data.map((product: any) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <li className={`${styles.card} ${styles.card__promo}`}>
                <TrendingNowCard bigCard hideMiddleBlock item={product} />
              </li>
            </Link>
          ))}
        </Carousel>
      </ul>
      <div className={promoCarusel.content_description}>
        <div>
          <Link href="/marketplace">
            <Button
              className={`btn btn-rounded-black ${promoCarusel.btn}`}
              style={{ width: '180px', fontSize: '20px', letterSpacing: '2px' }}
            >
              {t('common:explore')}
            </Button>
          </Link>
          {user?.id ? (
            <Link href="/my/create">
              <Button
                className="btn btn-rounded-white-black-border"
                style={{ width: '180px', fontSize: '20px', letterSpacing: '2px' }}
              >
                {t('common:create')}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={onSignIn}
              className="btn btn-rounded-white-black-border"
              style={{ width: '180px', fontSize: '20px', letterSpacing: '2px' }}
            >
              {t('common:create')}
            </Button>
          )}
        </div>
      </div>
      {authModalVisible && (
        <AuthModal
          onClose={() => setAuthModalVisible(false)}
          isConfirm={isConfirm}
          onConfirmSuccess={handleConfirmSuccess}
        />
      )}
    </section>
  );
};
