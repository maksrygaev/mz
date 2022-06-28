import React, { useCallback, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';

interface Option {
  label: string;
  key: string;
}

interface Props {
  disabled?: boolean;
  options: Option[];
  selected?: string;
  setRadioValue?: (value: string) => void;
}

const RadioGroup: React.FC<Props> = ({ disabled, options, selected, setRadioValue, ...props }) => {
  const [value, setValue] = useState(selected || options[0].key);

  const onChange = useCallback(
    (e: RadioChangeEvent) => {
      const current = e.target.value;
      setValue(current);
      if (setRadioValue) setRadioValue(current);
    },
    [setRadioValue, setValue, value],
  );

  return (
    <Radio.Group onChange={onChange} value={value} disabled={disabled} {...props}>
      {options?.map(radio => (
        <Radio value={radio.key} key={radio.key}>
          {radio.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioGroup;
