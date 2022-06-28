import React from 'react';
import cls from 'classnames';
import { HeartOutlined } from '@ant-design/icons';
import Avatar, { AvatarProps } from '../Avatar';

import userInfo from './userInfo.module.scss';

type Props = Omit<AvatarProps, 'alt'> & {
  userName?: string;
  likes?: string;
  variant?: 'horizontal' | 'vertical';
};

const UserInfo: React.FC<Props> = ({
  className,
  image,
  size,
  userName,
  likes,
  variant = 'horizontal',
}) => {
  const classes = cls({ [userInfo[variant]]: variant }, className);

  return (
    <div className={classes}>
      <Avatar size={size} image={image} alt={userName} />
      <div className={userInfo.userContent}>
        <span className={userInfo.userName}>{userName}</span>
        {likes && (
          <span className={userInfo.userLikes}>
            <HeartOutlined />
            {likes}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
