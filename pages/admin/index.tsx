import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import ProductsList from 'components/Admin/Products/List';
import AdminLayout from 'components/Admin/AdminLayout';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';

const Admin: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <ProductsList />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Admin;
