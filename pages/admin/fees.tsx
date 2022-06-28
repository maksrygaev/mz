import React from 'react';
import Head from 'next/head';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import Fees from 'components/Admin/Fees';

const Galleries: React.FC = () => {
  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <Fees />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Galleries;
