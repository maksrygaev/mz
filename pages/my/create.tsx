import React from 'react';
import Layout from 'components/Common/Layout';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import CreatePost from 'components/My/CreatePost';

const Create: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <section className="container container_first">
          <CreatePost />
        </section>
      </Layout>
    </>
  );
};

export default Create;
