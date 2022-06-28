import React from 'react';
import { Button } from 'antd';
import cls from 'classnames';
import avatar from './avatar.module.scss';

export interface AvatarProps {
  alt?: string;
  image?: string;
  isChange?: boolean;
  size?: 'large' | 'medium' | 'small';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ alt, className, image, size = 'medium', isChange }) => {
  const classes = cls(`${avatar.root}`, { [avatar[size]]: size }, className);

  return (
    <>
      <div className={classes} style={{bottom: '-50px', display: 'flex',justifyContent: 'center', background: 'white'}}>
        <img src={image || '/icons/userpage/user-default.jpg'} alt={alt} style={{height: '100px', width: 'auto'}}/>
      </div>
      {isChange && (
        <div className={avatar.change}>
          <Button>Change avatar</Button>
        </div>
      )}
    </>
  );
};

export default Avatar;
