import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import PortfolioExplore from 'components/Portfolio/PortfolioExplore/PortfolioExplore';
import { TAppState } from 'core/store';

const Collections: React.FC = () => {
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
        <section>
          <PortfolioExplore artist={user} />
        </section>
      </Layout>
    </>
  );
};

export default Collections;
