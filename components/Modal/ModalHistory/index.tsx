import React, { FC, useEffect } from 'react';
import { Spin } from 'antd';
import Link from 'next/link';
import modal from './ModalHistory.module.scss';
import { ActivitesServices } from 'core/services/activites';
import {getPriceStr, sliceCardUserName, toLocalString} from 'core/helpers';
import { useInfiniteFetch } from '../../../core/hooks';

interface Props {
  productID: number;
}

export const ModalHistory: FC<Props> = props => {
  const { infiniteRef, data, isFetching, hasNextPage, reLoad } = useInfiniteFetch({
    service: ActivitesServices.search,
    count: 20,
    filters: { productID: props.productID },
  });

  useEffect(() => reLoad(), [props]);

  const getUserInfo = (product: any, type?: string) => {
    const params =
      type === 'preview' ? product.userToPreviewFilePath : type === 'name' ? product.userToName : product.toUserID;
    switch (product.type) {
      case 'Created':
        return params;
      case 'Minted':
        return params;
      case 'Transferred':
        return params;
      case 'ExpiredListing':
        return params;
      default:
        return type === 'preview'
          ? product.userFromPreviewFilePath
          : type === 'name'
          ? product.userFromName
          : product.fromUserID;
    }
  };

  return (
    <div className={modal.modal}>
      <div className={modal.modal__head}>
        <div className={modal.modal__name}>Artwork history</div>
      </div>
      <div className={modal.modal__history__wrap}>
        {data?.map((product: any) => (
          <div key={product?.id} className={modal.modal__history}>
            <div className={modal.modal__history__name}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Link href={`/user/${getUserInfo(product, 'userID')}`}>
                  <a target={'_blank'}>
                    <div className={modal.modal__history__name__avatar}>
                      <img src={getUserInfo(product, 'preview') || '/icons/userpage/user-default.jpg'} alt="avatar" />
                    </div>
                  </a>
                </Link>
                <Link href={`/user/${getUserInfo(product, 'userID')}`}>
                  <a target={'_blank'}>
                    <div className={modal.modal__history__name__left}>{sliceCardUserName(getUserInfo(product, 'name')) || 'Master'}</div>
                  </a>
                </Link>
              </div>
              <div className={modal.modal__history__name__right}>
                {product?.type} artwork
                <span>{product?.price && ` for Sale ${getPriceStr(product?.price)}`}</span>
              </div>
            </div>
            <div className={modal.modal__history__date}>{toLocalString(product?.dateCreated)}</div>
          </div>
        ))}
      </div>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
    </div>
  );
};
