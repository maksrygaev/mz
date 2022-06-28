import React, { FC } from 'react';
import modal from './ModalComplete.module.scss';
import { Button } from 'antd';

export const ModalComplete: FC = () => {
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Complete!
        </div>
        <div className={modal.modal__item}>
          <img src="/icons/icon-complete.svg" alt="" />
        </div>
        <Button style={{margin: '20px'}} className="btn btn-rounded-small-white-border-black-text ">
          Go to my profile
        </Button>
        <div className={modal.modal__btn}>
          <img src="/icons/icon-share.svg" alt="" />
        </div>
      </div>
  );
};