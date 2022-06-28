import React, { FC } from 'react';
import { Collapse, message, Tooltip } from 'antd';
import Link from 'next/link';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './product.module.scss';
import {ellipseAddress, sliceCardUserName} from 'core/helpers';

interface IProps {
  productData: any;
}

const { Panel } = Collapse;

const ProductDescription: FC<IProps> = ({ productData }) => {
  return (
    <div className={styles.descriptionblock}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Description" key="1">
          <div className={styles.descriptionblock__creator}>
            <span className={styles.descriptionblock__creator__title}>Created by: </span>
            <div style={{ display: 'inline-block' }}>
              <Link href={`/user/${productData?.userID}`}>
                <span className={styles.descriptionblock__creator__padded}>
                  <img
                    src={productData?.userPreviewFilePath || '/icons/userpage/user-default.jpg'}
                    alt={productData?.userName}
                  />
                </span>
              </Link>
              <Link href={`/user/${productData?.userID}`}>
                <span className={styles.descriptionblock__creator__padded}>{sliceCardUserName(productData?.userName) || 'Master'}</span>
              </Link>
            </div>
          </div>
          <div style={{wordBreak: 'break-all'}} className={styles.descriptionblock__descriptiontext}>
            <p>{productData?.description}</p>
          </div>
        </Panel>
        <Panel header="Details" key="2">
          {productData?.contract && (
            <div className={styles.descriptionblock__detailsitem}>
              <span>Contract Address:</span>
              <span>{ellipseAddress(productData?.contract, 10)}</span>
            </div>
          )}
          {productData?.token && (
            <div className={styles.descriptionblock__detailsitem}>
              <span>Token ID:</span>
              <span style={{ cursor: 'pointer' }}>
                <CopyToClipboard text={productData?.token} onCopy={() => message.info('Copied!')}>
                  <Tooltip placement="right" title={'Copy'}>
                    {productData?.contract ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://rinkeby.etherscan.io/token/${productData?.contract}?a=${productData?.token}`}
                        style={{ marginRight: '3px' }}
                      >
                        {ellipseAddress(productData?.token, 10)}
                      </a>
                    ) : (
                      <>{ellipseAddress(productData?.token, 10)}</>
                    )}
                    <CopyOutlined />
                  </Tooltip>
                </CopyToClipboard>
              </span>
            </div>
          )}
          {productData?.addressToken && (
            <div className={styles.descriptionblock__detailsitem}>
              <span>Token address:</span>
              <span>{productData?.addressToken}</span>
            </div>
          )}
          <div className={styles.descriptionblock__detailsitem}>
            <span>Token Standard:</span>
            <span>ERC-1155</span>
          </div>
          <div className={styles.descriptionblock__detailsitem}>
            <span>Blockchain:</span>
            <span>Ethereum</span>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProductDescription;
