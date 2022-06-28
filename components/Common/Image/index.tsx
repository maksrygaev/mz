import React from 'react';
import cls from 'classnames';

import picture from './image.module.scss';

export interface Props {
  alt?: string;
  className?: string;
  icon?: React.ReactNode;
  image?: string;
  ratio?: 'landscape' | 'square';
}

const Image: React.FC<Props> = ({ alt, className, icon, image, ratio }) => {
  const classes = cls(`${picture.root}`, { [picture.square]: ratio === 'square' }, className);

  return (
    <div className={classes}>
      <div className={picture.content}>
        <img src={image} alt={alt || ''} />
      </div>
      {icon && <span className={picture.icon}>{icon}</span>}
    </div>
  );
};

export default Image;
