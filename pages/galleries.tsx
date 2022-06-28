import React from 'react';
import Layout from 'components/Common/Layout';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import OpenGalleries from 'components/OpenGalleries';

const OpenGalleriesScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <OpenGalleries />
      </Layout>
    </>
  );
};

export default OpenGalleriesScreen;
