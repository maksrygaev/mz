import React, { useCallback } from 'react';
import { Select, Slider } from 'antd';

const { Option } = Select;

interface Props {
  disabled?: boolean;
  onChange?: (value: number) => void;
  onSelect?: (value: string) => void;
  price?: number;
  selected?: string;
}

const FacetPrice: React.FC<Props> = ({ disabled, onChange, onSelect, price, selected }) => {
  const handleSelect = useCallback(
    value => {
      if (onSelect) onSelect(value);
    },
    [onSelect],
  );

  const handleChange = useCallback(
    value => {
      if (onChange) onChange(value);
    },
    [onChange],
  );

  return (
    <>
      <Select
        defaultValue={selected}
        onChange={handleSelect}
        placeholder="Sort by"
        style={{ width: '100%', marginBottom: '15px' }}
        disabled={disabled}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 1</Option>
      </Select>
      <Slider defaultValue={price || 20} onChange={handleChange} disabled={disabled} />
    </>
  );
};

export default FacetPrice;
