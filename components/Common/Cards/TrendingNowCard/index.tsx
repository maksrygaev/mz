import React from 'react';
import { Avatar, Col, Row, Space, Popover } from 'antd';
import styles from '../index.module.scss';
import Link from 'next/link';
import { getPriceStr } from 'core/helpers/getPriceStr';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  item: any;
  hideMiddleBlock?: boolean;
  bigCard?: boolean;
  likes?: boolean;
};

const TrendingNowCard = (props: Props) => {
  const category = props.item?.cathegory ? props.item?.cathegory : props.item?.productType;
  const name = props.item?.name ? props.item?.name : props.item?.productName;

  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={props.item?.productPreviewFilePath || props.item?.previewFilePath}
                  alt="banner"
                />
              </div>
            </div>
          </div>
          {category && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${category.toLowerCase()}.svg`} alt={category} />
            </div>
          )}
        </div>
        <div style={{ padding: '7px 10px 10px 20px' }} className={styles.title}>
          {name.split(' ').length === 1 && name.length > 12 ? (
            <div className="long-information">
              <p className={styles.author}>
                {name.substr(0, 11)}
                <Popover content="" title={<div style={{ wordBreak: 'break-all' }}>{name}</div>}>
                  ...
                </Popover>
              </p>
            </div>
          ) : (
            <>
              <p className={styles.author}>{name.split(' ')[0].substr(0, props.bigCard ? 25 : 12)}</p>
              <p className={`${styles.author__bottom} ${styles.author}`} style={{ wordBreak: 'break-all' }}>
                {name
                  ?.split(' ')
                  .slice(1, name.split(' ').length)
                  .join(' ')
                  .substr(0, props.bigCard ? 25 : 13)}{' '}
                {name.split(' ').slice(1, name.split(' ').length).join(' ').length > (props.bigCard ? 25 : 13)
                  ? '...'
                  : ''}
              </p>
            </>
          )}
        </div>
        {!props.hideMiddleBlock && (
          <div className={styles.middle}>
            <h4 className={styles.price}>{props.item?.price ? getPriceStr(props.item.price) : ''} ETH</h4>
            <h4 className={styles.middle__name}>Last trade</h4>
          </div>
        )}
        <div style={{ bottom: 0, justifyContent: 'start' }} className={styles.footer}>
          <Row className={styles.footer_row} justify={'space-between'} align={'middle'}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.item.userID}`}>
                  <Avatar
                    size={25}
                    icon={
                      <img src={props.item?.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={'Avatar'} />
                    }
                  />
                </Link>
                <Link href={`/user/${props.item.userID}`}>
                  <p className={styles.userInfo__name}>{sliceCardUserName(props.item?.userName) || 'Master'}</p>
                </Link>
              </Space>
            </Col>
            {props.likes && (
              <Col>
                <div className={styles.footer__likes}>
                  <h4 className={styles.likesCount}>{props.item?.countLikes}</h4>
                  <img src={'/icons/icon-like.svg'} alt={'Like'} />
                </div>
              </Col>
            )}
          </Row>
        </div>
      </a>
    </>
  );
};

export default TrendingNowCard;
