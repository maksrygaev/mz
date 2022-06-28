import React from 'react';
import { Col, Row } from 'antd';
import Error from '../Error';
import NoResults from '../NoResults';

import { ListItemResult, SearchResultData, SearchResultError } from '../models';

interface ListItemRendererProps {
  index?: number;
  isLoading?: boolean;
  item?: ListItemResult;
}

type ListItemRenderer = (props: ListItemRendererProps) => React.ReactElement;

interface Props {
  counterElement?: React.ReactNode;
  errors?: SearchResultError[];
  isLoading?: boolean;
  data?: ListItemResult[];
  renderListItem: ListItemRenderer;
  selectedFacets?: React.ReactNode;
}

const ListResult: React.FC<Props> = ({
  counterElement,
  errors,
  isLoading,
  data,
  renderListItem,
  selectedFacets,
}) => {
  if (errors && errors.length > 0) {
    return <Error title="Unexpected error" text={errors[0].message} />;
  }

  if (!isLoading && !data?.length) {
    return <NoResults />;
  }

  return (
    <>
      {counterElement}

      {selectedFacets}

      <Row gutter={[20, 30]}>
        {isLoading
          ? Array.from({ length: 10 }, (x, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                {renderListItem({ isLoading: true, index })}
              </Col>
            ))
          : data?.map((item, index) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                {renderListItem({
                  item,
                  isLoading: false,
                  index,
                })}
              </Col>
            ))}
      </Row>
    </>
  );
};

export default ListResult;
