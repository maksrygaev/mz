import { FC } from 'react';
import modal from './ModalCardWallet.module.scss';
import { Button } from 'antd';

interface IProps {
  onClickCard: (value: boolean) => void;
}

export const ModalCardWallet: FC<IProps> = ({onClickCard}): JSX.Element => {
  const handleSubmitCard = (): void => {
    onClickCard(true);
  };
  return (
      <div className={modal.modal}>
        <div className={modal.modal__name}>
          Choose option
        </div>
        <div className={modal.modal__button}>
          <Button className="btn btn-rounded-small-white-border-black-text" style={{width: '170px'}} >
            Wallet
          </Button>
        </div>
        <div className={modal.modal__button}>
          <Button onClick={handleSubmitCard} className="btn btn-rounded-small-black-border-white-text" style={{width: '170px', marginTop: '15px'}}>
            Card
          </Button>
        </div>
      </div>
  );
};