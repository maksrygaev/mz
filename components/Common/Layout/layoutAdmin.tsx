import React from 'react';
import Header from 'components/Common/Header';
import UserAccessLayout from 'components/Common/UserAccessLayout';
import styles from './Layout.module.scss';

interface IProps {
  roles?: string[],
}

const LayoutAdmin: React.FC<IProps> = ({ children, roles = [] }) => {
  return (
    <div>
      <Header />
      <main className={styles.main} style={{paddingBottom: '50px'}}>
        <section className="container">
          {roles?.length === 0
            ? children
            : (
              <UserAccessLayout roles={roles}>
                {children}
              </UserAccessLayout>
            )
          }
        </section>
      </main>
    </div>
  );
};

export default LayoutAdmin;
