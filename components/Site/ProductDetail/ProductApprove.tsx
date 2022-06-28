import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { ProductsServices } from 'core/services';

interface IProps {
  product: any;
  onSuccess: () => void;
}

const ProductApprove: React.FC<IProps> = ({ product, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await ProductsServices.approve({ id: product.id });
      setIsSubmitting(false);
      onSuccess();
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <Space>
      <Button onClick={handleApprove} disabled={isSubmitting}>
        Approve
      </Button>
    </Space>
  );
};

export default ProductApprove;
