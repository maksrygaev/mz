import React, { FC } from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import { DiscoverPage } from '../components/Common/DiscoverPage';

const Discover: FC = () => {
  return (
    <>
      <Head>
        <title>Metazon</title>
        <meta
          name="description"
          content="Metazon.io Features a Creator driven NFT open marketplace and curated VR galleries."
        />
      </Head>
      <Layout>
        <DiscoverPage />
      </Layout>
    </>
  );
};

export default Discover;
