/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'antd';
import { LinkData, LinksServices } from 'core/services';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { useSubmit } from 'core/hooks';
import { socialOptions } from './options';
import { SocialBlockProps, UserProps } from '../../models';
import { NetworksServices } from 'core/services/networks';
import { TNetwork } from 'core/constants/types';
import styles from '../editProfile.module.scss';

interface Props extends SocialBlockProps {
  user?: UserProps;
  loadLinks?: any;
}

const SocialFormGallery: React.FC<Props> = ({loadLinks, linksList}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const id = useSelector((state: TAppState) => state.session.user)?.id;
  const { clearError, errorCode, submit } = useSubmit();
  const [socialData, setSocialData] = useState<TNetwork[]>([]);

  useEffect(() => {
    loadLinks();

    NetworksServices.search({})
      .then(res => setSocialData(res))
      .catch(error => console.log(error));
  }, []);

  const onSubmit = (values: any) => {
    const obj = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != null));
    for (const key in obj) {
      const idForSend = socialData.find((item: { name: string }) => item.name === key);
      const userValue = {
        networkID: idForSend?.id,
        value: obj[key],
      };
      clearError();
      submit(LinksServices.linksCreateGallery, userValue, response => {
        loadLinks();
        form.resetFields();
      });
    }
  };

  return (
    <>
      {errorCode && <Alert message={t(`errors:${errorCode}`)} type="error" showIcon />}
      <Form className="myForm" form={form} initialValues={{ name: '', link: '' }} layout="inline" onFinish={onSubmit}>
        {socialData.map(
          (option: { id: number; name: string | null | undefined; link: React.Key | null | undefined }) => {
            const findItem = linksList?.find(link => link.networkID === option.id);
            const img = socialOptions.find(item => option.name === item.text);
            return (
              findItem && (
                <React.Fragment key={option.link}>
                  <div className={styles.border} />
                  <div>
                    <div id={'name'}>
                      <span id={'icon'}>{img?.icon}</span>
                      <span>{option.name}</span>
                    </div>
                    <a href={findItem.value}>{findItem.value?.substring(0, 30)}</a>
                  </div>
                </React.Fragment>
              )
            );
          },
        )}
      </Form>
    </>
  );
};

export default SocialFormGallery;
