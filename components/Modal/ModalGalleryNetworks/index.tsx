import React, { FC, useEffect, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { TNetwork } from 'core/constants/types';
import { useSubmit } from 'core/hooks';
import { LinkData, LinksServices } from 'core/services';
import { socialOptions } from 'components/My/Profile/Edit/SocialBlock/options';
import { urlRule } from 'core/helpers';
import { LoadingOutlined } from '@ant-design/icons';
import { NetworksServices } from 'core/services/networks';
import styles from './index.module.scss';
import useTranslation from 'next-translate/useTranslation';

interface Props {
  galleryID: number;
  loadLinks: () => void;
  linksList: LinkData[];
}

const ModalGalleryNetworks: FC<Props> = ({ linksList, loadLinks, galleryID}) => {
  const { t } = useTranslation();
  const [socialData, setSocialData] = useState<TNetwork[]>([]);
  const { clearError, errorCode, isSubmitting, submit } = useSubmit();
  const [form] = Form.useForm();

  useEffect(() => {
    NetworksServices.search({})
      .then(res => setSocialData(res))
      .catch(error => console.log(error));
    loadLinks();
  }, []);

  const onSubmitLink = (values: any): void => {
    const obj = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != null));
    for (const key in obj) {
      const idForSend = socialData.find((item: { name: string }) => item.name === key);
      const userValue = {
        galleryID: galleryID,
        networkID: idForSend?.id,
        value: obj[key],
      };
      clearError();
      submit(LinksServices.linksCreateGallery, userValue, () => {
        loadLinks();
        form.resetFields();
      });
    }
  };

  const onSubmitDelete = (values: any): void => {
    const id = linksList?.find(id => id?.id === values?.id);
    const userValue = { id: id?.id };
    clearError();
    submit(LinksServices.linksDeleteGallery, userValue, () => {
      loadLinks();
      form.resetFields();
    });
  };

  return (
    <>
      {errorCode && <Alert message={t(`errors:${errorCode}`)} type="error" showIcon />}
      <Form
        className="myFormGallery"
        form={form}
        initialValues={{ galleryID: 0, name: '', link: '' }}
        layout="inline"
        onFinish={onSubmitLink}
      >
        {socialData.map((option: TNetwork) => {
          const findItem = linksList?.find((link: { networkID: number }) => link.networkID === option.id);
          const img = socialOptions.find(item => option.name === item.text);
          return (
            <React.Fragment key={option.link}>
              <div className={styles.border} />
              <div>
                <div id={'name'}>
                  <span id={'icon'}>{img?.icon}</span>
                  <span>{option.name}</span>
                </div>
                {findItem ? (
                  <a href={findItem.value}>{findItem.value}</a>
                ) : (
                  <Form.Item name={option.name || undefined} rules={[urlRule('Enter correct url')]}>
                    <Input placeholder="Social url" />
                  </Form.Item>
                )}
                {findItem?.value && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Button
                    onClick={() => onSubmitDelete(findItem)}
                    id={'delete'}
                    htmlType="submit"
                    disabled={isSubmitting}
                    icon={<img src="/icons/cross.png" alt="this img" />}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
        <Button className={styles.submit_btn} htmlType="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingOutlined /> : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

export default ModalGalleryNetworks;
