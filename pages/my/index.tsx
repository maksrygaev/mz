import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import UserProfile from 'components/My/Profile';
import { TAppState } from 'core/store';
import ArtowrksBlock from 'components/My/ArtworksBlock';
import CollectionsBlock from 'components/My/CollectionsBlock';
import GalleriesBlock from 'components/My/GalleriesBlock';

const My: React.FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const { t } = useTranslation();
  if (!user) return null;

  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <UserProfile artist={user} isAuthorized />
        <ArtowrksBlock artist={user} />
        <CollectionsBlock artist={user} />
        <GalleriesBlock artist={user} />
      </Layout>
    </>
  );
};

export default My;
