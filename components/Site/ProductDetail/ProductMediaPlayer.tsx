import React, { FC, useState, useRef } from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import styles from './product.module.scss';
import { Modal } from 'antd';

interface IProps {
  customControls: boolean;
  productData: any;
}

const ProductMediaPlayer: FC<IProps> = ({ productData, customControls }) => {
  const mediaRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const isVideo = productData?.type === 'Video';
  const isAudio = productData?.type === 'Audio';
  const isOtherFileType = !isAudio && !isVideo;

  const imageHandler = (): void => {
    setImageModalVisible(true);
  };

  const mediaHandler = (): void => {
    if (!playing) {
      // @ts-ignore
      mediaRef.current.play();
      setPlaying(true);
    } else {
      // @ts-ignore
      mediaRef.current.pause();
      setPlaying(false);
    }
  };
  return (
    <div>
      {isVideo && (
        <div className={styles.videoblock__center}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={mediaRef}
            src={productData?.contentFilePath}
            width="100%"
            height="100%"
            controls={!customControls}
          />
          {customControls && (
            <div
              style={{
                marginTop: '-66px',
                marginRight: '4px',
                justifySelf: 'right',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={mediaHandler}
                style={{ border: 'none', backgroundColor: 'white' }}
                className={styles.videoblock__control}
              >
                <div className={styles.auctionblock__btn}>{playing ? <PauseOutlined /> : <CaretRightOutlined />}</div>
              </button>
            </div>
          )}
        </div>
      )}
      {isAudio && (
        <div className={styles.audioblock__center}>
          <img width="100%" height="100%" src={productData?.previewFilePath} alt="Auction" />
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            ref={mediaRef}
            src={productData?.contentFilePath}
            controls={!customControls}
            style={{ marginTop: '-60px' }}
          />
          {customControls && (
            <button onClick={mediaHandler} className={styles.audioblock__control}>
              <div className={styles.auctionblock__btn}>{playing ? <PauseOutlined /> : <CaretRightOutlined />}</div>
            </button>
          )}
        </div>
      )}
      {isOtherFileType && (
        <img
          onClick={imageHandler}
          src={productData?.previewFilePath}
          alt="Auction"
          className={styles.product__image}
        />
      )}
      {imageModalVisible && (
        <Modal
          width={850}
          title=""
          visible={imageModalVisible}
          onOk={() => setImageModalVisible(false)}
          onCancel={() => setImageModalVisible(false)}
          footer={null}
        >
          <img width={800} src={productData?.previewFilePath} alt="Auction" />
        </Modal>
      )}
    </div>
  );
};

export default ProductMediaPlayer;
