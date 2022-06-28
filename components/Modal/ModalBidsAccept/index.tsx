import React, { useState } from 'react';
import { TOffer } from 'core/constants/types';
import { OffersServices } from 'core/services';
import { useInfiniteFetch } from 'core/hooks';
import { Button, Empty, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { getPriceStr } from 'core/helpers';
import useWallet from '../../../core/hooks/useWallet';

interface IProps {
  order: any;
  onSuccess: () => void;
}

const ModalBidsAccept: React.FC<IProps> = ({ order, onSuccess }) => {
  const { address, claimOffer, connect, signPermit } = useWallet();
  const [selectedOfferID, setSelectedOfferId] = useState(0);

  const { data, isFetching, hasNextPage, infiniteRef } = useInfiniteFetch({
    service: OffersServices.search,
    count: 30,
    sorting: { column: 'dateCreated', isAscending: false },
    filters: { orderID: order.id, status: 'New' },
  });

  const handleAcceptBid = async (offer: any) => {
    if (address && offer?.permission) {
      setSelectedOfferId(offer.id);
      try {
        const permitJson = JSON.parse(offer.permission);
        const { message } = permitJson;
        const isSwap: boolean = permitJson.primaryType === 'SwapPermit';
        const rs = await claimOffer(message, offer.signature, offer.orderID, isSwap);
        setTimeout(() => {
          setSelectedOfferId(0);
          onSuccess();
        }, 8000);
      } catch (error) {
        setSelectedOfferId(0);
        console.log(error);
      }
    }
  };

  if (!order) return null;

  return (
    <div>
      <Table loading={isFetching} dataSource={data} pagination={false} locale={{ emptyText: <Empty /> }}>
        <Column
          title="Last bid"
          dataIndex="maximalOfferPrice"
          key="maximalOfferPrice"
          render={(text, row: TOffer) => <strong>{getPriceStr(row.maximalOfferPrice)} ETH</strong>}
        />
        <Column
          title="From"
          dataIndex="maximalOfferPrice"
          key="maximalOfferPrice"
          render={(text, row: TOffer) => <strong>{row?.userName || 'Master'}</strong>}
        />
        <Column
          title="Action"
          dataIndex="maximalOfferPrice"
          key="maximalOfferPrice"
          render={(text, row: TOffer) => {
            if (address) {
              return (
                <Button
                  className={'btn btn-sale-black'}
                  onClick={() => handleAcceptBid(row)}
                  disabled={Boolean(selectedOfferID)}
                  loading={selectedOfferID === row.id}
                >
                  Accept bid
                </Button>
              );
            } else {
              return (
                <Button className="btn btn-sale-white" onClick={connect}>
                  Connect Metamask
                </Button>
              );
            }
          }}
        />
      </Table>
      {(isFetching || hasNextPage) && <div className={'loading-spinner'} ref={infiniteRef} />}
    </div>
  );
};

export default ModalBidsAccept;
