import React from 'react';
import Link from 'next/link';
import { Avatar, Col, Popover, Row, Space } from 'antd';
import styles from '../index.module.scss';
import {sliceCardUserName} from "../../../../core/helpers";

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
                <img className={styles.img} src={props.item?.productPreviewFilePath} alt="banner"/>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
          {props.item?.productName.split(' ').length === 1 && props.item?.productName.length > 12 ? (
            <div className="long-information">
              <p className={styles.author}>
                {props.item?.productName.substr(0, 11)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.item?.productName}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.item?.productName.split(' ')[0].substr(0, 12)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`} style={{wordBreak: 'break-all'}}>
                {props.item?.productName
                  ?.split(' ')
                  .slice(1, props.item?.productName.split(' ').length)
                  .join(' ')
                  .substr(0, 13)}{' '}
                {props.item?.productName?.split(' ').slice(1, props.item?.productName?.split(' ').length).join(' ').length > 13
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        <div style={{justifyContent: 'start' }} className={styles.footer}>
          <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.item?.productUserID}`}>
                  <Avatar size="small" icon={<img src={props.item?.productUserPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={props.item?.productUserName} />} />
                </Link>
                <Link href={`/user/${props.item?.productUserID}`}>
                  <p>{sliceCardUserName(props.item?.productUserName) || 'Master'}</p>
                </Link>
              </Space>
            </Col>
            <Col>
              <div className={styles.footer__likes} style={{alignItems: 'center'}}>
                <h4 className={styles.likesCount}>
                  {props.item?.productCountLikes}
                </h4>
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
