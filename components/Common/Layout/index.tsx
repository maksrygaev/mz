import React from 'react';
import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import UserAccessLayout from 'components/Common/UserAccessLayout';
import styles from './Layout.module.scss';

interface IProps {
  roles?: string[],
}

const Layout: React.FC<IProps> = ({ children, roles = [] }) => {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        {roles?.length === 0
          ? children
          : (
            <UserAccessLayout roles={roles}>
              {children}
            </UserAccessLayout>
          )
        }
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
