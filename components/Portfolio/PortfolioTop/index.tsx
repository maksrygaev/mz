import React, { useEffect, useState } from 'react';
import { ProductsServices, UsersServices } from 'core/services';
import { Col, Row, Tooltip, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SocialNetworkLink from 'components/Common/SocialItem/SocialNetworkLink';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { TUserNetwork } from 'core/constants/types';
import { ellipseAddress } from 'core/helpers';
import styles from './PortfolioTop.module.scss';

interface IProfile {
  follow?: boolean;
  settings?: boolean;
  userData?: any;
  linksList?: any;
}

export const PortfolioTop = ({ follow, settings, userData, linksList }: IProfile): JSX.Element => {
  const [followers, setFollowers] = useState<number>(userData?.countFollowers);
  const [isLiked, setIsLiked] = useState<boolean>(userData?.liked || false);
  const [likes, setLikes] = useState<number>(userData?.countLikes || 0);
  const [productsCount, setProductsCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (userData) {
      ProductsServices.productsCount({ userID: userData?.id })
        .then(rs => setProductsCount(rs))
        .catch(error => console.log(error));
    }
  }, [userData]);

  useEffect(() => setFollowers(userData?.countFollowers), [userData?.countFollowers]);
  useEffect(() => setIsLiked(userData?.liked || false), [userData?.liked]);
  useEffect(() => setLikes(userData?.countLikes || 0), [userData?.countLikes]);

  const handleLike = async () => {
    try {
      await UsersServices.likesAdd({ id: userData?.id });
      setIsLiked(true);
      setLikes(likes + 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  const handleUnLike = async () => {
    try {
      await UsersServices.likesRemove({ id: userData?.id });
      setIsLiked(false);
      setLikes(likes - 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Row className={styles.portfoliotop__social} justify={'space-between'}>
        <Col>
          <ul className={styles.list}>
            {linksList?.map((link: TUserNetwork) => (
              <li key={link.id}>
                <SocialNetworkLink link={link} />
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <div className={styles.portfoliotop__social__right}>
            <button onClick={isLiked ? handleUnLike : handleLike} style={{ border: 'none', backgroundColor: 'white' }}>
              <div className={styles.portfoliotop__btn}>{isLiked ? <HeartFilled /> : <HeartOutlined />}</div>
            </button>
          </div>
        </Col>
      </Row>
      <>
        <h2 className={styles.portfoliotop__title} style={{wordBreak: 'break-all'}}>{userData?.name}</h2>
        <p className={styles.portfoliotop__biography} style={{wordBreak: 'break-all'}}>{userData?.biography}</p>
        <div className={styles.wallet}>
          <span className={styles.wallet__info}>Public wallet address:</span>
          <span style={{ cursor: 'pointer' }}>
            <CopyToClipboard text={userData?.walletAddress} onCopy={() => message.info('Copied!')}>
              <Tooltip placement="right" title={'Copy'}>
                <span style={{ marginRight: '3px' }}>{ellipseAddress(userData?.walletAddress, 10)}</span>
                <CopyOutlined />
              </Tooltip>
            </CopyToClipboard>
          </span>
        </div>
        <div className={styles.portfoliotop__data}>
          <div className={styles.portfoliotop__data__item}>
            {productsCount}
            <span>{productsCount === 1 ? 'Artwork' : 'Artworks'}</span>
          </div>
          <div className={styles.portfoliotop__data__item}>
            {likes}
            <span>{likes === 1 ? 'like' : 'likes'}</span>
          </div>
        </div>
      </>
    </div>
  );
};
