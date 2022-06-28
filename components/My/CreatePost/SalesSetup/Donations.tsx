import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import UserInfo from 'components/Common/UserInfo';
import { mock } from 'components/Site/PopularMasters/__mock';
import SearchField from 'components/Common/Search/SearchField/input';
import styles from '../createPost.module.scss';
import RadioGroup from 'components/Common/RadioGroup';

const options = [
  { label: 'Me', key: 'me' },
  { label: 'Fund', key: 'fund' },
];

const Donations: React.FC = () => {
  const onChangeRadio = (value: string) => {
    console.log(value);
  };

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
            <p className={styles.tabBlockTitle}>The Fund`s share</p>
            <Form.Item name="fund" className={styles.inputField}>
              <Input name="fund" />
            </Form.Item>
          </div>
          <div className={styles.tabContentBlock}>
            <p className={styles.tabBlockTitle}>Who is payment?</p>
            <RadioGroup options={options} selected="" setRadioValue={onChangeRadio} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Donations;
