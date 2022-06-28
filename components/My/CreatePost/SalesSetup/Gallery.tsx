import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import UserInfo from 'components/Common/UserInfo';
import { mock } from 'components/Site/PopularMasters/__mock';
import SearchField from 'components/Common/Search/SearchField/input';
import styles from '../createPost.module.scss';

const Gallery: React.FC = () => {
  return (
    <>
      <div className={styles.tabContentBlock}>
        <SearchField name="search-masters" onSearch={() => null} isBottomSpace />
        <Row gutter={[20, 30]}>
          {mock?.map(master => (
            <Col xs={12} lg={4} key={master.id}>
              <UserInfo
                image={master.image}
                userName={master.userName}
                likes={master.likes}
                size="small"
              />
            </Col>
          ))}
        </Row>
      </div>
      <Row className={styles.tabContentBlock}>
        <Col md={6}>
          <div className={styles.tabContentBlock}>
            <p className={styles.tabBlockTitle}>Desirable income</p>
            <Form.Item name="income" className={styles.inputField}>
              <Input name="income" />
            </Form.Item>
          </div>
          <div className={styles.tabContentBlock}>
            <p className={styles.tabBlockTitle}>Transfer period</p>
            <Row gutter={10} className={styles.inputField}>
              <Col xs={12}>
                <Form.Item name="date" className={styles.dateItem}>
                  <DatePicker name="date" />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item name="time" className={styles.dateItem}>
                  <Input name="time" placeholder="time" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Gallery;
