import React from 'react';
import { Button } from 'antd';
import ButtonGroup from 'components/Common/ButtonGroup';

import styles from '../createPost.module.scss';

const Token: React.FC = () => {
  return (
    <div className={styles.tabContentBlock}>
      <p className={styles.tabBlockTitle}>When create the token?</p>
      <ButtonGroup variant="vertical" className={styles.tokenButtons}>
        <Button size="large" type="primary">
          Now
        </Button>
        <Button size="large" type="primary">
          At the sales moment
        </Button>
        <Button size="large" type="primary">
          I have a token
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Token;
