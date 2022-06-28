import React from 'react';
import styles from '../index.module.scss';
import { Col, Row, Space, Popover } from 'antd';

type Props = {
  gallery: any;
  showStatus?: boolean;
};

const GalleryCard: React.FC<Props> = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.gallery?.previewFilePath} alt="banner" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          {props.gallery?.name.split(' ').length === 1 && props.gallery?.name.length > 14 ? (
            <div className="long-information">
              <p className={styles.author}>
                {props.gallery?.name.substr(0, 13)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.gallery?.name}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.gallery?.name?.split(' ')[0].substr(0, 14)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`}>
                {props.gallery?.name
                  ?.split(' ')
                  .slice(1, props.gallery?.name.split(' ').length)
                  .join(' ')
                  .substr(0, 15)}{' '}
                {props.gallery?.name.split(' ').slice(1, props.gallery?.name.split(' ').length).join(' ').length > 15
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        <div className={styles.footer}>
          <Row justify={'space-between'} align={'middle'}>
            <Col>{props.showStatus && props.gallery?.status}</Col>
            <Col>
              <Space direction={'horizontal'} align={'baseline'}>
                <h4 className={styles.likesCount}>{props.gallery?.countLikes}</h4>
                <img src={'/icons/icon-like.svg'} alt={'Like'} />
              </Space>
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default GalleryCard;
