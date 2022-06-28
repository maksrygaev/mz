import { FC } from 'react';
import modal from './ModalStatus.module.scss';

export const ModalStatus: FC = () => {
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Choose status
        </div>
        <div className={modal.modal__item}>
          <div className={modal.modal__item__pic}>
            <div className={modal.modal__item__pic__circle}>
              <img src="/images/pic-modal-2.png" alt="" />
            </div>
          </div>
          <div className={modal.modal__item__text}>
            <div className={modal.modal__item__text__name}>
              Artist
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className={modal.modal__item}>
          <div className={modal.modal__item__pic}>
            <div className={modal.modal__item__pic__circle_white}>
              <img src="/images/pic-modal-3.png" alt="" />
            </div>
          </div>
          <div className={modal.modal__item__text}>
            <div className={modal.modal__item__text__name}>
              Collector
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className={modal.modal__item}>
          <div className={modal.modal__item__pic}>
            <div className={modal.modal__item__pic__circle_white}>
              <img src="/images/pic-modal-4.png" alt="" />
            </div>
          </div>
          <div className={modal.modal__item__text}>
            <div className={modal.modal__item__text__name}>
              Gallery
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
  );
};