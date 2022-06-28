import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import ArtistWorkplace from 'components/My/ArtistWorkplace';

const GalleryArtist: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <section className="container container_first">
          <ArtistWorkplace />
        </section>
      </Layout>
    </>
  );
};

export default GalleryArtist;
