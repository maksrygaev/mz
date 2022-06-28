import React from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import LayoutAdmin from 'components/Common/Layout/layoutAdmin';
import AdminLayout from 'components/Admin/AdminLayout';
import { errors } from 'core/constants/errors';

const Errors: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Metazon</title>
      </Head>
      <LayoutAdmin roles={['Administrator']}>
        <AdminLayout>
          {errors.map((error: any) => (
            <p key={error.code}>{`"${error.code}": "${error.message}",`}</p>
          ))}
        </AdminLayout>
      </LayoutAdmin>
    </>
  );
};

export default Errors;
