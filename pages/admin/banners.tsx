import React from 'react';
import Head from 'next/head';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import BannersList from 'components/Admin/Banners';

const Galleries: React.FC = () => {
  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <BannersList />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Galleries;
