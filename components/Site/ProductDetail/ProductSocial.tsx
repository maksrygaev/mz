import React, { Fragment } from 'react';
import { Dropdown, Menu } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import SocialItem from 'components/Common/SocialItem';
import { Social } from './models';
import styles from './product.module.scss';

interface Props {
  social?: Social;
  countViews?: string;
  countLikes?: string;
}

const ProductSocial: React.FC<Props> = ({ social, countViews, countLikes }) => {
  if (!countLikes) countLikes = '0';
  if (!social) {
    return null;
  }

  const menu = (
    <Menu>
      {social?.items?.map((item, index) => (
        <Fragment key={item.id}>
          <Menu.Item key={index}>
            <SocialItem icon={item.name} url={item.url} />
          </Menu.Item>
        </Fragment>
      ))}
    </Menu>
  );

  return (
    <div className={styles.social}>
      <SocialItem icon="eye" text={countViews} />
      <SocialItem icon="likes" text={countLikes} />
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <ShareAltOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default ProductSocial;
