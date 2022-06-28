import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import store from 'core/store';
import { getSelf, TGetSelfType } from 'core/actions';
import { updateRates } from 'core/actions/rates';
import 'antd/dist/antd.css';
import '../styles/styles.scss';
import { loadContractAddress } from '../core/actions/contract';
import { searchCategories } from '../core/actions/categories';

function getLibrary(provider: any): any {
  const library: any = new Web3(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    store.dispatch(getSelf(TGetSelfType.INIT));
    store.dispatch(updateRates());
    store.dispatch(loadContractAddress());
    store.dispatch(searchCategories());
  }, []);

  return (
    <>
      <Head>
        <title>Metazon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/common/apple-icon.png" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="description"
          content="Metazon.io Features a Creator driven NFT open marketplace and curated VR galleries."
        />
      </Head>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </Provider>
    </>
  );
}
