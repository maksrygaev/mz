import React, { useState } from 'react';
import { Button, Space, Spin } from 'antd';
import { ProductsServices } from 'core/services';

interface IProps {
  product: any,
  onSuccess: () => void,
}

const ProductReject: React.FC<IProps> = ({ product, onSuccess }) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await ProductsServices.reject({ id: product.id })
      setIsSubmitting(false);
      onSuccess();
    }  catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }

  }

  return (
    <Space>
      <Button onClick={handleApprove} disabled={isSubmitting}>Reject</Button>
    </Space>
  );
};

export default ProductReject;
