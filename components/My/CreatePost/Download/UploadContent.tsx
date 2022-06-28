import React from 'react';
import { InboxOutlined } from '@ant-design/icons';

const UploadContent: React.FC = () => {
  return (
    <>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </>
  );
};

export default UploadContent;
