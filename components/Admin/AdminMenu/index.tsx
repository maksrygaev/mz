import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SubMenu from 'antd/lib/menu/SubMenu';

const AdminMenu: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
      >
        <Menu.Item key="/admin"><Link href="/admin" ><a>Products</a></Link></Menu.Item>
        <Menu.Item key="/admin/collections"><Link href="/admin/collections" ><a>Drops</a></Link></Menu.Item>
        <SubMenu key={'submenu'} title={'Galleries'}>
          <Menu.Item key="/admin/galleries"><Link href="/admin/galleries"><a>Approve/Reject</a></Link></Menu.Item>
          <Menu.Item key="/admin/banners"><Link href="/admin/banners" ><a>Banners</a></Link></Menu.Item>

        </SubMenu >
        <Menu.Item key="/admin/settings"><Link href="/admin/settings" ><a>Settings</a></Link></Menu.Item>
        <Menu.Item key="/admin/fees"><Link href="/admin/fees" ><a>Fees</a></Link></Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminMenu;
