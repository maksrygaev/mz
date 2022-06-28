import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import useTranslation from 'next-translate/useTranslation';
import Galleries from 'components/My/Galleries';
import { TAppState } from 'core/store';
import OpenGalleries from 'components/My/OpenGalleries';

const GalleriesScreen = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const { t } = useTranslation();
  if (!user) return null;

  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('Gallery admin description')} />
      </Head>
      <Layout roles={['Client']}>
        <section>
          <Galleries artist={user} />
          <OpenGalleries artist={user} />
        </section>
      </Layout>
    </>
  );
};

export default GalleriesScreen;
