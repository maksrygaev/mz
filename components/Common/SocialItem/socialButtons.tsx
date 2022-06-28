import React from 'react';
import styles from './socialItem.module.scss';

interface Props {
  text?: string | number;
  url?: string;
}

const SocialItemButtons: React.FC<Props> = ({ text, url }) => {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={styles.socialItemBtn}>
        <div className={styles.social__btn}>
          <img src={`/icons/soc/${text}.svg`} alt="" />
        </div>
      </a>
    );
  }

  return <div className={styles.socialItem}>{text && <span>{text}</span>}</div>;
};

export default SocialItemButtons;
