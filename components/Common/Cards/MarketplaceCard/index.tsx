import React from 'react';
import Link from 'next/link';
import { Avatar, Col, Popover, Row, Space } from 'antd';
import {sliceCardUserName} from "core/helpers";
import styles from '../index.module.scss';

type Props = {
  item: any;
}

const PlacemarketCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{height: '65%', position: 'relative'}} className={styles.wrapper}>
          <div style={{height: '100%', minHeight: 'inherit', width: '100%'}}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.item?.previewFilePath || props.item?.previewFilePath} alt="banner"/>
              </div>
            </div>
          </div>
        </div>
        <div style={{top: '60%'}} className={`${styles.cathegory} ${styles.border}`}>
          <img src={`/icons/explore/icon-${props.item?.cathegory ? props.item?.cathegory.toLowerCase() : 'art'}.svg`} alt="cathegory" />
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
          {props.item?.name.split(' ').length === 1 && props.item?.name.length > 12 ? (
            <div className="long-information marketplace-title">
              <p className={styles.author}>
                {props.item?.name.substr(0, 11)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.item?.name}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.item?.name.split(' ')[0].substr(0, 12)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`} style={{wordBreak: 'break-all'}}>
                {props.item?.name
                  ?.split(' ')
                  .slice(1, props.item?.name.split(' ').length)
                  .join(' ')
                  .substr(0, 13)}{' '}
                {props.item?.name.split(' ').slice(1, props.item?.name.split(' ').length).join(' ').length}
              </p>
            </>
          )}
        </div>
        <div style={{ bottom: 0, justifyContent: 'start' }} className={styles.footer}>
          <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.item.userID}`}>
                  <Avatar size={25} icon={<img src={props.item?.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={'Avatar'} />} />
                </Link>
                <Link href={`/user/${props.item.userID}`}>
                  <p className={styles.userInfo__name}>{sliceCardUserName(props.item?.userName)}</p>
                </Link>
              </Space>
            </Col>
            <Col>
              <div className={styles.footer__likes} style={{alignItems: 'center'}}>
                <h4 className={styles.likesCount}>{props.item?.countLikes}</h4>
                <img src={'/icons/icon-like.svg'} alt={'Like'} style={{marginTop: 0}} />
              </div>
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default PlacemarketCard;
