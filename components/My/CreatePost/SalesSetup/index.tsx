import React, { useCallback, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import Preview from 'components/My/Preview';
import Donations from './Donations';
import Gallery from './Gallery';
import Sales from './Sales';

const { TabPane } = Tabs;

interface Props {
  onChange?: (value: string) => void;
  previewAvatar?: string;
  previewImage?: string;
  previewTitle?: string;
}

const SalesSetup: React.FC<Props> = ({ onChange, previewAvatar, previewImage, previewTitle }) => {
  const [activeTab, setActiveTab] = useState('sales');

  const onTabChange = useCallback(
    (activeKey: string) => {
      setActiveTab(activeKey);
      if (onChange) onChange(activeKey);
    },
    [activeTab, setActiveTab],
  );

  return (
    <Tabs onChange={onTabChange} activeKey={activeTab}>
      <TabPane tab="Sales" key="sales">
        <Row gutter={[30, 30]}>
          <Col xs={24} md={12}>
            <Sales />
          </Col>
          <Col xs={24} md={12} xl={{ span: 7, offset: 5 }}>
            <Preview title={previewTitle} image={previewImage} avatar={previewAvatar} />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Donations" key="donations">
        <Donations />
      </TabPane>
      <TabPane tab="Give to gallery" key="gallery">
        <Gallery />
      </TabPane>
    </Tabs>
  );
};

export default SalesSetup;
