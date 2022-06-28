import { FC } from 'react';
import modal from './ModalLogin.module.scss';
import { Button } from 'antd';

export const ModalLogin: FC = () => {
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Become a legend
        </div>
        <div className={modal.modal__item}>
          <Button
            className={`btn btn-rounded-black-img`}
            icon={<img src="/images/pic-btn-metamask.png" alt="" />}
          >
            Metamask
          </Button>
        </div>
        <div className={modal.modal__item}>
          <Button
            className="btn btn-rounded-white-black-border-img"
            icon={<img src="/images/pic-btn-walletconnect.png" alt="" />}
          >
            Walletconnect
          </Button>
        </div>
        <div className={modal.modal__item}>
          <Button
            className="btn btn-rounded-white-black-border-img"
            icon={<img src="/images/pic-btn-formatic.png" alt="" />}
          >
            Formatic
          </Button>
        </div>
        <div className={modal.modal__item}>
          <Button
            className={`btn btn-rounded-black`}
            style={{width: '300px', fontSize: '22px', letterSpacing: '2px'}}
          >
            Log in
          </Button>
        </div>
      </div>
  );
};