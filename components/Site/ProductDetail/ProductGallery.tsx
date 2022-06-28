import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from 'components/Common/UserInfo';
import ProductBlock from './ProductBlock';
import { Gallery } from './models';

interface Props {
  galleries?: Gallery[];
}

const ProductGallery: React.FC<Props> = ({ galleries }) => {
  if (!galleries?.length) {
    return null;
  }

  return (
    <ProductBlock title="Was found in galleries">
      <Row>
        {galleries.map(gallery => (
          <Col xs={12} sm={8} md={4} key={gallery.id}>
            <UserInfo
              image={gallery.avatar}
              size="medium"
              userName={gallery.name}
              variant="vertical"
            />
          </Col>
        ))}
      </Row>
    </ProductBlock>
  );
};

export default ProductGallery;
