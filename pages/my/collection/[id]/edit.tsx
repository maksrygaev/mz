import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import CollectionEdit from 'components/My/Collection/Edit';
import { CollectionsServices } from 'core/services';
import Head from 'next/head';
import Layout from 'components/Common/Layout';

const EditCollection: React.FC = () => {
  const { t } = useTranslation();
  const [collectionData, setCollectionData] = useState<null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    CollectionsServices.getCollection({ id })
      .then(rs => setCollectionData(rs))
      .catch(() => []);
  }, []);

  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout roles={['Client']}>
        <section className="container">
          {collectionData ? <CollectionEdit id={Number(id)} collection={collectionData} /> : null}
        </section>
      </Layout>
    </>
  );
};

export default EditCollection;
