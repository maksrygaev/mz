import React, { FC } from 'react';
import Layout from 'components/Common/Layout';
import EditGalleryForm from 'components/My/EditGalleryForm';
import Head from 'next/head';

const GalleryEdit: FC = () => {
  return (
    <>
      <Head>
        <title>Metazon</title>
        <meta
          name="description"
          content="Metazon.io Features a Creator driven NFT open marketplace and curated VR galleries."
        />
      </Head>
      <Layout roles={['Client']}>
        <section className="container container_first">
          <EditGalleryForm />
        </section>
      </Layout>
    </>
  );
};

export default GalleryEdit;
