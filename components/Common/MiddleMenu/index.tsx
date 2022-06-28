import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import Link from 'next/link';
import { getQueryParams } from 'core/helpers';
import { message } from 'antd';
import AuthModal from '../../Site/AuthModal';
import styles from './MiddleMenu.module.scss';
import useWallet from 'core/hooks/useWallet';

export const MiddleMenu: FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const { address, connect } = useWallet();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const { a, id, code } = getQueryParams();
    if (a && id && code && a === 'confirm') {
      setIsConfirm(true);
      setAuthModalVisible(true);
    }
  }, []);

  const onSignIn = (e: any): void => {
    e.preventDefault();
    setAuthModalVisible(true);
  };

  const handleConfirmSuccess = (): void => {
    message.info('Password changed');
    setIsConfirm(false);
    setAuthModalVisible(false);
    setAuthModalVisible(true);
  };

  return (
    <section className="container">
      <ul className={styles.middlemenu}>
        <li onClick={user?.id ? connect : onSignIn} className={styles.middlemenu__item}>
          <div className={styles.middlemenu__btn}>
            <img src="/icons/home-board-info/icon-set-up-wallet.svg" alt="Set up your wallet" />
          </div>
          <div>
            Set up
            <span>your wallet</span>
          </div>
        </li>
        {user?.id ? (
          <li className={styles.middlemenu__item}>
            <Link href="/my/create">
              <a>
                <div className={styles.middlemenu__item}>
                  <div className={styles.middlemenu__btn}>
                    <img src="/icons/home-board-info/icon-add-nfts.svg" alt="Add your NFTs" />
                  </div>
                  <div>
                    Add
                    <span>your NFTs</span>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ) : (
          <li onClick={onSignIn} className={styles.middlemenu__item}>
            <div className={styles.middlemenu__btn}>
              <img src="/icons/home-board-info/icon-add-nfts.svg" alt="Add your NFTs" />
            </div>
            <div>
              Add
              <span>your NFTs</span>
            </div>
          </li>
        )}
        {user?.id ? (
          <li className={styles.middlemenu__item}>
            <Link href="/my/collections">
              <a>
                <div>
                  <div className={styles.middlemenu__btn}>
                    <img
                      src="/icons/home-board-info/icon-create-collections.svg"
                      alt="Create collections"
                    />
                  </div>
                  <div>Collections</div>
                </div>
              </a>
            </Link>
          </li>
        ) : (
          <li onClick={onSignIn} className={styles.middlemenu__item}>
            <div className={styles.middlemenu__btn}>
              <img
                src="/icons/home-board-info/icon-create-collections.svg"
                alt="Create collections"
              />
            </div>
            <div>Collections</div>
          </li>
        )}
        <li className={styles.middlemenu__item}>
          <Link href="/marketplace">
            <a>
              <div>
                <div className={styles.middlemenu__btn}>
                  <img
                    src="/icons/home-board-info/icon-least-them-for-sale.svg"
                    alt="Least them for sale"
                  />
                </div>
                <div>
                  Explore the
                  <span>marketplace</span>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li className={styles.middlemenu__item}>
          <div className={styles.middlemenu__btn}>
            <img src="/icons/home-board-info/icon-beginners-guide.svg" alt="Beginners guidet" />
          </div>
          <div>
            Beginners
            <span>guide</span>
          </div>
        </li>
      </ul>
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
