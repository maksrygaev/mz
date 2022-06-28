import React from 'react';
import Link from 'next/link';
import { Avatar, Space } from 'antd';
import styles from '../index.module.scss';
import Countdown from 'react-countdown';
import {sliceCardUserName} from "../../../../core/helpers";

type Props = {
  order: any;
  hideFooter?: boolean;
};

const LiveNowCard: React.FC<Props> = (props: Props) => {
  return (
    <>
      <a className={styles.link}>
        <div style={{ height: '65%', position: 'relative' }} className={styles.wrapper}>
          <div style={{ height: '100%', minHeight: 'inherit', width: '100%' }}>
            <div className={styles.mainWrapper}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={props.order?.productPreviewFilePath} alt="banner" />
              </div>
            </div>
          </div>
          {props.order?.productType && (
            <div className={`${styles.cathegory} ${styles.border}`}>
              <img src={`/icons/explore/icon-${props.order?.productType.toLowerCase()}.svg`} alt="cathegory" />
            </div>
          )}
        </div>
        <div style={{ padding: '7px 10px 10px' }} className={styles.title}>
          <p className={styles.author}>{props.order?.productName?.split(' ')[0].substr(0, 16)}</p>
          <p className={`${styles.author__bottom} ${styles.author}`}>
            {props.order?.productName
              ?.split(' ')
              .slice(1, props.order?.productName?.split(' ').length)
              .join(' ')
              .substr(0, 15)}{' '}
            {props.order?.productName?.split(' ').slice(1, props.order?.productName?.split(' ').length).join(' ')
              .length > 15
              ? '...'
              : ''}
          </p>
        </div>
        <Space className={`${styles.userInfo} ${styles.live_now_info}`} size={20} direction={'horizontal'}>
          <Link href={`/user/${props.order?.userID}`}>
            <Avatar
              size={25}
              icon={<img src={props.order?.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt={'Avatar'} />}
            />
          </Link>
          <Link href={`/user/${props.order?.userID}`}>
            <p className={styles.userInfo__name}>{sliceCardUserName(props.order?.userName) || 'Master'}</p>
          </Link>
        </Space>
        <div style={{ paddingRight: 12 }} className={styles.time}>
          <Space size={15}>
            <img src="/icons/icon-clock.svg" alt="clock" />
            <div className={styles.time__text}>
              <Countdown
                date={props?.order?.dateValid}
                renderer={({ days, hours, minutes, seconds, completed }) =>
                  completed ? (
                    <span>{"Time's up!"}</span>
                  ) : (
                    <>
                      {days > 0 && (
                        <>
                          <span>{days} </span> {days === 1 ? 'day' : 'days'} {' '}
                        </>
                      )}
                      {hours > 0 && (
                        <>
                          <span>{hours} </span> {hours === 1 ? ' hour' : 'hours'} {' '}
                        </>
                      )}
                      <span>{('0' + minutes).slice(-2)} </span> min {' '}
                      {days === 0 && (
                        <>
                          <span>{('0' + seconds).slice(-2)} </span> sec
                        </>
                      )}
                    </>
                  )
                }
              />
            </div>
          </Space>
        </div>
      </a>
    </>
  );
};

export default LiveNowCard;
