import React from 'react';
import Link from 'next/link';
import { Avatar, Col, Popover, Row, Space } from 'antd';
import { ethers } from 'ethers';
import {sliceCardUserName} from "core/helpers";
import styles from '../index.module.scss';

type Props = {
  artwork: any;
  hideFooter?: boolean;
  editable?: boolean;
};

const ProductCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.artwork?.productPreviewFilePath} alt="banner" />
              </div>
            </div>
          </div>
          {props.artwork?.cathegory && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${props.artwork?.cathegory.toLowerCase()}.svg`} alt="cathegory" />
            </div>
          )}
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
          {props.artwork?.productName.split(' ').length === 1 && props.artwork?.productName.length > 12 ? (
            <div className="long-information">
              <p className={styles.author}>
                {props.artwork?.productName.substr(0, 11)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{props.artwork?.productName}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{props.artwork?.productName.split(' ')[0].substr(0, 12)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`} style={{ wordBreak: 'break-all' }}>
                {props.artwork?.productName
                  ?.split(' ')
                  .slice(1, props.artwork?.productName.split(' ').length)
                  .join(' ')
                  .substr(0, 13)}{' '}
                {props.artwork?.productName.split(' ').slice(1, props.artwork?.productName.split(' ').length).join(' ').length > 13
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        <div className={styles.middle}>
          <h4 className={styles.price}>
            {props?.artwork?.minimalPrice ? ethers.utils.formatEther(props?.artwork?.minimalPrice) : ''} ETH
          </h4>
          <h4 className={styles.middle__name}>Last trade</h4>
        </div>
        <div style={{ bottom: 6 }} className={styles.footer}>
          <Row justify={'space-between'} align={'middle'}>
            <Col style={{paddingTop: 12}}>
              <Space direction={'horizontal'} align={'baseline'} size={4}>
                <Link href={`/user/${props.artwork?.productUserID}`}>
                  <Avatar
                    size="small"
                    icon={<img src={props.artwork?.productUserPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={props.artwork?.productUserName} />}
                  />
                </Link>
                <p className={styles.userInfo__name}>{sliceCardUserName(props.artwork?.productUserName)}</p>
              </Space>
            </Col>
            {(props.artwork?.status || props.artwork?.productStatus === 'Published') && (
              <Col>
                <Space direction={'horizontal'} align={'baseline'}>
                  <h4 className={styles.likesCount}>{props.artwork?.productCountLikes}</h4>
                  <img src={'/icons/icon-like.svg'} alt={'Like'} />
                </Space>
              </Col>
            )}
          </Row>
        </div>
      </a>
      {props?.editable && (
        <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
          <Col style={{ width: '100%'}}>
            {(props.artwork?.status === 'Moderation' ||
              props.artwork?.productStatus === 'Moderation') && (
              <p className={styles.userInfo__name} style={{ paddingLeft: '60px', position: 'absolute',top: '-25px'}}>
                Moderation
              </p>
            )}
            {(props.artwork?.status === 'Draft' || props.artwork?.productStatus === 'Draft') && (
              <p className={styles.userInfo__name} style={{ paddingLeft: '60px', position: 'absolute',top: '-25px'}}>
                <Link href={`/my/product/${props.artwork?.productID}/edit`}>
                  <a style={{ color: 'black', marginRight: '30px' }}>
                    Edit Draft
                  </a>
                </Link>
              </p>
            )}

          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductCard;
