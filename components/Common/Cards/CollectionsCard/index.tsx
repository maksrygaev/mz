import React from 'react';
import Link from 'next/link';
import { Avatar, Col, Popover, Row, Space } from 'antd';
import styles from '../index.module.scss';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  collection: any;
};

const CollectionsCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={props.collection?.previewFilePath ? props.collection?.previewFilePath : '/item-images/no-data.png'}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={`title-card-check ${styles.title}`}>
          {props.collection?.name?.split(' ').length === 1 && props.collection?.name?.length > 14 ? (
            <div className="long-information">
              <p className={styles.author}>
                {props.collection?.name?.substr(0, 13)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.collection?.name}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.collection?.name?.split(' ')[0].substr(0, 14)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`}>
                {props.collection?.name
                  ?.split(' ')
                  .slice(1, props.collection?.name?.split(' ').length)
                  .join(' ')
                  .substr(0, 15)}{' '}
                {props.collection?.name?.split(' ').slice(1, props.collection?.name?.split(' ').length).join(' ').length > 15
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        <div style={{ bottom: 0, justifyContent: 'start' }} className={styles.footer}>
          <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.collection?.userID}`}>
                  <Avatar size={25} icon={<img src={props.collection?.userPreviewFilePath} alt={'Avatar'} />} />
                </Link>
                <Link href={`/user/${props.collection?.userID}`}>
                  <p className={styles.userInfo__name}>{sliceCardUserName(props.collection?.userName)}</p>
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default CollectionsCard;
