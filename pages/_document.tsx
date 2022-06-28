import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

React.useLayoutEffect = React.useEffect;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
