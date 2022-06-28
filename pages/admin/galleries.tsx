import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import GalleriesList from '../../components/Admin/Galleries/List';

const Galleries: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <GalleriesList />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Galleries;
