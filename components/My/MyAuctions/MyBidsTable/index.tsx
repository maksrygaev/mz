import React, { useState } from 'react';
import { OffersServices } from 'core/services';
import { useInfiniteFetch } from 'core/hooks';
import Column from 'antd/lib/table/Column';
import Link from 'next/link';
import { Button, Empty, Select, Spin, Table } from 'antd';
import { getPriceStr } from 'core/helpers';
import Countdown from 'react-countdown';
import styles from '../index.module.scss';

interface IProps {
  artist?: any;
}

const { Option } = Select;

const MyBidsTable: React.FC<IProps> = ({ artist }) => {
  const [filters, setFilters] = useState<any>(() => {
    const initFilters: any = { userID: artist.id };
    return initFilters;
  });

  const { data, isFetching, hasNextPage, infiniteRef } = useInfiniteFetch({
    service: OffersServices.search,
    count: 30,
    sorting: { column: 'dateCreated', isAscending: false },
    filters: filters,
  });

  const handleSelectChange = (value: string) => setFilters({ ...filters, status: value === 'All' ? null : value });

  return (
    <div className={styles.content}>
      <Select defaultValue="All" className={styles.select} onChange={handleSelectChange}>
        <Option value="All">All</Option>
        <Option value="New">Current</Option>
        <Option value="Accepted">Won</Option>
        <Option value="Rejected">Lost</Option>
      </Select>
      <Table
        loading={isFetching}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
        scroll={{ x: true }}
      >
        <Column
          title="Auction"
          dataIndex="productPreviewFilePath"
          key="productPreviewFilePath"
          render={(text, row: any) => (
            <Link href={`/product/${row.productID}`}>
              <a target="_blank">
                <img width={100} height={100} src={row.productPreviewFilePath} alt={'Preview'} />
              </a>
            </Link>
          )}
        />
        <Column
          title="Product name"
          dataIndex="productName"
          key="productName"
          render={(text, row: any) => (
            <Link href={`/product/${row.productID}`}>
              <a target="_blank">
                <p>{row.productName || ''}</p>
              </a>
            </Link>
          )}
        />
        <Column title="Amount" dataIndex="amount" key="amount" render={(text, row: any) => <p>{row.amount}</p>} />
        <Column
          title="My bid (ETH)"
          dataIndex="price"
          key="price"
          render={(text, row: any) => <p>{getPriceStr(row.price)}</p>}
        />
        <Column
          title="Last bid (ETH)"
          dataIndex="maximalOfferPrice"
          key="maximalOfferPrice"
          render={(text, row: any) => <p>{getPriceStr(row.maximalOfferPrice)}</p>}
        />
        <Column
          title="Auction time"
          dataIndex="orderDateValid"
          key="orderDateValid"
          render={(text, row: any) => (
            <Countdown
              date={row.orderDateValid}
              renderer={({ days, hours, minutes, seconds, completed }) =>
                completed ? (
                  <span>{"Time's up!"}</span>
                ) : (
                  <>
                    {days * 24 + hours && <span>{days * 24 + hours} hours </span>}
                    <span>{('0' + minutes).slice(-2)} min </span>
                    <span>{('0' + seconds).slice(-2)} sec</span>
                  </>
                )
              }
            />
          )}
        />
        <Column
          title="Status"
          dataIndex="orderDateValid"
          key="orderDateValid"
          render={(text, row: any) => (
            <>
              <Countdown
                date={row.orderDateValid}
                renderer={({ completed }) =>
                  completed ? (
                    <p>{row.price >= row?.maximalOfferPrice ? 'Your bid won!' : 'Your bid lost!'}</p>
                  ) : (
                    <Button className={'btn btn-rounded-small-black-border-white-text'}>
                      <Link href={`/product/${row.productID}`}>
                        <a target="_blank">Make bid</a>
                      </Link>
                    </Button>
                  )
                }
              />
            </>
          )}
        />
      </Table>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export default MyBidsTable;
