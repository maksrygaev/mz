import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import { AccountSetting } from '../../components/Common/AcoountSetting';

const Settings: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <AccountSetting />
      </Layout>
    </>
  );
};

export default Settings;
