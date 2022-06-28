import React, { FC, useEffect, useState } from 'react';
import { Table, Modal, notification, Empty, Typography } from 'antd';
import SettingServices from 'core/services/setting';
import SettingForm from 'components/Admin/Setting/Form';

const { Column } = Table;
const { Title } = Typography;

const SettingList: FC = () => {
  const [settings, setSettings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  const loadData = (): void => {
    setIsFetching(true);
    SettingServices.list()
      .then(response => {
        const data = response.filter((item: any) => {
          return item.key !== 'DisartiveWorldRecovererURL' && item.key !== 'WebPortalRootAddress';
        });
        setSettings(data);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };
  useEffect(loadData, []);

  const handleOnSuccess = (): void => {
    setSelectedSetting(null);
    notification.success({ message: 'Settings saved' });
    loadData();
  };

  const handleOnCancel = (): void => {
    setSelectedSetting(null);
  };

  return (
    <>
      <Title>Settings</Title>
      <Table
        rowKey={(record: any) => record.id}
        loading={isFetching}
        dataSource={settings}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
        onRow={record => ({ onClick: () => setSelectedSetting(record) })}
      >
        <Column title="Parameter" dataIndex="name" key="name" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Value" dataIndex="value" key="value" />
        <Column title="Access" dataIndex="visibility" key="visibility" />
      </Table>
      {selectedSetting && (
        <Modal title="SETTINGS" visible onCancel={handleOnCancel} footer={null}>
          <SettingForm setting={selectedSetting} onSuccess={handleOnSuccess} />
        </Modal>
      )}
    </>
  );
};

export default SettingList;
