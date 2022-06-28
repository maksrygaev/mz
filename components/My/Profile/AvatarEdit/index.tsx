import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { FilesServices } from 'core/services/files';
import Avatar from 'components/Common/Avatar';
import styles from './avatarEdit.module.scss';

export interface AvatarProps {
  alt?: string;
  onUploadFile?: (value: string) => void;
  sessionIdFile?: string;
  avatarPath?: string;
}

const AvatarEdit: React.FC<AvatarProps> = ({ alt, avatarPath, onUploadFile, sessionIdFile = '' }) => {
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const uploadFile = (info: any) => {
    const data = new FormData();
    data.append('file', info.file);

    FilesServices.fileUpload(data)
      .then(response => {
        setFileInfo(response);
        if (onUploadFile) {
          onUploadFile(response?.id);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 / 40 < 1;
    if (!isLt2M) {
      setErrorMessage('Image must be smaller than 40MB!')
    }
    return isLt2M;
  }

  return (
    <>
      <Avatar size="large" alt={alt} image={fileInfo?.path ? fileInfo?.path: avatarPath} />
      <div className={styles.change}>
        <Upload beforeUpload={beforeUpload} customRequest={uploadFile} showUploadList={false}>
          <Button>Change avatar</Button>
        </Upload>
      </div>
      {errorMessage && <div className="form-message-error">{errorMessage}</div>}
    </>
  );
};

export default AvatarEdit;
