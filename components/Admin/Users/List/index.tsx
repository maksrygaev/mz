import React, { useEffect, useState } from 'react';
import { Table, Modal, notification, Empty, Typography } from 'antd';
import { ProductsServices } from 'core/services';
import ProductsForm from '../Form';

const { Column } = Table;
const { Title } = Typography;

export default function UsersList() {
  const [settings, setSettings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  const loadData = () => {
    setIsFetching(true);
    const params = {
      limitation: {count: 10, firstRow: 0},
      sorting: {column: "countViews", isAscending: "false"},
      status: "Published"
    };
    ProductsServices.search(params)
      .then((response) => {
        setSettings(response);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  useEffect(loadData, []);

  const handleOnSuccess = () => {
    setSelectedSetting(null);
    notification.success({ message: 'Products saved' });
    loadData();
  };

  const handleOnCancel = () => {
    setSelectedSetting(null);
  };
  const toLocalString = (date: any) => {
    return new Date(date).toLocaleDateString("en-US");
  }

  return (
    <>
      <Title>Products</Title>
      <Table
        rowKey={(record) => record.id}
        loading={isFetching}
        dataSource={settings}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
        onRow={(record: any) => ({ onClick: () => setSelectedSetting(record) })}
      >
        <Column title="Img" dataIndex="previewFilePath" key="previewFilePath" render={ (text, row: any) => <img style={{width: '100px'}} src={row.previewFilePath} alt={'Preview'} /> } />
        <Column title="Parameter name" dataIndex="name" key="name" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Author" dataIndex="userName" key="userName" />
        <Column title="Date" dataIndex="dateCreated" key="dateCreated" render={ (text, row: any) => toLocalString(row.dateCreated) }/>
      </Table>
      {selectedSetting && (
        <Modal title="Parameter setting" visible onCancel={handleOnCancel} footer={null}>
          <ProductsForm setting={selectedSetting} onSuccess={handleOnSuccess} />
        </Modal>
      )}
    </>
  );
}
