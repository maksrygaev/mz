import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import styles from './createButton.module.scss';

interface Props {
  onClick?: () => void;
  text?: string;
}

const CreateButton: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button type="button" onClick={onClick} className={styles.root}>
      <PlusOutlined /> {text}
    </button>
  );
};

export default CreateButton;
