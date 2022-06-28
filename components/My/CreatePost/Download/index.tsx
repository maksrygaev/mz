import React, { FC, useState } from 'react';
import { FilesServices } from 'core/services/files';
import { Form, Upload, Spin } from 'antd';
import style from '../create.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

interface IProps {
  onDownloadBackground: (value: string) => void;
  onDownloadFile: (value: string, mimeType: string) => void;
}

const Download: FC<IProps> = ({ onDownloadBackground, onDownloadFile }) => {
  const [idBackground, setIdBackground] = useState<any>(null);
  const [idFile, setIdFile] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isCoverLoading, setIsCoverLoading] = useState(false);
  const [fileCoverName, setFileCoverName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageBg, setErrorMessageBg] = useState('');

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const uploadFile = async (info: any) => {
    const data = new FormData();
    data.append('file', info.file);
    setIsFileLoading(true);
    FilesServices.fileUpload(data)
    .then(response => {
      setIdFile(response);
      onDownloadFile(response, info?.file.type);
      setErrorMessage('');
      setIsFileLoading(false);
    })
    .catch(error => {
      setErrorMessage(`File was failed to be uploaded. Please try again.`);
      setIsFileLoading(false);
    });
  };

  const uploadBackground = async (info: any) => {
    const data = new FormData();
    data.append('file', info.file);
    setIsCoverLoading(true);
    FilesServices.fileUpload(data)
      .then(response => {
        setIdBackground(response);
        onDownloadBackground(response);
        setErrorMessageBg('');
        setIsCoverLoading(false);
      })
      .catch(error => {
        setErrorMessageBg(`File was failed to be uploaded. Please try again.`);
        setIsCoverLoading(false);
    });
  };

  const beforeUpload = (file: File): boolean => {
    const isLt2M = file.size / 1024 / 1024 < 40;
    if (!isLt2M) {
      setErrorMessage('File should be smaller than 40MB!');
    } else {
      setFileName(file.name);
    }
    return isLt2M;
  };

  const beforeUploadBg = (file: File): boolean => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      setErrorMessageBg('Image should be smaller than 1MB!');
    } else {
      setFileCoverName(file.name);
    }
    return isLt2M;
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Form.Item>
        <Form.Item name="file" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger
            customRequest={uploadFile}
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <div>{isFileLoading ? <Spin indicator={loadingIcon} /> : ''}</div>
            {idFile ? (
              <div>
                <div style={{ maxWidth: '450px', margin: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={idFile?.path}
                      style={{
                        maxWidth: '100%',
                        height: '100%',
                      }}
                      alt=""
                    />
                  </div>
                  <div>{fileName}</div>
                </div>
                <div className={style.download__description}>
                  <div className={style.download__description__top}>
                    <div className={style.download__description__top__left}>
                      Supported filetypes and sizes
                    </div>
                    <div className={style.download__description__top__right}>
                      <span>i</span>
                    </div>
                  </div>
                  <div className={style.download__description__format}>
                    JPG, PNG, GIF, WEBP, MP4, MP3 Max size: 40mb.
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.download__block}>
                <div className={style.download__img}>
                  <img src="/images/create-element.png" alt="" />
                </div>
                <div className={style.download__info}>
                  <div className={style.download__title}>Upload artwork</div>
                  <div className={style.download__recommended}>
                    Recommended picture size 4000х4000px
                  </div>
                </div>
                <div className={style.download__description}>
                  <div className={style.download__description__top}>
                    <div className={style.download__description__top__left}>
                      Supported filetypes and sizes
                    </div>
                    <div className={style.download__description__top__right}>
                      <span>i</span>
                    </div>
                  </div>
                  <div className={style.download__description__format}>
                    JPG, PNG, GIF, WEBP, MP4, MP3 Max size: 40mb.
                  </div>
                </div>
              </div>
            )}
          </Upload.Dragger>
          {errorMessage && <div className={style.upload_form_message_error}>{errorMessage}</div>}
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Form.Item name="background" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger
            customRequest={uploadBackground}
            showUploadList={false}
            beforeUpload={beforeUploadBg}
          >
            <div>{isCoverLoading ? <Spin indicator={loadingIcon} /> : ''}</div>
            {idBackground ? (
              <div>
                <div style={{ maxWidth: '450px', margin: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={idBackground?.path}
                      style={{
                        maxWidth: '100%',
                        height: '100%',
                      }}
                      alt=""
                    />
                  </div>
                  <div>{fileCoverName}</div>
                </div>
                <div className={style.download__block}>
                  <div className={style.download__description}>
                    <div className={style.download__description__top}>
                      <div className={style.download__description__top__left}>
                        Supported filetypes and sizes
                      </div>
                      <div className={style.download__description__top__right}>
                        <span>i</span>
                      </div>
                    </div>
                    <div className={style.download__description__format}>
                      JPG, JPEG, PNG Max size: 100mb.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.download__block}>
                <div className={style.download__img}>
                  <img src="/images/create-element.png" alt="" />
                </div>
                <div className={style.download__info}>
                  <div className={style.download__title}>Upload cover</div>
                  <div className={style.download__recommended}>
                    Recommended picture size 4000х4000px
                  </div>
                </div>
                <div className={style.download__description}>
                  <div className={style.download__description__top}>
                    <div className={style.download__description__top__left}>
                      Supported filetypes and sizes
                    </div>
                    <div className={style.download__description__top__right}>
                      <span>i</span>
                    </div>
                  </div>
                  <div className={style.download__description__format}>
                    JPG, JPEG, PNG Max size: 100mb.
                  </div>
                </div>
              </div>
            )}
          </Upload.Dragger>
          {errorMessageBg && <div className={style.upload_form_message_error}>{errorMessageBg}</div>}
        </Form.Item>
      </Form.Item>
    </>
  );
};

export default Download;
