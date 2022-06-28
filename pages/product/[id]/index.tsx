import React, { FC } from 'react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import ProductDetail from 'components/Site/ProductDetail';
import { ProductsServices } from 'core/services';
import Layout from 'components/Common/Layout';
import { TProduct } from 'core/constants/types';

interface IProps {
  id: string;
  product: TProduct;
}

const ProductPage: FC<IProps> = ({ id, product }) => {
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
        <ProductDetail id={id} product={product} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any): Promise<GetServerSidePropsResult<IProps>> {
  const { id } = context.query;
  let product = null;
  try {
    product = await ProductsServices.getProductById(id);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { id, product },
  };
}

export default ProductPage;
