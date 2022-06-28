import React, { useCallback, useState } from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './tag.module.scss';

interface Props {
  className?: string;
  isRemove?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  url?: string;
}

const Tag: React.FC<Props> = ({ className, isRemove, onClose, text, url }) => {
  const [visible, setVisible] = useState<boolean>(true);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClose) {
        onClose(e);
        setVisible(false);
      }
    },
    [visible, setVisible],
  );

  const classes = cls(`${styles.root}`, className);

  const removeButton = isRemove && (
    <button type="button" onClick={onClick} className={styles.buttonRemove}>
      <CloseCircleOutlined />
    </button>
  );

  if (url) {
    return (
      <Link href={url}>
        <a className={classes}>
          {text}
          {removeButton}
        </a>
      </Link>
    );
  }

  return (
    <>
      {visible && (
        <span className={classes}>
          {text}
          {removeButton}
        </span>
      )}
    </>
  );
};

export default Tag;
