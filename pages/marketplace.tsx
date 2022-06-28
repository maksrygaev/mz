import React, {FC, useState, useEffect} from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import TopSlider from 'components/Common/TopSlider';
import { MiddleBlockPart } from 'components/Common/MiddleBlockPart';
import ExploreMarket from 'components/Site/ExploreMarket/ExploreMarket';
import Sample from '../components/Site/Sample/Sample';
import { ProductsServices } from 'core/services';
import { TGallery, TProduct } from 'core/constants/types';
import { GalleriesServices } from 'core/services/galleries';

interface IExtraParams {
  categoryID?: number;
}

const Marketplace: FC = () => {
  const [extraParams, setExtraParams] = useState({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [popularProducts, setPopularProducts] = useState<TProduct[]>([]);
  const [createdProducts, setCreatedProducts] = useState<TProduct[]>([]);
  const [likedProducts, setLikedProducts] = useState<TProduct[]>([]);
  const [likedGalleries, setLikedGalleries] = useState<TGallery[]>([]);

  const saveExtraParams = (params: IExtraParams): void => {
    if (params?.categoryID === 0) {
      setExtraParams({});
    } else {
      setExtraParams(params);
    }
  };

  const loadPopularProducts = (): void => {
    const params = {
      limitation: { count: 10, firstRow: 0 },
      sorting: { column: 'countLikes', isAscending: 'false' },
      status: 'Published',
      ...extraParams,
    };
    ProductsServices.search(params)
      .then(rs => setPopularProducts(rs))
      .catch(er => {
        console.log(er);
        return [];
      });
  };

  const loadCreatedProducts = (): void => {
    setIsFetching(true);
    const params = {
      limitation: { count: 10, firstRow: 0 },
      sorting: { column: 'countViews', isAscending: 'false' },
      status: 'Published',
      ...extraParams,
    };
    ProductsServices.search(params)
      .then(rs => setCreatedProducts(rs))
      .catch(er => {
        console.log(er);
        return [];
      });
  };

  const loadLikedProducts = (): void => {
    setIsFetching(true);
    const params = {
      limitation: { count: 10, firstRow: 0 },
      sorting: { column: 'countOrders', isAscending: 'false' },
      status: 'Published',
      ...extraParams,
    };
    ProductsServices.search(params)
      .then(response => setLikedProducts(response))
      .catch(er => {
        console.log(er);
        return [];
      });
  };

  const loadLikedGalleries = (): void => {
    setIsFetching(true);
    const params = {
      availability: 'Opened',
      status: 'Approved',
      limitation: { count: 10, firstRow: 0 },
      sorting: { column: 'dateCreated', isAscending: false },
      ...extraParams,
    };
    GalleriesServices.search(params)
      .then(rs => setLikedGalleries(rs))
      .catch(er => {
        console.log(er);
        return [];
      });
  };

  const loadAllProducts = (): void => {
    setIsFetching(true);
    loadPopularProducts();
    loadCreatedProducts();
    loadLikedProducts();
    loadLikedGalleries();
    setIsFetching(false);
  };

  useEffect(() => {
    loadAllProducts();
    window.history.scrollRestoration = "manual";
  }, [extraParams]);

  return (
    <>
      <Head>
        <title>Metazon</title>
        <meta
          name="description"
          content="Metazon.io Features a Creator driven NFT open marketplace and curated VR galleries."
        />
      </Head>
      <Layout>
        <TopSlider />
        <ExploreMarket data={popularProducts} onFilterChanged={(params: IExtraParams) => saveExtraParams(params)} />
        <Sample likedGalleries={likedGalleries} likedProducts={likedProducts} createdProducts={createdProducts} popularProducts={popularProducts} />
        <MiddleBlockPart />
      </Layout>
    </>
  );
};

export default Marketplace;
