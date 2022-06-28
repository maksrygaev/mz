import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import CollectionsList from '../../components/Admin/Collections/List';

const Collections: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          <CollectionsList />
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Collections;
