import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import PortfolioCollection from '../../../components/Portfolio/PortfolioCollection/PortfolioCollection';
import { UsersServices } from 'core/services';

interface IProps {
  artist: any;
}

const Collections: React.FC<IProps> = ({ artist }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <PortfolioCollection artist={artist} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const artist: any = await UsersServices.getUser({ id }).catch(() => null);
  if (!artist) {
    return {
      notFound: true,
    };
  }
  return {
    props: { artist },
  };
}

export default Collections;
