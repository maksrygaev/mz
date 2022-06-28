import { Button, Modal, Popover } from 'antd';
import { ModalHistory } from 'components/Modal/ModalHistory';
import { TCollections } from 'core/constants/types';
import Link from 'next/link';
import { FC, useState } from 'react';
import styles from './product.module.scss';

interface IProps {
  product: any;
}

const ProductCollections: FC<IProps> = ({ product }) => {
  const [isModalVisibleHistory, setIsModalVisibleHistory] = useState(false);
  const showModalHistory = (): void => setIsModalVisibleHistory(true);
  const handleOkHistory = (): void => setIsModalVisibleHistory(false);
  const handleCancelHistory = (): void => setIsModalVisibleHistory(false);


  const content = (
    <div className={styles.product__popover}>
      {product?.collections.length > 0 && (
        <div className={styles.product__infoPopover}>
          <p>Art in collections</p>
          {product.collections.map((collection: TCollections) => {
            return (
              <Link href={`/collection/${collection.collectionID}`} key={collection.id}>
                <a className={styles.product__infoLink}>{collection.collectionName.length > 20 ? `${collection.collectionName.substr(0, 20)}...` : collection.collectionName}</a>
              </Link>
            );
          })}
        </div>
      )}
      {product?.galleries.length > 0 && (
        <div className={styles.product__infoPopover}>
          <p className={styles.product__titlePopover}>Art in galleries</p>
          {product?.galleries.map((gallery: any) => {
            return (
              <Link href={`/gallery/${gallery.galleryID}`} key={gallery.galleryID}>
                <a className={styles.product__infoLink}>{gallery.galleryName.length > 20 ? `${gallery.galleryName.substr(0, 20)}...` : gallery.galleryName}</a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.product__info}>
      <div className={styles.product__infoWrapper}>
        <div className={product?.galleries.length > 0 ? styles.product__infoCollections : ''}>
          {(product?.collections.length > 1 || product?.galleries.length > 1) && (
            <div className={styles.product__infoSection} style={{ marginRight: '20px' }}>
              <Popover placement="topRight" content={content} trigger="click" overlayClassName="popover-collections">
                <button className={styles.product__btn}>
                  <p className={styles.product__ellipsis}>...</p>
                </button>
              </Popover>
            </div>
          )}
          {product?.collections.length > 0 && (
            <div style={{ marginRight: '20px' }}>
              <span>Art in Collection</span>
              <br />
              <div style={{ textDecoration: 'underline' }}>
                <Link href={`/collection/${product.collections[0].collectionID}`}>
                  <a style={{ color: 'black', wordBreak: 'break-all' }}>{product.collections[0].collectionName > 20 ? `${product.collections[0].collectionName.substr(0, 20)}...` : product.collections[0].collectionName}</a>
                </Link>
              </div>
            </div>
          )}
        </div>
        {product?.galleries.length > 0 && (
          <div className={(product?.collections.length > 1 || product?.galleries.length > 1) ? styles.artIngGallery : styles.artIngGallery2}>
            <span>Art in Gallery</span>
            <br />
            <div style={{ textDecoration: 'underline' }}>
              <Link href={`/gallery/${product.galleries[0].galleryID}`}>
                <a style={{ color: 'black', wordBreak: 'break-all' }}>{product.galleries[0].galleryName > 20 ? `${product.galleries[0].galleryName.substr(0, 20)}...` : product.galleries[0].galleryName}</a>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className={styles.product__btnHistory}>
        <Modal
          width={850}
          title=""
          visible={isModalVisibleHistory}
          onOk={handleOkHistory}
          onCancel={handleCancelHistory}
          footer={null}
        >
          <ModalHistory productID={product?.id} />
        </Modal>
        <Button onClick={showModalHistory} className={'btn btn-rounded-white-black-border'}>
          History
        </Button>
      </div>
    </div>
  );
};

export default ProductCollections;
