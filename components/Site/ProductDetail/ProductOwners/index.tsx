import { FC, useState } from 'react';
import { Modal } from 'antd';
import Link from 'next/link';
import styles from './ProductOwners.module.scss';

interface IProps {
  owners: any[];
}

const ProductOwners: FC<IProps> = ({ owners }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (): void => setIsModalVisible(true);
  const handleCancel = (): void => setIsModalVisible(false);
  const numberOfOwners = owners?.length;

  if (!numberOfOwners) return null;
  return (
    <div className={styles.owners}>
      <h1 className={styles.owners__title}>Owned by</h1>
      <div className={styles.owners__container}>
        {owners?.map((item: any) => {
          return (
            <Link key={item.id} href={`/user/${item.userID}`}>
              <img
                src={item.userPreviewFilePath || '/icons/userpage/user-default.jpg'}
                alt="Owner avatar"
                title={item.userName}
                className={styles.owners__item}
              />
            </Link>
          );
        })}
        {numberOfOwners > 4 ? (
          <button onClick={showModal} className={styles.owners__button}>{`${numberOfOwners} +`}</button>
        ) : null}
        <Modal width={850} title="" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <>
            <h2 className={styles.owners__titleList}>Product owners</h2>
            <ul className={styles.owners__list}>
              {owners?.map((item: any) => {
                return (
                  <li key={item.id}>
                    <Link href={`/user/${item.userID}`}>
                      <a className={styles.owners__listLink}>
                        <img src={item.userPreviewFilePath} alt="Owner avatar" className={styles.owners__listImage} />
                        <p className={styles.owners__listText}>{item.userName}</p>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        </Modal>
      </div>
    </div>
  );
};

export default ProductOwners;
