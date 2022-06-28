
import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'antd';
import { LinksServices } from 'core/services';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { useSubmit } from 'core/hooks';
import { TNetwork } from 'core/constants/types';
import { NetworksServices } from 'core/services/networks';
import { SocialBlockProps } from 'components/My/Profile/models';
import { socialOptions } from 'components/My/Profile/Edit/SocialBlock/options';
import SocialNetworkListItem from './ModalNetworkItem';
import style from './styles.module.scss';

interface Props extends SocialBlockProps {
  onCancel: () => void;
  setAddedLinks: (data: any[]) => void;
  addedLinks: any[];
}

const SocialForm: React.FC<Props> = ({ addedLinks, setAddedLinks, onCancel }) => {
  const { t } = useTranslation();
  const id = useSelector((state: TAppState) => state.session.user)?.id;
  const [allNetworksList, setAllNetworksList] = useState<TNetwork[]>([]);
  const { clearError, errorCode, isSubmitting, submit } = useSubmit();

  useEffect(() => {
    loadAddedLinks();
    NetworksServices.search({})
      .then(res => setAllNetworksList(res))
      .catch(error => console.log(error));
  }, []);

  const loadAddedLinks = (): void => {
    LinksServices.linksFetch({ userID: id })
      .then(res => setAddedLinks(res))
      .catch(error => console.log(error));
  };

  const onSubmitDelete = (values: any, clearForm: any): void => {
    const id = addedLinks?.find((id: any) => id?.id === values?.id);
    const userValue = { id: id?.id };
    clearError();
    submit(LinksServices.linksDelete, userValue, () => loadAddedLinks(), clearForm());
  };

  const onSubmit = (values: any): void => {
    const obj = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != null));
    for (const key in obj) {
      const idForSend = allNetworksList.find((item: { name: string }) => item.name === key);
      const userValue = {
        networkID: idForSend?.id,
        value: obj[key],
      };
      clearError();
      submit(LinksServices.linkCreate, userValue, () => loadAddedLinks());
    }
  };

  return (
    <div>
      {errorCode && <Alert message={t(`errors:${errorCode}`)} type="error" showIcon />}
      {allNetworksList?.map((item: TNetwork) => {
        const foundElement = addedLinks?.find((link: any) => link.networkID === item.id);
        const img = socialOptions.find(options => item.name === options.text);
        return (
          <SocialNetworkListItem
            onSubmitDelete={onSubmitDelete}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            foundElement={foundElement}
            img={img}
            item={item}
            key={item.id}
          />
        );
      })}
      <Button className={style.modalNetworks__buttonClose} onClick={onCancel}>
        Close
      </Button>
    </div>
  );
};

export default SocialForm;
