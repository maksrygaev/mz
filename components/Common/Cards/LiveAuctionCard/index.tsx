import React from 'react';
import { Avatar, Col, Row, Space } from 'antd';
import styles from '../index.module.scss';
import Link from 'next/link';
import Countdown from 'react-countdown';
import { getBalanceString } from 'core/helpers/getBalanceString';
import { getPriceStr } from '../../../../core/helpers/getPriceStr';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  item: any;
  hideMiddleBlock?: boolean;
  bigCard?: boolean;
};

const LiveAuctionCard = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={props.item?.previewFilePath || props.item?.productPreviewFilePath}
                  alt="banner"
                />
              </div>
            </div>
          </div>
          {props.item?.cathegory && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${props.item?.cathegory.toLowerCase()}.svg`} alt="cathegory" />
            </div>
          )}
        </div>
        <div className={styles.title}>
          <p className={styles.author}>{props.item?.name?.split(' ')[0].substr(0, props.bigCard ? 25 : 16)}</p>
          <p className={`${styles.author__bottom} ${styles.author}`}>
            {props.item?.name
              ?.split(' ')
              .slice(1, props.item?.name.split(' ').length)
              .join(' ')
              .substr(0, props.bigCard ? 25 : 16)}{' '}
            {props.item?.name?.split(' ').slice(1, props.item?.name?.split(' ').length).join(' ').length >
            (props.bigCard ? 25 : 16)
              ? '...'
              : ''}
          </p>
        </div>
        <div className={styles.auction__middle}>
          <Space size={8}>
            <img src="/icons/icon-clock.svg" alt="time" />
            <div className={styles.auction__time}>
              {props.item?.dateValid && (
                <Countdown
                  date={props.item?.dateValid}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      return <span>{"Time's up!"}</span>;
                    } else {
                      return (
                        <>
                          <span className={styles.auction__hour}>{days * 24 + hours}</span>{' '}
                          <span className={styles.auction__hour__text}>hours</span>{' '}
                          <span className={styles.auction__hour}>{('0' + minutes).slice(-2)}</span>{' '}
                          <span className={styles.auction__hour__text}>min</span>
                          {(days * 24 + hours).toString().length < 3 && (
                            <>
                              <span className={styles.auction__hour}> {('0' + seconds).slice(-2)}</span>{' '}
                              <span className={styles.auction__hour__text}>sec</span>
                            </>
                          )}
                        </>
                      );
                    }
                  }}
                />
              )}
            </div>
          </Space>
          <div className={styles.auction__bid}>
            <p className={styles.auction__price}>
              {getBalanceString(Number(getPriceStr(props.item?.price)), 2, 6)} ETH
            </p>
            <p className={styles.auction__last__bid}>Last Bid</p>
          </div>
        </div>
        <div style={{ bottom: 0, justifyContent: 'start' }} className={styles.footer}>
          <Row justify={'start'} className={styles.trending__row}>
            <Col>
              <Space align={'baseline'} direction={'horizontal'} size={20}>
                <Link href={`/user/${props.item.userID}`}>
                  <Avatar size={25} icon={<img src={props.item?.userPreviewFilePath} alt={'Avatar'} />} />
                </Link>
                <p className={styles.userInfo__name}>{sliceCardUserName(props.item?.userName)}</p>
              </Space>
            </Col>
          </Row>
        </div>
      </a>
    </>
  );
};

export default LiveAuctionCard;
