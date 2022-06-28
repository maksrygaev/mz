import React from 'react';
import { Typography } from 'antd';
import Card from 'components/Common/Card';

import styles from './preview.module.scss';

const { Title } = Typography;

interface Props {
  title?: string;
  image?: string;
  avatar?: string;
}

// TODO: add props accorsing to the real data

const Preview: React.FC<Props> = ({ title, avatar, image }) => {
  return (
    <div className={styles.preview}>
      <Title level={4}>Preview</Title>
      <Card
        avatar={avatar}
        image={image}
        price={123} // there is no field to specify price in the markup
        title={title}
      />
    </div>
  );
};

export default Preview;
