import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import SettingList from 'components/Admin/Setting/List';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <SettingList />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Settings;
