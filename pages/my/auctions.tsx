import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import MyAuctions from 'components/My/MyAuctions';

const MyAuctionsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <section>
          <MyAuctions />
        </section>
      </Layout>
    </>
  );
};

export default MyAuctionsPage;
