import React from 'react';
import CardTop from 'components/Common/CardTop';
import styles from './createPost.module.scss';

interface Props {
  title?: string;
  image?: string;
  avatar?: string;
  author?: string;
  price?: string;
}

const Preview: React.FC<Props> = ({ title, avatar, author, image, price }) => {
  return (
    <div className={styles.preview}>
      <CardTop
        avatar={avatar || ''}
        author={author}
        src={image || ''}
        name={title || ''}
        price={price || ''}
      />
    </div>
  );
};

export default Preview;
