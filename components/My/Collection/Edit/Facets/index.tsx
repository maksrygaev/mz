import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Collapse } from 'antd';
import FacetPrice from 'components/Common/Search/Facets/Price';
import RadioGroup from 'components/Common/RadioGroup';
import {
  categoriesOptions,
  limitOptions,
  searchOption,
  statusOption,
  typeOption,
} from 'components/Common/Search/__mock/facets';

const { Panel } = Collapse;

interface Props {
  isLoading?: boolean;
  facets?: any;
}

const FacetsBlock: React.FC<Props> = ({ isLoading, facets }) => {
  const onTransactionChange = (value: CheckboxValueType[]) => {
    console.log('onTransactionChange', value);
  };

  const onCategoryChange = (value: CheckboxValueType[]) => {
    console.log('onTransactionChange', value);
  };

  const onTest = (value: string) => {
    console.log('radio', value);
  };

  return (
    <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
      <Panel header="Status" key="1">
        <RadioGroup
          options={statusOption}
          selected=""
          setRadioValue={onTest}
          disabled={isLoading}
        />
      </Panel>
      <Panel header="Type" key="2">
        <RadioGroup options={typeOption} selected="" setRadioValue={onTest} disabled={isLoading} />
      </Panel>
      <Panel header="Transaction license" key="3">
        <Checkbox.Group
          options={limitOptions}
          onChange={onTransactionChange}
          disabled={isLoading}
        />
      </Panel>
      <Panel header="Categories" key="4">
        <Checkbox.Group
          options={categoriesOptions}
          onChange={onCategoryChange}
          disabled={isLoading}
        />
      </Panel>
      <Panel header="Price" key="5">
        <FacetPrice
          disabled={isLoading}
          onChange={() => null}
          onSelect={() => null}
          price={30}
          selected=""
        />
      </Panel>
    </Collapse>
  );
};

export default FacetsBlock;
