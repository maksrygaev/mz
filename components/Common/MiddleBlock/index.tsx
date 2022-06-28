import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './MiddleBlock.module.scss';
import useTranslation from 'next-translate/useTranslation';

export const MiddleBlock: FC = () => {
  const { t } = useTranslation();
  return (
    <section className="container top-slider">
      <div className={styles.middleblock} style={{ backgroundImage: 'url(images/middle-block-bg.jpg)' }}>
        <div>
          <h2 className={styles.middleblock__title}>
            <span>Metazon VR</span>
            Contemporary District
          </h2>
          <Button type="link" href="/vr/index.html" className="btn btn-rounded-black" style={{ width: '180px', fontSize: '20px', letterSpacing: '2px' }}>
            <span style={{marginTop: '8px'}}>{t('common:explore')}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
