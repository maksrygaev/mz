import React from 'react';
import UpdatePost from 'components/My/CreatePost/update';
import Layout from 'components/Common/Layout';
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
        <section className="container container_first">
          <UpdatePost />
        </section>
      </Layout>
    </>
  );
};

export default Edit;
