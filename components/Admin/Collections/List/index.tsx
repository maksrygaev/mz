import React from 'react';
import Link from 'next/link';
import {Table, Empty, Typography, Checkbox, Spin} from 'antd';
import {CollectionsServices} from 'core/services';
import {useInfiniteFetch} from "../../../../core/hooks";
import {sliceCardUserName, toLocalString} from "../../../../core/helpers";

const { Column } = Table;
const { Title } = Typography;

export default function CollectionsList() {
  const { data, isFetching, hasNextPage, infiniteRef, reLoad } = useInfiniteFetch({
    service: CollectionsServices.search,
    count: 20,
    sorting: {column: "dateCreated", isAscending: false},
    filters: { type: "Drop" }
  });

  const onChangeMain = async (e: any, id: number, pinned: boolean) => {
    try {
      await CollectionsServices.update({ id, pinned: !pinned });
    } catch (error: any) {
      console.log(error);
    }
    reLoad();
  }
  const onChangeDrops = async (e: any, id: number, pinnedDrop: boolean) => {
    try {
      await CollectionsServices.update({ id, pinnedDrop: !pinnedDrop });
    } catch (error: any) {
      console.log(error);
    }
    reLoad();
  }
  const onChangeShow = async (e: any, id: number, visibleDrop: boolean) => {
    try {
      await CollectionsServices.update({ id, visibleDrop: !visibleDrop });
    } catch (error: any) {
      console.log(error);
    }
    reLoad();
  }

  return (
    <>
      <Title>Drops</Title>
      <Table
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      >
        <Column title="Img" dataIndex="previewFilePath" key="previewFilePath" render={ (text, row: any) =>
          <Link href={`/collection/${row.id}`}><a target="_blank"><img style={{width: '100px'}} src={row.previewFilePath} alt={'Banner'} /></a></Link>
        } />
        <Column title="Collection name" dataIndex="name" key="name" render={ (text, row: any) =>
          <Link href={`/collection/${row.id}`} ><a  target="_blank" style={{color: 'black'}}>{row.name}</a></Link>
        } />
        <Column title="Parameters" dataIndex="id" key="id" render={ (text, row: any) =>
          <div style={{textAlign: 'left'}}>
            <Checkbox checked={row.pinned} onChange={e => onChangeMain(e, row.id, row.pinned)}>Main page banner</Checkbox><br/>
            <Checkbox checked={row.pinnedDrop} onChange={e => onChangeDrops(e, row.id, row.pinnedDrop)}>Drop page banner</Checkbox><br/>
            <Checkbox checked={row.visibleDrop} onChange={e => onChangeShow(e, row.id, row.visibleDrop)}>Show (on page Drops)</Checkbox>
          </div>
        } />
        <Column title="Author" dataIndex="userName" key="userName" render={ (text, row: any) =>
          <Link href={`/user/${row.userID}`} ><a  target="_blank" style={{color: 'black'}}>{sliceCardUserName(row.userName)}</a></Link>
        } />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Date" dataIndex="dateCreated" key="dateCreated" render={ (text, row: any) => toLocalString(row.dateCreated) }/>
      </Table>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
    </>
  );
}
