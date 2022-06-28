import React from 'react';
import { Avatar, Col, Row, Space } from 'antd';
import Link from 'next/link';
import styles from '../index.module.scss';
import { getPriceStr } from '../../../../core/helpers/getPriceStr';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  item: any;
};

const DiscoverCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.item?.productPreviewFilePath} alt="banner" />
              </div>
            </div>
          </div>
          {props.item?.cathegory && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${props.item?.cathegory.toLowerCase()}.svg`} alt="cathegory" />
            </div>
          )}
        </div>
        <div style={{ padding: '7px 10px 10px' }} className={styles.title}>
          <p className={styles.author}>{props.item?.productName}</p>
          <p className={`${styles.author__bottom} ${styles.author}`}>
            {props.item?.name?.split(' ').slice(1, props.item?.name?.split(' ').length).join(' ').substr(0, 24)}{' '}
            {props.item?.name?.split(' ').slice(1, props.item?.name?.split(' ').length).join(' ').length > 24
              ? '...'
              : ''}
          </p>
        </div>
        <div className={styles.middle}>
          <h4 className={styles.price}>{props.item?.price ? getPriceStr(props.item.price) : ''} ETH</h4>
          <h4 className={styles.middle__name}>Last trade</h4>
        </div>
        <div style={{ paddingTop: 10 }} className={styles.footer}>
          <Row justify={'space-between'} align={'middle'}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.item.userID}`}>
                  <Avatar size={25} icon={<img src={props.item?.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={'Avatar'} />} />
                </Link>
                <Link href={`/user/${props.item.userID}`}>
                  <p>{sliceCardUserName(props.item?.userName) || 'Master'}</p>
                </Link>
              </Space>
            </Col>
            <Col>
              <Space direction={'horizontal'} align={'baseline'}>
                <h4 className={styles.likesCount}>{props.item?.countLikes || 0}</h4>
                <img src={'/icons/icon-like.svg'} alt={'Like'} />
              </Space>
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default DiscoverCard;
