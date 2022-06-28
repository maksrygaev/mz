import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { ethers } from 'ethers';
import useWallet from 'core/hooks/useWallet';
import { OffersServices } from 'core/services/offers';
import { TAppState } from 'core/store';
import modal from '../../Modal/ModalMakeBid/ModalMakeBid.module.scss';

interface IProps {
  product: any;
  auction: any;
  onCancel: () => void;
  onSuccess: () => void;
}

const ActionModal = ({ product, auction, onCancel, onSuccess }: IProps) => {
  const { chainId, signPermit, approveWETH, checkWETHBalance, depositWETH, balanceCrypto } = useWallet();
  const { WithdrawalApprovalContractAddress } = useSelector((state: TAppState) => state.contract);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const bet = auction.maximalOfferPrice ? auction.maximalOfferPrice : auction.price;
  const bidStep = auction.step ? auction.step : 0.0001;

  const handleSubmit = async (values: any) => {
    if (values.bid < Number(`${+(+ethers.utils.formatUnits(bet) + bidStep).toFixed(4)}`) || isNaN(Number(values.bid))) {
      setErrorMessage('Your bid must be equal to or greater than the minimum bid');
    } else if (balanceCrypto && balanceCrypto < values.bid) {
      setErrorMessage('Your bid exceeds your balance');
    } else {
      setErrorMessage('');
      if (chainId && auction?.permission) {
        try {
          setIsSubmitting(true);
          const { message } = JSON.parse(auction.permission);
          message.price = ethers.utils.parseEther(values.bid.toString()).toString();
          message.createdAt = Math.floor(Date.now() / 1000);
          // // TODO order.deadline + 5 days
          message.deadline = Math.floor((Date.now() + 31622400000) / 1000);
          message.currency = WithdrawalApprovalContractAddress;
          const isSwap = Boolean(product?.contract);
          const needWETH = await checkWETHBalance(message.price, isSwap);
          if (needWETH > 0) {
            await depositWETH(ethers.utils.parseEther(needWETH.toString()));
          }
          await approveWETH(message.price, isSwap);
          const { signature, signedStr } = await signPermit(message, isSwap);
          await OffersServices.create({ permission: signedStr, signature, orderID: auction.id });
          setTimeout(() => {
            setIsSubmitting(false);
            onSuccess();
          }, 2000);
        } catch (error) {
          setIsSubmitting(false);
          console.log(error);
        }
      }
    }
  };

  const initialValues = {
    bid: +(+ethers.utils.formatUnits(bet) + bidStep).toFixed(4),
  };

  return (
    <Modal visible footer={null} onCancel={onCancel}>
      <div className={modal.modal}>
        <div className={modal.modal__name}>Make a bid</div>
        <div className={modal.modal__bids}>
          <div className={modal.modal__bids__item}>
            <span>{+ethers.utils.formatUnits(bet)} ETH</span>
            Last Bid
          </div>
          <div className={modal.modal__bids__item}>
            <span>{+(+ethers.utils.formatUnits(bet) + bidStep).toFixed(4)} ETH</span>
            Minimal Bid
          </div>
        </div>
        <Form form={form} initialValues={initialValues} layout="vertical" name="create_form" onFinish={handleSubmit}>
          <div className={modal.modal__field}>
            <span>Your Bid</span>
            <Form.Item name="bid" rules={[{ required: true, message: 'Please input bid' }]}>
              <Input
                name="bid"
                placeholder="Enter your bid"
                className={'input input-small-rounded-black-border'}
                style={{ fontSize: '24px' }}
                disabled={isSubmitting}
              />
            </Form.Item>
          </div>
          <div className={modal.modal__button}>
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              className={`btn btn-rounded-black`}
              htmlType="submit"
            >
              Make a Bid
            </Button>
          </div>
        </Form>
      </div>
      {errorMessage && <div className="form-message-error">{errorMessage}</div>}
    </Modal>
  );
};

export default ActionModal;
