import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { FilesServices } from 'core/services/files';
import Avatar from 'components/Common/Avatar';
import styles from './index.module.scss';

export interface AvatarProps {
  alt?: string;
  onUploadFile?: (value: string) => void;
  sessionIdFile?: string;
  avatarPath?: string;
}

const CollectionAvatarEdit: React.FC<AvatarProps> = ({ alt, onUploadFile, avatarPath, sessionIdFile = '' }) => {
  const [fileInfo, setFileInfo] = useState<any>(sessionIdFile);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const uploadFile = (info: any) => {
    const data = new FormData();
    data.append('file', info.file);

    FilesServices.fileUpload(data)
      .then(response => {
        setFileInfo(response);
        if (onUploadFile) onUploadFile(response.id);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 / 40 < 1;
    if (!isLt2M) {
      setErrorMessage('Image must be smaller than 40MB!');
    }
    return isLt2M;
  };

  return (
    <div className={styles.avatar}>
      <div className={styles.avatar__img}>
        <Avatar size="large" alt={alt} image={fileInfo?.path ? fileInfo?.path : avatarPath} />
      </div>
      <div>
        <Upload beforeUpload={beforeUpload} customRequest={uploadFile} showUploadList={false}>
          <Button className={`btn btn-rounded-small-white-border-black-text`} style={{ padding: '0 12px' }}>
            Change avatar
          </Button>
          <div className={styles.avatar__size}>Recommended picture size 100x100px</div>
        </Upload>
      </div>
      {errorMessage && <div className="form-message-error">{errorMessage}</div>}
    </div>
  );
};

export default CollectionAvatarEdit;
