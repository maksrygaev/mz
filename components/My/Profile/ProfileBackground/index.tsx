import React from 'react';
import Avatar from 'components/Common/Avatar';
import DetailBackground from 'components/My/DetailBackground';
import { UserProps } from '../models';
import styles from './background.module.scss';

interface Props {
  avatar?: string;
  bannerImage?: string;
  className?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  user?: UserProps;
}

const ProfileBackground: React.FC<Props> = ({
  avatar,
  bannerImage,
  className,
  leftButton,
  rightButton,
  user,
}) => {
  return (
    <DetailBackground
      bgImage={bannerImage}
      className={className}
      leftContent={leftButton}
      rightContent={rightButton}
      rightClassName={styles.rightSocial}
    >
      {avatar && <Avatar alt={user?.name} image={avatar} className={styles.avatar} />}
    </DetailBackground>
  );
};

export default ProfileBackground;
