import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';

const ProductHistory: React.FC = () => {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(true);
  }, [show, setShow]);

  const handleOk = useCallback(() => {
    setShow(false);
  }, [show, setShow]);

  const handleCancel = useCallback(() => {
    setShow(false);
  }, [show, setShow]);

  return (
    <>
      <Button type="link" onClick={showModal}>
        History
      </Button>
      <Modal title="History" visible={show} onOk={handleOk} onCancel={handleCancel}>
        <p>History content</p>
      </Modal>
    </>
  );
};

export default ProductHistory;
