import React from 'react';
import cls from 'classnames';

import background from './background.module.scss';

interface Props {
  className?: string;
  image?: string;
  isBackdrop?: boolean;
  ratio?: 'landscape' | 'square';
}

const Background: React.FC<Props> = ({
  children,
  className,
  image,
  isBackdrop,
  ratio = 'landscape',
}) => {
  const classes = cls(
    `${background.root}`,
    {
      [background[ratio]]: ratio,
      [`${background.backdrop}`]: isBackdrop,
    },
    className,
  );
  const styles = { backgroundImage: `url(${image})` };

  if (children) {
    return (
      <div className={classes} style={styles}>
        <div className={background.inner}>{children}</div>
      </div>
    );
  }

  return <div className={classes} style={styles} />;
};

export default Background;
