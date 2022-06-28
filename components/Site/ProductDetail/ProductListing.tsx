import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { Table, Button, Popover, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import useWallet from 'core/hooks/useWallet';
import ActionModal from '../ActionModal';
import { getPriceStr } from 'core/helpers/getPriceStr';
import styles from './product.module.scss';
import { TAppState } from 'core/store';
import ModalBidsAccept from 'components/Modal/ModalBidsAccept';
import { TOrder } from 'core/constants/types';
import {sliceCardUserName} from "../../../core/helpers";

interface Props {
  product: any;
  onSuccess: (text?: string) => void;
}

const ProductListing: React.FC<Props> = ({ product, onSuccess }) => {
  const user = useSelector((state: TAppState) => state.session.user);
  const { address, connect, chainId, buyToken, balanceCrypto } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSellID, setCurrentSellID] = useState(0);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const fixed = product.sales.filter((item: any) => item.type === 'Sale');
  const auctions = product.auctions.map((item: any) => {
    if (!item.maximalBet) item.maximalBet = item.price;
    return item;
  });
  const fixprices = fixed.filter(
    (item: any) =>
      (item.dateValid - item.dateCreated) / 1000 < 31536000 && (item.dateValid - item.dateCreated) / 1000 > 31535700,
  );
  const fixTime = fixed.filter(
    (item: any) =>
      !((item.dateValid - item.dateCreated) / 1000 < 31536000 && (item.dateValid - item.dateCreated) / 1000 > 31535700),
  );

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <strong>{amount}</strong>,
    },
    {
      title: 'Sum total',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => <strong>{getPriceStr(price)} ETH</strong>,
    },
    {
      title: 'From',
      key: 'sellerName',
      render: (text: string, record: any) => {
        return (
          <>
            <Link href={`/user/${record.userID}`}>
              <a>{sliceCardUserName(record?.userName) || 'Master'}</a>
            </Link>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => {
        const isNeedBalance = Boolean(balanceCrypto && balanceCrypto < Number(getPriceStr(record.price)));
        return address ? (
          <>
            <Button
              className="btn btn-sale-black"
              style={{ width: '80%' }}
              onClick={() => handleOnBuy(record)}
              disabled={Boolean(currentSellID) || isNeedBalance}
              loading={Boolean(currentSellID) && currentSellID === record.id}
            >
              Buy
            </Button>
            {Boolean(currentSellID) && currentSellID === record.id && (
              <Popover content="" title="Please, wait while transaction will be completed.">
                <div style={{ position: 'absolute', top: '10px', height: '65px', width: '50%', zIndex: 20 }}></div>
              </Popover>
            )}
            {isNeedBalance && (
              <Popover content="" title="You don't have enough money">
                <div style={{ position: 'absolute', top: '10px', height: '65px', width: '100%', zIndex: 20 }}></div>
              </Popover>
            )}
          </>
        ) : (
          <Button className={`btn btn-sale-white ${styles.button}`} style={{ width: '80%' }} onClick={connect}>
            Connect Metamask
          </Button>
        );
      },
    },
  ];

  const columnsTime = [
    {
      title: 'Time',
      dataIndex: 'dateValid',
      key: 'dateValid',
      render: (dateValid: any, row: any) => {
        if (!isClient) return null;
        return (
          <div className={styles.auctionblock__edition} style={{ height: '30px', margin: 0 }}>
            <div className={styles.auctionblock__edition__clock}>
              <img src="/icons/icon-clock.svg" alt="time" />
            </div>
            <div className={styles.auctionblock__edition__time}>
              <Countdown
                date={dateValid}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (row.status === 'Opened') {
                    return (
                      <>
                        {days > 0 && (
                          <>
                            <span>{days}</span> {days === 1 ? 'day' : 'days'}{' '}
                          </>
                        )}
                        {hours > 0 && (
                          <>
                            <span>{hours}</span> {hours === 1 ? 'hour' : 'hours'}{' '}
                          </>
                        )}
                        <span>{('0' + minutes).slice(-2)}</span> min{' '}
                        {days === 0 && (
                          <>
                            <span>{('0' + seconds).slice(-2)}</span> sec
                          </>
                        )}
                      </>
                    );
                  } else {
                    return <span>{`Time's up!`}</span>;
                  }
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <strong>{amount}</strong>,
    },
    {
      title: 'Sum total',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => <strong>{getPriceStr(price)} ETH</strong>,
    },
    {
      title: 'From',
      key: 'sellerName',
      render: (text: string, record: any) => {
        return (
          <>
            <Link href={`/user/${record.userID}`}>
              <a>{sliceCardUserName(record?.userName) || 'Master'}</a>
            </Link>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => {
        const isNeedBalance = Boolean(balanceCrypto && balanceCrypto < Number(getPriceStr(record.price)));
        return address ? (
          <>
            <Button
              className="btn btn-sale-black"
              style={{ width: '80%' }}
              onClick={() => handleOnBuy(record)}
              disabled={Boolean(currentSellID) || isNeedBalance}
              loading={Boolean(currentSellID) && currentSellID === record.id}
            >
              Buy
            </Button>
            {Boolean(currentSellID) && currentSellID === record.id && (
              <Popover content="" title="Please, wait while transaction will be completed.">
                <div style={{ position: 'absolute', top: '10px', height: '65px', width: '50%', zIndex: 20 }}></div>
              </Popover>
            )}
            {isNeedBalance && (
              <Popover content="" title="You don't have enough money">
                <div style={{ position: 'absolute', top: '10px', height: '65px', width: '100%', zIndex: 20 }}></div>
              </Popover>
            )}
          </>
        ) : (
          <Button
            className="btn btn-sale-white"
            style={{ wordBreak: 'break-all', height: '100%', minHeight: '34px' }}
            onClick={connect}
          >
            <span>
              Connect <wbr />
              Metamask
            </span>
          </Button>
        );
      },
    },
  ];

  const columnsAuction = [
    {
      title: 'Time',
      dataIndex: 'dateValid',
      key: 'dateValid',
      render: (dateValid: any, row: any) => {
        if (!isClient) return null;
        return (
          <div className={styles.auctionblock__edition} style={{ height: '30px', margin: 0 }}>
            <div className={styles.auctionblock__edition__clock}>
              <img src="/icons/icon-clock.svg" alt="time" />
            </div>
            <div className={styles.auctionblock__edition__time}>
              <Countdown
                date={dateValid}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (row.status === 'Opened') {
                    return (
                      <>
                        {days > 0 && (
                          <>
                            <span>{days}</span> {days === 1 ? 'day' : 'days'}{' '}
                          </>
                        )}
                        {hours > 0 && (
                          <>
                            <span>{hours}</span> {hours === 1 ? 'hour' : 'hours'}{' '}
                          </>
                        )}
                        <span>{('0' + minutes).slice(-2)}</span> min{' '}
                        {days === 0 && (
                          <>
                            <span>{('0' + seconds).slice(-2)}</span> sec
                          </>
                        )}
                      </>
                    );
                  } else {
                    return <span>{`Time's up!`}</span>;
                  }
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <strong>{amount}</strong>,
    },
    {
      title: 'Last bid',
      dataIndex: 'maximalOfferPrice',
      key: 'maximalOfferPrice',
      render: (price: string) => (
        <a>
          <strong>{getPriceStr(price)} ETH</strong>
        </a>
      ),
    },
    {
      title: 'From',
      key: 'maximalOfferUserName',
      render: (text: string, record: any) => {
        return (
          <div style={{minWidth: 120}}>
            <Link href={`/user/${record.userID}`}>
              <a style={{wordBreak: 'break-all'}}>{sliceCardUserName(record?.maximalOfferUserName) || sliceCardUserName(record?.userName) || 'Master'}</a>
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => {
        if (!isClient) return null;
        return (
          <Countdown
            date={record.dateValid}
            renderer={({ completed }) => {
              if (!completed) {
                if (record?.userID === user?.id) {
                  if (record?.maximalOfferPrice) {
                    return (
                      <Button onClick={() => setSelectedOrder(record)} className="btn btn-sale-black">
                        Accept bid
                      </Button>
                    );
                  } else {
                    return <div>In progress</div>;
                  }
                } else if (address) {
                  return (
                    <Button
                      className="btn btn-sale-black"
                      onClick={() => setSelectedAuction(record)}
                      disabled={isSubmitting}
                    >
                      Make a Bid
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      className="btn btn-sale-white"
                      style={{ wordBreak: 'break-all', height: '100%', minHeight: '34px' }}
                      onClick={connect}
                    >
                      <span>
                        Connect <wbr />
                        Metamask
                      </span>
                    </Button>
                  );
                }
              } else {
                if (record.status !== 'Completed') {
                  if (record?.userID === user?.id && record?.maximalOfferUserID) {
                    return (
                      <Button
                        onClick={() => setSelectedOrder(record)}
                        className="btn btn-sale-black"
                        style={{ width: '80%' }}
                      >
                        Accept bid
                      </Button>
                    );
                  } else if (record?.userID === user?.id) {
                    return <div>No bids</div>;
                  } else {
                    return <div>In progress</div>;
                  }
                } else {
                  return <div>Completed</div>;
                }
              }
            }}
          />
        );
      },
    },
  ];

  const handleOnBuy = async (sale: any) => {
    if (chainId && sale?.permission) {
      try {
        setCurrentSellID(sale.id);
        const permitJson = JSON.parse(sale.permission);
        await buyToken(permitJson, sale.signature, sale.id);
        setTimeout(() => {
          setCurrentSellID(0);
          onSuccess('Was bought successfully');
        }, 8000);
      } catch (error) {
        console.log(error);
        setCurrentSellID(0);
      }
    }
  };

  const handleOnSuccessAuction = (): void => {
    setSelectedAuction(null);
    setSelectedOrder(null);
    onSuccess();
  };

  return (
    <div className="saleTable">
      {fixprices.length > 0 && (
        <>
          <h2 style={{ display: 'inline-flex' }}>Open Edition</h2>
          <Popover content="" title="Fixed price" className={styles.auctionblock__infopic}>
            <ExclamationCircleFilled />
          </Popover>
          <Table
            scroll={{ x: true }}
            rowKey={'id'}
            columns={columns}
            dataSource={fixprices.reverse()}
            pagination={false}
          />
        </>
      )}
      {fixTime.length > 0 && (
        <>
          <h2 style={{ display: 'inline-flex', marginTop: '30px' }}>Fixed time</h2>
          <Table
            scroll={{ x: true }}
            rowKey={'id'}
            columns={columnsTime}
            dataSource={fixTime.reverse()}
            pagination={false}
          />
        </>
      )}
      {auctions.length > 0 && (
        <>
          <h2 style={{ marginTop: '30px' }}>Auction</h2>
          <Table
            scroll={{ x: true }}
            rowKey={'id'}
            columns={columnsAuction}
            dataSource={auctions.reverse()}
            pagination={false}
          />
        </>
      )}
      {Boolean(selectedAuction) && (
        <ActionModal
          product={product}
          auction={selectedAuction}
          onCancel={() => setSelectedAuction(null)}
          onSuccess={handleOnSuccessAuction}
        />
      )}
      {selectedOrder && (
        <Modal footer={null} width={600} onCancel={() => setSelectedOrder(null)} visible>
          <ModalBidsAccept order={selectedOrder} onSuccess={handleOnSuccessAuction} />
        </Modal>
      )}
    </div>
  );
};

export default ProductListing;
