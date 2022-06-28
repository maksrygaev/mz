import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import PortfolioCollection from '../../components/Portfolio/PortfolioCollection/PortfolioCollection';
import DropsCollection from '../../components/Portfolio/DropsCollection/DropsCollection';
import { useSelector } from 'react-redux';
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
        <PortfolioCollection artist={user} />
        <section className="container">
          <DropsCollection artist={user} />
        </section>
      </Layout>
    </>
  );
};

export default Collections;
