import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Layout from 'components/Common/Layout';
import { UsersServices } from 'core/services';
import OpenGalleries from 'components/My/OpenGalleries';
import Galleries from 'components/My/Galleries';

interface IProps {
  artist: any;
}

const GalleriesPage: React.FC<IProps> = ({ artist }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <Galleries artist={artist} />
        <OpenGalleries artist={artist} />
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

export default GalleriesPage;
