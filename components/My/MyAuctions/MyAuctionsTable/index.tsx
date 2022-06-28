import React, { useEffect, useState } from 'react';
import { Button, Empty, Spin, Table, Select } from 'antd';
import Column from 'antd/lib/table/Column';
import Link from 'next/link';
import Countdown from 'react-countdown';
import { OrdersServices } from 'core/services';
import { TOrder } from 'core/constants/types';
import { useInfiniteFetch } from 'core/hooks';
import {getPriceStr, sliceCardUserName, toLocalString} from 'core/helpers';
import styles from '../index.module.scss';

interface IProps {
  artist?: any;
}

const { Option } = Select;

const MyAuctionsTable: React.FC<IProps> = ({ artist }) => {
  const [filters, setFilters] = useState<any>({ userID: artist.id, type: 'Auction' });

  const { data, isFetching, hasNextPage, infiniteRef } = useInfiniteFetch({
    service: OrdersServices.search,
    count: 30,
    sorting: { column: 'dateCreated', isAscending: false },
    filters: filters,
  });

  const handleSelectChange = (value: string) => setFilters({ ...filters, status: value === 'All' ? null : value });

  const toLocaleTimeString = (date: any) => new Date(date).toLocaleTimeString('en-US', { hour12: false });

  return (
    <div className={styles.content}>
      <Select defaultValue="All" className={styles.select} onChange={handleSelectChange}>
        <Option value="All">All</Option>
        <Option value="Opened">Opened</Option>
        <Option value="Outdated">Finished</Option>
        <Option value="Completed">Completed</Option>
      </Select>
      <Table
        scroll={{ x: true }}
        loading={isFetching}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      >
        <Column
          title="Auction"
          dataIndex="productFilePath"
          key="productFilePath"
          render={(text, row: TOrder) => (
            <Link href={`/product/${row.productID}`}>
              <a target="_blank">
                <img width={100} height={100} src={row.productFilePath} alt={'Preview'} />
              </a>
            </Link>
          )}
        />
        <Column
          title="Product name"
          dataIndex="productName"
          key="productName"
          render={(text, row: TOrder) => (
            <Link href={`/product/${row.productID}`}>
              <a target="_blank">
                <p>{row.productName}</p>
              </a>
            </Link>
          )}
        />
        <Column title="Amount" dataIndex="amount" key="amount" render={(text, row: TOrder) => <p>{row.amount}</p>} />
        <Column
          title="Last bid (ETH)"
          dataIndex="maximalOfferPrice"
          key="maximalOfferPrice"
          render={(text, row: TOrder) => <p>{row.maximalOfferPrice ? getPriceStr(row.maximalOfferPrice) : '-'}</p>}
        />
        <Column
          title="From user"
          dataIndex="maximalOfferUserName"
          key="maximalOfferUserName"
          render={(text, row: TOrder) => (
            <Link href={`/user/${row.maximalOfferUserID}`}>
              <a target="_blank">
                <p>{sliceCardUserName(row?.maximalOfferUserName)}</p>
              </a>
            </Link>
          )}
        />
        <Column
          title="Time"
          dataIndex="dateValid"
          key="dateValid"
          render={(text, row: TOrder) => (
            <Countdown
              date={row.dateValid}
              renderer={({ days, hours, minutes, seconds }) =>
                row.status === 'Opened' ? (
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
                    <br />
                    <span>{`Will close at: ${toLocalString(Number(row.dateValid))} ${toLocaleTimeString(
                      Number(row.dateValid),
                    )}`}</span>
                  </>
                ) : (
                  <span>{`Time's up!`}</span>
                )
              }
            />
          )}
        />
        <Column
          title="Action"
          dataIndex="productID"
          key="productID"
          render={(text, row: TOrder) => {
            if (row.status === 'Opened') {
              if (row.maximalOfferPrice) {
                return (
                  <Button className={'active-tab'}>
                    <Link href={`/product/${row.productID}`}>
                      <a target="_blank">Accept bid</a>
                    </Link>
                  </Button>
                );
              } else {
                return <p>In progress</p>;
              }
            } else if (row.status === 'Outdated') {
              if (row.maximalOfferPrice) {
                return (
                  <Button className={"btn btn-rounded-small-black-border-white-text'"}>
                    <Link href={`/product/${row.productID}`}>
                      <a target="_blank">Accept bid</a>
                    </Link>
                  </Button>
                );
              } else {
                return <>No bids</>;
              }
            } else {
              return <>Completed</>;
            }
          }}
        />
      </Table>
      {(isFetching || hasNextPage) && <div className={'loading-spinner'} ref={infiniteRef} />}
    </div>
  );
};

export default MyAuctionsTable;
