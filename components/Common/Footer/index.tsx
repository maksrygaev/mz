import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Col, message, Row } from 'antd';
import footer from './Footer.module.scss';
import { TAppState } from 'core/store';
import AuthModal from '../../Site/AuthModal';
import { getQueryParams } from 'core/helpers';
import StatusServices from 'core/services/status';

const Footer: FC = () => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [versionInfo, setVersionInfo] = useState<any>(null);

  const loadVersion = () => {
    StatusServices.getVersionInfo()
      .then(rs => setVersionInfo(rs))
      .catch(() => null);
  };

  useEffect(() => {
    loadVersion();
    // @ts-ignore
    const { a, id, code } = getQueryParams();
    if (a && id && code && a === 'confirm') {
      setIsConfirm(true);
      setAuthModalVisible(true);
    }
  }, []);

  const onSignIn = (e: any) => {
    e.preventDefault();
    setAuthModalVisible(true);
  };

  const handleConfirmSuccess = () => {
    message.info('Password changed');
    setIsConfirm(false);
    setAuthModalVisible(false);
    setAuthModalVisible(true);
  };

  return (
    <footer>
      <section className="container_top">
        <div className={`footer_block ${footer.footer}`}>
          <div className={footer.footer_social}>
            <Link href="https://twitter.com/@MetazonVR">
              <a target="_blank">
                <div className={footer.footer_btn}>
                  <img src="/icons/soc/twitter-2.svg" alt="twitter" />
                </div>
              </a>
            </Link>
            <Link href="https://discord.com/channels/902027695888695396/902027695888695">
              <a target="_blank">
                <div className={footer.footer_btn}>
                  <img src="/icons/soc/discord-2.svg" alt="discord" />
                </div>
              </a>
            </Link>
            <Link href="http://medium.com/@metazon">
              <a target="_blank">
                <div className={footer.footer_btn}>
                  <img src="/icons/soc/medium-2.svg" alt="metazon" />
                </div>
              </a>
            </Link>
          </div>
          <Row className={footer.footer_content}>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`footer_title ${footer.footer_menu_title}`}>Metazon</div>
              <ul className={`footer_menu ${footer.footer_menu}`}>
                <li>
                  <Link href="/marketplace">Explore</Link>
                </li>
                <li className={footer.footer_italic}>
                  <div className={`footer_margin ${footer.footer_menu_margin}`}>
                    <Link href="#">How it works</Link>
                  </div>
                </li>
                <li className={footer.footer_italic}>
                  <Link href="mailto:metazon_nft@protonmail.com">Support</Link>
                </li>
                <li className={footer.footer_italic}>
                  <Link href="#">Become a partner</Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`footer_title ${footer.footer_menu_title}`}>My account</div>
              <ul className={`footer_menu ${footer.footer_menu}`}>
                <li className="footer_li">
                  {user?.id ? (
                    <Link href="/my">Profile</Link>
                  ) : (
                    <span onClick={onSignIn} className={footer.footer_menu_notautorised}>
                      Profile
                    </span>
                  )}
                </li>
                <li>
                  {user?.id ? (
                    <Link href="/my/collections">
                      <span className={footer.footer_menu_notautorised_italic}>Collections</span>
                    </Link>
                  ) : (
                    <span onClick={onSignIn} className={footer.footer_menu_notautorised_italic}>
                      Collections
                    </span>
                  )}
                </li>
                <li>
                  {user?.id ? (
                    <Link href="/my/likes">
                      <span className={footer.footer_menu_notautorised_italic}>Favorites</span>
                    </Link>
                  ) : (
                    <span onClick={onSignIn} className={footer.footer_menu_notautorised_italic}>
                      Favorites
                    </span>
                  )}
                </li>
              </ul>
            </Col>
          </Row>
          <Row className={`footer_copy ${footer.footer_copy}`}>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <div>&copy; 2021 Metazon. All rights reserved</div>
            </Col>
            <Col xs={24} sm={12} md={13} lg={13} xl={13}>
              <div>
                <Link href="#">Language</Link>
                <Link href="#">Terms</Link>
                <Link href="#">Privacy</Link>
              </div>
            </Col>
          </Row>
          {versionInfo && (
            <div style={{ paddingTop: '20px', wordWrap: 'break-word' }}>
              {`${versionInfo?.revision} #${versionInfo?.buildNumber} @${versionInfo?.environment}`}
            </div>
          )}
        </div>
        {authModalVisible && (
          <AuthModal
            onClose={() => setAuthModalVisible(false)}
            isConfirm={isConfirm}
            onConfirmSuccess={handleConfirmSuccess}
          />
        )}
      </section>
    </footer>
  );
};

export default Footer;
