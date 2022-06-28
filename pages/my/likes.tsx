import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import MyLikes from '../../components/Common/MyLikes/MyLikes';

const Likes: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <MyLikes />
      </Layout>
    </>
  );
};

export default Likes;
