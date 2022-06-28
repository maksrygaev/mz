import React from 'react';
import Link from 'next/link';
import {Table, Empty, Typography, Checkbox, Spin} from 'antd';
import { GalleriesServices } from 'core/services/galleries';
import { TGallery } from 'core/constants/types';
import {sliceCardUserName, toLocalString} from "../../../core/helpers";
import {useInfiniteFetch} from "../../../core/hooks";

const { Column } = Table;
const { Title } = Typography;

export default function BannersList() {
  const { data, isFetching, hasNextPage, infiniteRef, reLoad } = useInfiniteFetch({
    service: GalleriesServices.search,
    sorting: { column: 'dateCreated', isAscending: 'false'},
    count: 20,
    filters: { status: 'Approved'}
  });

  const onChangeMain = async (row: TGallery) => {
    const data = {id: row.id, pinned: !row.pinned};
    try {
      await GalleriesServices.update({ data });
    } catch (error: any) {
      console.log(error);
    }
    reLoad();
  };

  return (
    <>
      <Title>Banners</Title>
      <Table
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
        className="admin_collections"
      >
        <Column
          title="Img"
          dataIndex="bannerFileID"
          key="bannerFileID"
          render={(text, row: any) => (
            <Link href={`/collection/${row.id}`}>
              <a target="_blank">
                <img style={{ width: '100px' }} src={row.previewFilePath} alt={'Banner'} />
              </a>
            </Link>
          )}
        />
        <Column
          title="Collection name"
          dataIndex="name"
          key="name"
          render={(text, row: any) => (
            <Link href={`/collection/${row.id}`}>
              <a target="_blank" style={{ color: 'black' }}>
                {sliceCardUserName(row.name)}
              </a>
            </Link>
          )}
        />
        <Column
          title="Parameters"
          dataIndex="id"
          key="id"
          render={(text, row: any) => (
            <div style={{ textAlign: 'left' }}>
              <Checkbox checked={row.pinned} onChange={() => onChangeMain(row)}>
                Main page banner
              </Checkbox>
              <br />
            </div>
          )}
        />
        <Column
          title="Author"
          dataIndex="userName"
          key="userName"
          render={(text, row: any) => (
            <Link href={`/user/${row.userID}`}>
              <a target="_blank" style={{ color: 'black' }}>
                {row.userName}
              </a>
            </Link>
          )}
        />
        <Column title="Type" dataIndex="status" key="status" />
        <Column
          title="Date"
          dataIndex="dateCreated"
          key="dateCreated"
          render={(text, row: any) => toLocalString(row.dateCreated)}
        />
      </Table>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
    </>
  );
}
