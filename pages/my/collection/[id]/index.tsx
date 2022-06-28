import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import { CollectionsServices } from 'core/services';
import CollectionBg from 'components/My/Collection/Bg';
import { CollectionTop } from 'components/Portfolio/CollectionTop';
import SearchCollection from 'components/SearchCollection/Search';

interface CollectionData {
  id: string;
  name: string;
  status: string;
  dateCreated: string;
  countViews: string;
  userID: any;
}

const Index: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [collection, setCollection] = useState({} as CollectionData);

  useEffect(() => {
    CollectionsServices.getCollection({ id: id })
      .then(rs => {
        setCollection(rs);
      })
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
          <CollectionBg id={id} collection={collection} />
        </section>
        <CollectionTop collection={collection} />
        <SearchCollection id={id} userID={collection.userID} />
      </Layout>
    </>
  );
};

export default Index;
