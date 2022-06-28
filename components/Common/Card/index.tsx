import React from 'react';
import Link from 'next/link';
import { Skeleton } from 'antd';
import {
  CustomerServiceOutlined,
  HeartOutlined,
  PlayCircleOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import UserInfo from '../UserInfo';
import Image from '../Image';

import card from './card.module.scss';
import { CardProps } from './models';

const renderIcon = (icon?: string) => {
  switch (icon) {
    case 'video':
      return <YoutubeOutlined />;
    case 'music':
      return <PlayCircleOutlined />;
    case 'disc':
      return <CustomerServiceOutlined />;
    default:
      return '';
  }
};

const renderContent = ({
  avatar,
  category,
  image,
  isLoading,
  likes,
  price,
  title,
  userName,
}: CardProps) => {
  return (
    <>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
          <Image image={image} alt={title} icon={renderIcon(category)} />
          <div className={card.content}>
            {title && <p className={card.title}>{title}</p>}
            {price && <p>{`Price: ${price}`}</p>}
            {(userName || avatar || likes) && (
              <div className={card.info}>
                {(userName || avatar) && (
                  <UserInfo image={avatar} userName={userName} size="small" />
                )}
                {likes && (
                  <div className={card.likes}>
                    {likes}
                    <HeartOutlined />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

const Card: React.FC<CardProps> = ({
  avatar,
  href,
  image,
  likes,
  price,
  title,
  userName,
  isLoading,
}) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={card.root}>
          {renderContent({ avatar, image, isLoading, likes, price, title, userName })}
        </a>
      </Link>
    );
  }

  return (
    <div className={card.root}>
      {renderContent({ avatar, image, isLoading, likes, price, title, userName })}
    </div>
  );
};

export default Card;
