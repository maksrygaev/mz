import React from 'react';
import Link from 'next/link';
import { Col, Row, Space, Popover } from 'antd';
import styles from '../index.module.scss';
import { getPriceStr } from 'core/helpers/getPriceStr';

type Props = {
  artwork: any;
  hideFooter?: boolean;
};

const ArtworksCard = (props: Props) => {
  return (
    <a className={styles.link}>
      <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
        <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
          <div className={styles.mainWrapper}>
            <div className={styles.imgWrapper}>
              <img className={styles.img} src={props.artwork?.previewFilePath} alt="banner" />
            </div>
          </div>
        </div>
        {props.artwork?.cathegory && (
          <div className={`${styles.cathegory} ${styles.border}`}>
            <img src={`/icons/explore/icon-${props.artwork?.cathegory.toLowerCase()}.svg`} alt="" />
          </div>
        )}
      </div>
      <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
        {props.artwork?.name?.split(' ').length === 1 && props.artwork?.name?.length > 12 ? (
          <div className="long-information">
            <p className={styles.author}>
              {props.artwork?.name?.substr(0, 11)}
              <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.artwork?.name}</div>}>
                ...
              </Popover>
            </p>
          </div>
        ) : (
          <>
            <p className={styles.author}>{props.artwork?.name?.split(' ')[0].substr(0, 12)}</p>
            <p className={`${styles.author__bottom} ${styles.author}`} style={{wordBreak: 'break-all'}}>
              {props.artwork?.name
                ?.split(' ')
                .slice(1, props.artwork?.name?.split(' ').length)
                .join(' ')
                .substr(0, 13)}{' '}
              {props.artwork?.name?.split(' ').slice(1, props.artwork?.name?.split(' ').length).join(' ').length > 13
                ? '...'
                : ''}
            </p>
          </>
        )}
      </div>
      {props?.artwork?.minimalPrice && (
        <div className={styles.middle}>
          <h4 className={styles.price}>
            {props?.artwork?.minimalPrice ? getPriceStr(props.artwork.minimalPrice) : ''} ETH
          </h4>
          <h4 className={styles.middle__name}>Last trade</h4>
        </div>
      )}
      {!props.hideFooter && (
        <div style={{ bottom: 10 }} className={styles.footer}>
          <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
            <Col>
              {props.artwork?.status === 'Moderation' && (
                <p className={styles.userInfo__name}>{props.artwork?.status}</p>
              )}
              {props.artwork?.status === 'Draft' && (
                <p className={styles.userInfo__name}>
                  <Link href={`/my/product/${props.artwork?.id}/edit`}>
                    <a style={{ color: 'black', marginRight: '30px' }}>
                      <span>Edit Draft</span>
                    </a>
                  </Link>
                </p>
              )}
            </Col>
            {props.artwork?.status === 'Published' && (
              <Col>
                <Space direction={'horizontal'} align={'baseline'}>
                  <h4 style={{ paddingTop: 6 }} className={styles.likesCount}>
                    {props.artwork?.countLikes}
                  </h4>
                  <img src={'/icons/icon-like.svg'} alt={'Like'} />
                </Space>
              </Col>
            )}
          </Row>
        </div>
      )}
    </a>
  );
};

export default ArtworksCard;
