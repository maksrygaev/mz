import React from 'react';
import { Avatar, Col, Popover, Row, Space } from 'antd';
import styles from '../index.module.scss';
import Link from 'next/link';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  item: any;
  bigCard?: boolean;
};

const HotCollectionCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.item?.previewFilePath} alt="banner" />
              </div>
            </div>
          </div>
          {/*
          {props.item?.cathegory && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${props.item?.cathegory.toLowerCase()}.svg`} alt="cathegory" />
            </div>
          )}
          */}
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
          {props.item?.name?.split(' ').length === 1 && props.item?.name?.length > 12 ? (
            <div className="long-information">
              <p className={styles.author}>
                {props.item?.name?.substr(0, 11)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.item?.name}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.item?.name?.split(' ')[0].substr(0, props.bigCard ? 25 : 12)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`} style={{wordBreak: 'break-all'}}>
                {props.item?.name
                  ?.split(' ')
                  .slice(1, props.item?.name?.split(' ').length)
                  .join(' ')
                  .substr(0, props.bigCard ? 25 : 13)}{' '}
                {props.item?.name?.split(' ').slice(1, props.item?.name?.split(' ').length).join(' ').length >
                (props.bigCard ? 25 : 13)
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        <div style={{ bottom: 10 }} className={`${styles.footer}`}>
          <Row justify={'space-between'} className={`${styles.collection__footer}`}>
            <Col>
              <Space size={20} align={'center'}>
                <Link href={`/user/${props.item.userID}`}>
                  <Avatar size={25} icon={<img src={props.item?.userPreviewFilePath} alt={'Avatar'} />} />
                </Link>
                <p className={styles.author}>{sliceCardUserName(props.item?.userName)}</p>
              </Space>
            </Col>
            <Col className={styles.likes}>
              <h4 className={styles.likesCount}>{props.item?.countLikes}</h4>
              <img width={15} height={15} src={'/icons/icon-like.svg'} alt={'Like'} />
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default HotCollectionCard;
