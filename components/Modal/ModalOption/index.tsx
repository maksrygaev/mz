import { FC } from 'react';
import { Form, Input, Button, Tabs, Row, Col } from 'antd';
const { TabPane } = Tabs;
import modal from './ModaOptiont.module.scss';

export const ModalOption: FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    console.log('values', values);
  };
  const callback = (key: any) => {
    console.log(key);
  }
  return (
    <div className={modal.modal}>
      <Form name="cardForm" layout="vertical" form={form}  onFinish={handleSubmit}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{padding: '0 15px'}}>
            <div className={modal.modal__name}>
              Choose option
            </div>
            <Tabs onChange={callback} type="card">
              <TabPane tab="CardLikes" key="1" style={{paddingBottom: '10px'}}>
                <Form.Item
                  name="name"
                  label="Owners name"
                  rules={[{ message: 'Enter Owners name' }]}
                >
                  <Input
                    className="input-bank-card"
                    placeholder="John smith"
                  />
                </Form.Item>
                <Form.Item
                  name="card"
                  label="CardLikes number"
                  rules={[{ message: 'Enter CardLikes number' }]}
                >
                  <Input
                    className="input-bank-card"
                    placeholder="0000 0000 0000 0000"
                    suffix={<img src="/images/pic-card.png" alt="" />}
                  />
                </Form.Item>
                <div className={modal.modal__fields}>
                  <div className={modal.modal__field} style={{paddingRight: '10px'}}>
                    <Form.Item
                      name="date"
                      label="Date"
                      rules={[{ message: 'Enter Date' }]}
                    >
                      <Input className="input-bank-card" />
                    </Form.Item>
                  </div>
                  <div className={modal.modal__field} style={{paddingLeft: '10px'}}>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      rules={[{ message: 'Enter CVV' }]}
                    >
                      <Input className="input-bank-card"  />
                    </Form.Item>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="PayPal" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Smth" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{padding: '0 15px'}}>
            <div className={modal.modal__name}>
              Order
            </div>
            <div className={modal.modal__order}>
              <div className={modal.modal__order__img}>
                <img src="/images/card-1.jpg" alt="" />
              </div>
              <div className={modal.modal__order__name}>
                Title
                <span>digital art</span>
                <div  className={modal.modal__order__name__from}>
                  <span>№8</span>
                  from 10
                </div>
              </div>
            </div>
            <div className={modal.modal__row}>
              <div className={modal.modal__row__left}>
                Price
              </div>
              <div className={modal.modal__row__right}>
                $ 250
              </div>
            </div>
            <div className={modal.modal__row}>
              <div className={modal.modal__row__left}>
                Comission
              </div>
              <div className={modal.modal__row__right}>
                $ 15
              </div>
            </div>
            <div className={modal.modal__row}>
              <div className={modal.modal__row__left}>
                Smth else
              </div>
              <div className={modal.modal__row__right}>
                $ 5
              </div>
            </div>
            <div className={modal.modal__total}>
              <div className={modal.modal__row}>
                <div className={modal.modal__row__left}>
                  <div className={modal.modal__row__left__big}>
                    Total
                  </div>
                </div>
                <div className={modal.modal__row__right}>
                  <div className={modal.modal__row__right__big}>
                    $ 270
                  </div>
                </div>
              </div>
            </div>
            <Form.Item style={{textAlign: 'right'}}>
              <Button
                className={`btn btn-rounded-black`}
                htmlType="submit" block
              >
                Buy
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};