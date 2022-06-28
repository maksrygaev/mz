import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import Search from 'components/Site/Search/Search';
import { FC } from 'react';

interface IProps {
  popularProducts: any;
}

const SearchPage: FC<IProps> = ({ popularProducts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <Search />
      </Layout>
    </>
  );
};

export default SearchPage;
