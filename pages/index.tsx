import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import Trending from 'components/Site/Trending/Trending';
import TopSlider from 'components/Common/TopSlider';
import EditionsLive from 'components/Site/EditionsLive/EditionsLive';
import { MiddleBlock } from 'components/Common/MiddleBlock';
import HotArtists from '../components/Common/HotArtists';
import { MiddleMenu } from 'components/Common/MiddleMenu';
import Explore from 'components/Site/Explore/Explore';
import { PromoCarusel } from 'components/Common/PromoCarusel';
import { ProductsServices } from '../core/services';
import OpenGalleriesBlock from "../components/Common/OpenGalleriesBlock";

interface IProps {
  createdProducts: any;
}

const Home: FC<IProps> = ({ createdProducts }) => {
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
        <TopSlider />
        <PromoCarusel data={createdProducts} />
        <EditionsLive />
        <MiddleBlock />
        <Trending />
        <OpenGalleriesBlock />
        <HotArtists />
        <MiddleMenu />
        <Explore />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const params2 = {
    limitation: { count: 10, firstRow: 0 },
    sorting: { column: 'dateCreated', isAscending: 'false' },
    status: 'Published',
  };
  let createdProducts: any = [];
  try {
    createdProducts = await ProductsServices.search(params2);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { createdProducts },
  };
}

export default Home;
