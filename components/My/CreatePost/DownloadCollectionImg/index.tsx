import React, { useState } from 'react';
import { Button, Upload, Spin } from 'antd';
import { FilesServices } from 'core/services/files';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './downloadCollectionImg.module.scss';

export interface AvatarProps {
  onUploadFile?: (value: string) => void;
  collectionIdFile?: string;
  type?: string;
}

const DownloadCollectionImg: React.FC<AvatarProps> = ({ onUploadFile, collectionIdFile = '', type }) => {
  const [fileInfo, setFileInfo] = useState<any>(collectionIdFile);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFileLoading, setIsFileLoading] = useState(false);

  const uploadFile = (info: any) => {
    const data = new FormData();
    data.append('file', info.file);
    setIsFileLoading(true);
    FilesServices.fileUpload(data)
      .then(response => {
        setFileInfo(response);
        if (onUploadFile) {
          onUploadFile(response.id);
        }
        setIsFileLoading(false);
      })
      .catch(error => {
        setErrorMessage(`The file was not uploaded. ${error.message}`);
        setIsFileLoading(false);
      });
  };
  const beforeUpload = (file: any): boolean => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) setErrorMessage('Image must be smaller than 1MB!');
    else setErrorMessage('');
    return isLt2M;
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <div className={styles.change__img}>
        <img src={fileInfo.path} alt="" />
        <div style={{ textAlign: 'center' }}>{isFileLoading ? <Spin indicator={loadingIcon} /> : ''}</div>
      </div>
      <div className={styles.change}>
        <Upload beforeUpload={beforeUpload} customRequest={uploadFile} showUploadList={false}>
          <Button className={styles.collectionButton}>
            <span className={styles.red_star}>*</span>Add Collection {type}
          </Button>{' '}
          (Max upload 1 Mb)
        </Upload>
      </div>
      {errorMessage && (
        <div className="form-message-error">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default DownloadCollectionImg;
