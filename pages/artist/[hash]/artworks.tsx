import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import { UsersServices } from 'core/services';
import PortfolioExplore from 'components/Portfolio/PortfolioExplore/PortfolioExplore';
import { TUser } from 'core/constants/types';

interface IProps {
  artist: TUser;
}

const UserArtworks: React.FC<IProps> = ({ artist }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <section>
          <PortfolioExplore artist={artist} />
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { hash } = context.query;
  const artist: any = await UsersServices.usersFetch({ hash }).catch(() => null);
  if (!artist) {
    return {
      notFound: true,
    };
  }
  return {
    props: { artist },
  };
}

export default UserArtworks;
