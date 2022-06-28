import { FC, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
const { TextArea } = Input;
import { UserOutlined } from '@ant-design/icons';
import style from './Walletaddressl.module.scss';

export const WalletAddress: FC = () => {
  const [valueHash, setValueHash] = useState('0x58c71714d2ed69bc19688a3624e71fa5a8a786e09');
  const [valueUsername, setValueUsername] = useState('Trevis Pac');
  const [valueEmail, setValueEmail] = useState('username@gmail.com');
  const [valueUrl, setValueUrl] = useState('website.com/username');
  const [valueInstagram, setValueInstagram] = useState('instagram.com/username');
  const [valueTwitter, setValueTwitter] = useState('twitter.com/username');
  const [valueFacebook, setValueFacebook] = useState('facebook.com/username');
  const [valueBio, setValueBio] = useState('');
  return (
    <section className="container wallet-address">
      <div className={style.style}>
        <div className={style.style_txt}>
          My wallet address
        </div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Input
              placeholder=""
              className={'input input-small-rounded-black-border'}
              value={valueHash}
              onChange={e => setValueHash(e.target.value)}
            />
            <div className={style.style_txt}>
              Account info
            </div>
            <div className={style.style_before_input}>
              Username
            </div>
            <Input
              placeholder="Username"
              className={'input input-small-rounded-black-border'}
              value={valueUsername}
              onChange={e => setValueUsername(e.target.value)}
            />
            <div className={style.style_before_input}>
              Email Address
            </div>
            <Input
              placeholder="Email Address"
              className={'input input-small-rounded-black-border'}
              value={valueEmail}
              onChange={e => setValueEmail(e.target.value)}
            />
            <div className={style.style_before_input}>
              Username
            </div>
            <Input
              placeholder="Custom URL"
              className={'input input-small-rounded-black-border'}
              value={valueUrl}
              onChange={e => setValueUrl(e.target.value)}
            />
            <div className={style.style_before_input}>
              Bio
            </div>
            <TextArea rows={4}
              placeholder="Tell the world your story!"
              className={'input input-small-rounded-black-border'}
              value={valueBio}
              onChange={e => setValueBio(e.target.value)}
            />
            <Row>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={style.style_btn_wrap}>
                  <div className={style.style_btn}>
                    <UserOutlined style={{width: '40px'}} />
                  </div>
                  <div className={style.style_avatar}>
                    <div className={style.style_avatar_description}>
                      Choose avatar
                    </div>
                    <div className={style.style_avatar_size}>
                      Recommended picture size<br />
                      100х100px
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={style.style_btn_wrap}>
                  <div className={style.style_btn}>
                    <img src="/icons/icon-choose-banner.svg" alt="" />
                  </div>
                  <div className={style.style_avatar}>
                    <div className={style.style_avatar_description}>
                      Choose Banner
                    </div>
                    <div className={style.style_avatar_size}>
                      Recommended picture size<br />
                      1440х360px
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button className="btn btn-rounded-black">Add Funds</Button>
            <div className={style.style_txt}>
              Social
            </div>
            <div className={style.style_before_input}>
              Instagram
            </div>
            <Input
              placeholder="Instagram"
              className={'input input-small-rounded-black-border'}
              value={valueInstagram}
              onChange={e => setValueInstagram(e.target.value)}
            />
            <div className={style.style_before_input}>
              Email Address
            </div>
            <Input
              placeholder="Email Address"
              className={'input input-small-rounded-black-border'}
              value={valueTwitter}
              onChange={e => setValueTwitter(e.target.value)}
            />
            <div className={style.style_before_input}>
              Username
            </div>
            <Input
              placeholder="Facebook"
              className={'input input-small-rounded-black-border'}
              value={valueFacebook}
              onChange={e => setValueFacebook(e.target.value)}
            />
          </Col>
        </Row>
        <div className={style.style_save}>
          <Button className={`btn btn-rounded-white-black-border ${style.style_button_margin}`}>Save</Button>
        </div>
      </div>
    </section>
  );
};