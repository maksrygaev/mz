import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import store from 'core/store';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const WorkSetup: React.FC<Props> = ({ onChange }) => {
  const categoriesList = store.getState().categories.list;
  return (
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Title should not be empty.' },
          { required: true, min: 2, message: 'Title must be minimum 3 characters.' },
          { required: true, max: 40, message: 'Title must be maximum 40 characters.' },
        ]}
      >
        <Input onChange={onChange} name="title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Description should not be empty.' },
          { required: true, min: 2, message: 'Description must be minimum 3 characters.' },
          { max: 500, message: 'Description must be maximum 500 characters.' },
        ]}
      >
        <TextArea rows={4} onChange={onChange} name="description" />
      </Form.Item>
      <Form.Item
        label="Hashtag"
        name="hashtag"
        rules={[
          { max: 500, message: 'Hashtag must be maximum 500 characters.' },
          { required: true, min: 2, message: 'Hashtag must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[
          { required: false, message: 'Please select category' },
        ]}
      >
        <Select>
          {categoriesList.map(category => (
            <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Edition Size"
        name="amount"
        rules={[
          { type: 'number', min: 1, required: true, message: 'Please input amount' },
          { type: 'number', max: 10000000000, required: true, message: 'Max amount 10000000000' }
        ]}
      >
        <InputNumber type={'number'} className={'input-number'} />
      </Form.Item>
    </>
  );
};

export default WorkSetup;
