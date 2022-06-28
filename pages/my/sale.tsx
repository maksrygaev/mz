import React from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import useTranslation from 'next-translate/useTranslation';
import CreateSale from 'components/My/CreatePost/sale';

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
          <CreateSale />
        </section>
      </Layout>
    </>
  );
};

export default Create;
