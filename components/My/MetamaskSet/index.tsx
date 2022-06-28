import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { Button, Modal, message } from 'antd';
import useWallet from 'core/hooks/useWallet';
import { hash } from 'core/helpers';
import { UsersServices } from 'core/services';
import { selfUpdate } from 'core/actions';
import styles from './MetamaskSet.module.scss';

const MetamaskSet: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TAppState) => state.session.user);
  const { address, connect, signMessage, disconnect } = useWallet();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user && !user?.walletAddress) {
      setVisible(true);
    } else if (user?.walletAddress) {
      setVisible(false);
    }
  }, [user]);

  useEffect(() => {
    if (address) {
      if (!user) {
        disconnect();
      } else if (user && user?.walletAddress && user.walletAddress.toLowerCase() !== address.toLowerCase()) {
        disconnect();
        message.error('Please connect your wallet entered during registration.');
      }
    }
  }, [address]);

  const handleSetAddress = async () => {
    if (address && user) {
      const userHash = hash(user.id.toString());
      const signature = await signMessage(userHash);
      UsersServices.setWalletAddress({ value: userHash, signature })
        .then(() => {
          dispatch(selfUpdate());
          setError(false);
        })
        .catch(error => {
          if (error.code == 'EXISTS_WALLET') setError(true);
          console.log(error);
        });
    }
  };

  return (
    <Modal title="Set address" visible={visible} footer={null}>
      {!address ? (
        <>
          <Button type="link" onClick={connect}>
            Connect metamask
          </Button>
        </>
      ) : (
        <>
          <p>{`Address: ${address}`}</p>
          <Button onClick={handleSetAddress}>Set address</Button>
          {error && <p className={styles.metamask__error}>Wallet already registered!</p>}
        </>
      )}
    </Modal>
  );
};

export default MetamaskSet;
