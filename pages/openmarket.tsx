import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import OpenMarketGalleryAuction from '../components/OpenMarketGallery/OpenMarketGalleryAuction';
import Explore from '../components/Site/Explore/Explore';
import HotArtists from '../components/Common/HotArtists';
import { ProductsServices } from '../core/services';
import TopSellers from '../components/Common/TopSellers';
import HotArtworks from '../components/Common/HotArtworks';
import Recommendation from '../components/Common/Recommendation';
import HotCollections from '../components/Common/HotCollections';

const Openmarket = () => {
  const { t } = useTranslation();
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
        <OpenMarketGalleryAuction />
        <HotArtworks />
        <HotArtists />
        <HotCollections />
        <Recommendation />
        <TopSellers />
        <Explore />
      </Layout>
    </>
  );
};
export async function getServerSideProps() {
  const params = {
    limitation: { count: 10, firstRow: 0 },
    sorting: { column: 'countViews', isAscending: 'false' },
    status: 'Published',
  };
  let popularProducts: any = [];
  try {
    popularProducts = await ProductsServices.search(params);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { popularProducts },
  };
}

export default Openmarket;
