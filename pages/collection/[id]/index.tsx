import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import { CollectionsServices } from 'core/services';
import CollectionBg from 'components/My/Collection/Bg/bgUnlogged';
import { CollectionTop } from 'components/Portfolio/CollectionTop';
import SearchCollection from 'components/SearchCollection/Search';
import {useSelector} from "react-redux";
import {TAppState} from "../../../core/store";

interface CollectionData {
  id: string;
  name: string;
  status: string;
  dateCreated: string;
  countViews: string;
  userID: any;
}

const CollectionPublic: React.FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [collection, setCollection] = useState({} as CollectionData);

  useEffect(() => {
    CollectionsServices.getCollection({ id })
      .then(rs => setCollection(rs))
      .catch(() => []);
  }, []);

  return (
    <>
      <Head>
        <title>{t('Metazon')}</title>
        <meta name="description" content={t('home:description')} />
      </Head>
      <Layout>
        <section className="container">
          <CollectionBg collection={collection} />
        </section>
        <CollectionTop user={user} collection={collection} />
        <SearchCollection id={id} userID={collection.userID} user={user} collection={collection} />
      </Layout>
    </>
  );
};

export default CollectionPublic;
