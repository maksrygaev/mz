import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import useWallet from 'core/hooks/useWallet';
import { ellipseAddress } from 'core/helpers';
import { logout } from 'core/actions';
import styles from './UserMenu.module.scss';

interface IProps {
  avatar: string;
  clickMenu: (value: boolean) => void;
  handleClosePopover?: () => void;
}

const UserMenu: FC<IProps> = ({ avatar, clickMenu, handleClosePopover }) => {
  const { connect, disconnect, address, chainId, balanceCrypto, balanceFiat } = useWallet();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onLogOut = (): void => {
    disconnect();
    dispatch(logout());
  };
  const onClickMenu = (value: boolean): void => {
    clickMenu(false);
  };

  return (
    <div className={styles.user}>
      <div className={styles.user_top}>
        <div>
          <div className={styles.user_top_eth}>
            <div className={styles.user_top_image}>
              <img src="/images/pic-account.png" className="" alt="" />
            </div>
            <div className={styles.user_top_eth_value}>
              {(balanceCrypto || balanceCrypto == 0) && address ? (
                <p>
                  {`${balanceCrypto} ETH`}
                  <span> {balanceFiat == null ? '' : '$ ' + balanceFiat}</span>
                </p>
              ) : (
                'connect metamask'
              )}
            </div>
          </div>
        </div>
        <div className={styles.user_div_avatar} onClick={() => onClickMenu(false)}>
          <div className={styles.user_dot} />
          <div>
            <img src={avatar} className={styles.user_user_pic} alt="" />
          </div>
        </div>
      </div>
      {address ? (
        <div className={styles.user_wallet}>
          <div>Wallet</div>
          <div>{ellipseAddress(address)}</div>
          <div className={styles.user_wallet_bottom}>{`ChainId: ${chainId}`}</div>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      ) : (
        <div className={styles.user_metamask}>
          <Button onClick={connect}>Metamask</Button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/my">
            <a onClick={handleClosePopover}>{t('common:my profile')}</a>
          </Link>
        </li>
        <li>
          <Link href="/my/auctions">
            <a onClick={handleClosePopover}>{t('common:my auctions')}</a>
          </Link>
        </li>
        <li>
          <Link href="/my/collections">
            <a onClick={handleClosePopover}>{t('common:my collections')}</a>
          </Link>
        </li>
        <li>
          <Link href="/my/likes">
            <a onClick={handleClosePopover}>{t('common:my likes')}</a>
          </Link>
        </li>
        <li>
          <Link href="/my/galleries">
            <a onClick={handleClosePopover}>{t('common:my galleries')}</a>
          </Link>
        </li>
        <li>
          <Button className={styles.user_button_link} type="link" onClick={onLogOut}>
            {t('common:log out')}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
