import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './MiddleBlockPart.module.scss';

export const MiddleBlockPart: FC = () => {
  return (
    <section className="container before-footer">
      <div className={styles.middleblock} style={{ backgroundImage: "url(images/middle-block-bg.jpg)" }}>
        <div>
          <h2 className={styles.middleblock__title}>
            <span>Metazon VR</span>
            Contemporary District
          </h2>
          <Button shape={'round'} className="btn btn-rounded-black">Explore</Button>
        </div>
      </div>
    </section>
  );
};