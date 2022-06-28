import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import StatsBlock from '../components/Common/StatsBlock';
import { ProductsServices } from '../core/services';
import { FC } from 'react';

interface IProps {
  createdProducts: any;
}

const Stats: FC<IProps> = ({ createdProducts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <StatsBlock data={createdProducts} />
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

export default Stats;
