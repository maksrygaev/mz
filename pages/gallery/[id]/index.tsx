import React from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import GalleryComponent from 'components/My/Gallery';
import { GalleriesServices } from 'core/services/galleries';
import { TGallery } from 'core/constants/types';
import { OrdersServices } from 'core/services/orders';

interface IProps {
  gallery: TGallery;
  galleryOrders: any;
  galleryOrdersCount: number;
}

const Gallery: React.FC<IProps> = ({ gallery, galleryOrders, galleryOrdersCount }) => {
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
        <section className="container">
          <GalleryComponent gallery={gallery} galleryOrders={galleryOrders} galleryOrdersCount={galleryOrdersCount} />
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  let gallery: TGallery | null = null;
  let galleryOrders: any = [];
  let galleryOrdersCount = 0;

  const ordersRequestParams = {
    limitation: { count: 10, firstRow: 0 },
    sorting: { column: 'dateCreated', isAscending: 'false' },
    // TODO enable after add gallery orders
    galleryID: id,
  };

  try {
    gallery = await GalleriesServices.get(id);
    galleryOrders = await OrdersServices.search(ordersRequestParams);
    galleryOrdersCount = await OrdersServices.count({ galleryID: id });
  } catch (error) {
    console.log(error);
  }

  return {
    props: { gallery, galleryOrders, galleryOrdersCount },
  };
}

export default Gallery;
