import React from 'react';
import { Col, Row } from 'antd';
import FacetsPanel from '../FacetsPanel';

interface Props {
  filterContent?: React.ReactNode;
  onClear?: () => void;
  resultContent: React.ReactNode;
}

const SearchLayout: React.FC<Props> = ({ filterContent, onClear, resultContent }) => {
  return (
    <Row gutter={30}>
      <Col xs={24} lg={6}>
        <FacetsPanel onClear={onClear}>{filterContent}</FacetsPanel>
      </Col>
      <Col xs={24} lg={18}>
        {resultContent}
      </Col>
    </Row>
  );
};

export default SearchLayout;
