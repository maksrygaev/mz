import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import ProductsList from 'components/Admin/Products/List';
import AdminLayout from 'components/Admin/AdminLayout';

const Products: React.FC = () => {
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

export default Products;
