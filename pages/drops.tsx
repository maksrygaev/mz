import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import DropsList from 'components/Site/DropsList/DropsList';
import { CollectionsServices } from '../core/services';
import TopSliderDrops from "components/Common/TopSliderDrops";

interface IProps {
  dropCollections: any;
  visibleDropCollections: any;
}

const Drops: FC<IProps> = ({ dropCollections, visibleDropCollections }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta
          name="description"
          content="Metazon.io Features a Creator driven NFT open marketplace and curated VR galleries."
        />
      </Head>
      <Layout>
        <TopSliderDrops data={dropCollections} />
        <DropsList data={visibleDropCollections} />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const paramsDrops = {
    sorting: { column: 'dateCreated', isAscending: 'false' },
    type: 'Drop',
    pinnedDrop: true,
  };
  let dropCollections: any = [];
  try {
    dropCollections = await CollectionsServices.search(paramsDrops);
  } catch (error) {
    console.log(error);
  }
  const paramsVisibleDrop = {
    sorting: { column: 'dateCreated', isAscending: 'false' },
    type: 'Drop',
    visibleDrop: true,
  };
  let visibleDropCollections: any = [];
  try {
    visibleDropCollections = await CollectionsServices.searchDrops(paramsVisibleDrop);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { dropCollections, visibleDropCollections },
  };
}

export default Drops;
