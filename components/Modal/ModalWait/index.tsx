import { FC } from 'react';
import modal from './ModalWait.module.scss';

export const ModalWait: FC = () => {
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Please wait
        </div>
        <div className={modal.modal__item}>
          <img src="/images/pic-waiting.png" alt="" />
        </div>
      </div>
  );
};