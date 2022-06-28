import { TUserNetwork } from 'core/constants/types';
import React, { FC } from 'react';
import styles from './socialItem.module.scss';

interface Props {
  link: TUserNetwork;
}

const SocialNetworkLink:FC<Props> = ({ link }) => {
  return (
    <a href={link.value} className={styles.item} target="_blank" rel="noreferrer">
      <img src={`/icons/socials/${link.networkName.toLowerCase()}.svg`} alt="icon" />
    </a>
  );
};

export default SocialNetworkLink;