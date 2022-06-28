import React from 'react';
import cls from 'classnames';
import Background from 'components/Common/Background';
import styles from './detailBackground.module.scss';

interface Props {
  bgImage?: string;
  className?: string;
  leftClassName?: string;
  leftContent?: React.ReactNode;
  rightClassName?: string;
  rightContent?: React.ReactNode;
}
const DetailBackground: React.FC<Props> = ({
  bgImage,
  children,
  className,
  leftClassName,
  leftContent,
  rightClassName,
  rightContent,
}) => {
  return (
    <Background className={cls(`${styles.bg}`, className)} image={bgImage} isBackdrop>
      <div className={cls(`${styles.leftContent}`, leftClassName)}>{leftContent}</div>
      <div className={cls(`${styles.rightContent}`, rightClassName)}>{rightContent}</div>
      {children}
    </Background>
  );
};

export default DetailBackground;
