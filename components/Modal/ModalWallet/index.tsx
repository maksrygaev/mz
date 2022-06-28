import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Button, Col, Input, Row } from 'antd';
import modal from './Modal.module.scss';

export const ModalWallet: FC = () => {
  const [value, setValue] = useState('');
  const [valuePassport, setValuePassport] = useState('');
  return (
      <div className={modal.modal}>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <div className={modal.modal_txt}>
              Become a legend
            </div>
            <div className={modal.modal_name}>
              <div className="mright30">
                With&nbsp;wallet
              </div>
            </div>
            <Button className={`btn btn-rounded-white-black-border ${modal.modal_button_margin}`}>Name Wallet 1</Button>
            <Button className={`btn btn-rounded-white-black-border ${modal.modal_button_margin}`}>Name Wallet 2</Button>
            <Button className={`btn btn-rounded-white-black-border ${modal.modal_button_margin}`}>Name Wallet 3</Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <div className={modal.modal_account}>
              <Button shape={'round'} className="btn btn-rounded-white-black">Don't have an account &gt;</Button>
            </div>
            <div className={modal.modal_name}>
              Without wallet
            </div>
            <div className={modal.modal_button_margin}>
              <Input
                placeholder="Email or phone"
                className={'input input-small-rounded-black-border'}
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>
            <div className={modal.modal_button_margin}>
              <Input
                placeholder="Password"
                className={'input input-small-rounded-black-border'}
                value={valuePassport}
                onChange={e => setValuePassport(e.target.value)}
              />
            </div>
            <div className={modal.modal_login}>
              <div>
                <Button className="btn btn-rounded-black">Log in</Button>
              </div>
              <div>
                <Link href="#">Forgot password?</Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
  );
};