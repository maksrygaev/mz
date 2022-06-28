import React, { FC, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import useWallet from 'core/hooks/useWallet';
import style from './AccountSetting.module.scss';

export const AccountSetting: FC = () => {
  const [valueEmail, setValueEmail] = useState('');
  const { address } = useWallet();

  return (
    <section className="container_first wallet-address">
      <div className={style.style}>
        <div className={style.style_txt}>General</div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Input
              disabled={true}
              className={'input input-small-rounded-black-border'}
              value={address ? address : 'Please connect Metamask'}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button
              style={{
                width: '260px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="btn btn-rounded-white-black-border"
              onClick={() => navigator.clipboard.writeText(address ? address : '')}
            >
              <img style={{ width: 25, height: 25 }} src="/images/copy.png" alt="img" />
            </Button>
          </Col>
        </Row>
        <div className={style.style_before_input}>Email address</div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Input
              placeholder="Add or change Email"
              className={'input input-small-rounded-black-border'}
              value={valueEmail}
              onChange={e => setValueEmail(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button
              style={{ width: '260px', letterSpacing: '2px' }}
              className="btn btn-rounded-white-black-border"
            >
              Change
            </Button>
          </Col>
        </Row>
        {/* <div className={style.style_btn_wrap}>
          <div className={style.style_btn}>
            <img src="/icons/icon-choose-banner.svg" alt="" />
          </div>
          <div className={style.style_avatar}>
            <Button style={{fontStyle: 'italic', fontSize: '16px'}} className="btn btn-rounded-small-white-border-black-text ">
              Change status to gallery
            </Button>
            <div className={style.style_avatar_size}>
              Recommended picture size<br />
              1440х360px
            </div>
          </div>
        </div> */}
        <div className={style.style_save}>
          <Button
            style={{ fontStyle: 'italic', fontSize: '16px' }}
            className="btn btn-rounded-small-white-border-black-text "
          >
            Confirm
          </Button>
        </div>
      </div>
    </section>
  );
};
