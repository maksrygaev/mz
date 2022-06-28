import React from 'react';
import Layout from 'components/Common/Layout';
import UserEditProfile from 'components/My/Profile/Edit';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Edit: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <UserEditProfile />
      </Layout>
    </>
  );
};

export default Edit;
