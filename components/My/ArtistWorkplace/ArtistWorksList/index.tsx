import React, {FC, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import Link from 'next/link';
import styles from '../index.module.scss';
import { OrdersServices } from 'core/services/orders';
import { ProductsServices } from 'core/services';
import ModalArtworkProposal from 'components/Modal/ModalArtworkProposal';
import {sliceProductName} from "../../../../core/helpers";

interface IProps {
  artworks: any;
  title: string;
  hideButton?: boolean;
  loadProducts?: any;
  galleryID?: number;
}

const ArtistWorksList:FC<IProps> = props => {
  const [product, setProduct] = useState<any | null>(null);

  const handleSelectProduct = async (item: any) => {
    const product = item;
    product.sales = await OrdersServices.search({ productID: product.productID, status: 'Opened' }).catch(error => console.log(error));
    product.owners = await ProductsServices.getOwnersById({ productID: product.productID }).catch(error => console.log(error));
    setProduct(product)
  };

  const closeModal = () => setProduct(null);

  return (
    <div>
      <h1 className={'section_title'}>{props.title}</h1>
      {props.artworks.length ? (
        <ul className={styles.list}>
          {props.artworks.map((item: any) => (
            <li key={item.id} className={styles.list__item}>
              <div className={styles.left__block}>
                <Link href={`/product/${item.productID}`}>
                  <a className={styles.link} target="_blank">
                    <div className={styles.preview}>
                      <img src={item.previewFilePath || item.productPreviewFilePath} alt="preview" width={90} height={90} />
                    </div>
                  </a>
                </Link>
                <div className={styles.info}>
                  <Link href={`/product/${item.productID}`}>
                    <a className={styles.link} target="_blank">
                      <h2 className={styles.itemTitle}>{sliceProductName(item?.name) || sliceProductName(item?.productName)}</h2>
                    </a>
                  </Link>
                  <Space align={'start'} size={10}>
                    <Link href={`/user/${item.userID}`}>
                      <a className={styles.link} target="_blank">
                        <img className={styles.list__avatar} src={item.userPreviewFilePath} alt="Avatar" width={25} height={25} />
                      </a>
                    </Link>
                    <Link href={`/user/${item.userID}`}>
                      <a className={styles.link} target="_blank">
                        <p>{item.userName}</p>
                      </a>
                    </Link>
                  </Space>
                </div>
              </div>
              {!props.hideButton && (
                <Button className={styles.proposalBtn} onClick={() => handleSelectProduct(item)}>Proposal</Button>
              )}
            </li>
          ))}
        </ul>
        ) : (
        <p>No artworks</p>
      )}
      {product && (
        <Modal title={'Proposal'} onCancel={closeModal} footer={null} visible={true}>
          <ModalArtworkProposal closeModal={closeModal} galleryID={props.galleryID} loadProducts={props.loadProducts} product={product}/>
        </Modal>
      )}
    </div>
  );
};

export default ArtistWorksList;
