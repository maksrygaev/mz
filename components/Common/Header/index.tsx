import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { CloseOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import { getQueryParams } from 'core/helpers';
import { Button, Col, Row, Popover, Form, Input, message } from 'antd';
import AuthModal from 'components/Site/AuthModal';
import UserMenu from '../../My/Popover/UserMenu';
import MetamaskSet from '../../My/MetamaskSet';
import styles from './Header.module.scss';

const HeaderLogged: FC = () => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [query, setQuery] = useState<any>(router.query?.q || '');
  const [isError, setIsError] = useState(false);
  const [form] = Form.useForm();
  const [logged, setLogged] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [popoverStatus, setPopoverStatus] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    // @ts-ignore
    const { a, id, code } = getQueryParams();
    if (a && id && code && a === 'confirm') {
      setIsConfirm(true);
      setAuthModalVisible(true);
    }
  }, []);

  const onSignIn = (e: any): void => {
    e.preventDefault();
    setAuthModalVisible(true);
  };

  const handleConfirmSuccess = (): void => {
    message.info('Password changed');
    setIsConfirm(false);
    setAuthModalVisible(false);
    setAuthModalVisible(true);
  };

  const showUser = (): void => {
    logged ? setLogged(false) : setLogged(true);
    popoverStatus ? setPopoverStatus(false) : setPopoverStatus(true);
  };

  const onPopoverStatus = (newStatus: boolean) => {
    console.log('newStatus', newStatus)
    setPopoverStatus(newStatus);
  };

  const handleChangeQuery = (event: any): void => {
    isError && setIsError(false);
    setQuery(event.target.value);
  };

  const handleSubmit = (): void => {
    const q = query.trim();
    router.push(`/search${q ? `?q=${q}` : ''}`);
  };

  const handleClear = (): void => {
    if (router.pathname === '/') setShowInput(false);
    setQuery('');
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    });
  }, []);

  const handleHover = () => isHovered ? setIsHovered(false) : setIsHovered(true);

  return (
    <>
      <div className="sticky_header">
        <section className="container_top">
          <header className={styles.header}>
            <Row justify={'space-between'}>
              <Col className={`${styles.col}`}>
                <Link href={'/'}>
                  <img className={styles.logo} src="/images/mz-logo.png" alt="Metazon" />
                </Link>
              </Col>
              <Col className={`${styles.menu}`}>
                <a onClick={() => setShowInput(!showInput)} className={styles.menu__btn}>
                  {showInput ? 'Close' : 'Menu'}
                </a>
              </Col>
              <Col className={styles.col_list}>
                {!showInput ? (
                  <ul className={`top-menu ${styles.list}`}>
                    <li>
                      <Link href={'/vr/index.html'}>{t('common:vr galleries')}</Link>
                    </li>
                    <li className={router.pathname == '/drops' ? 'active' : ''}>
                      <Link href="/drops">{t('common:drops')}</Link>
                    </li>
                    <li className={router.pathname == '/discover' ? 'active' : ''}>
                      <Link href="/discover">{t('common:discover')}</Link>
                    </li>
                    <li className={router.pathname == '/marketplace' ? 'active' : ''}>
                      <Link href="/marketplace">{t('common:marketplace')}</Link>
                    </li>
                  </ul>
                ) : (
                  <div className={styles.inputWrapper}>
                    <Form name="dappForm" layout="vertical" form={form} onFinish={handleSubmit}>
                      <Form.Item name="search">
                        <Input
                          suffix={
                            <div className={styles.header__buttonsWrapper}>
                              {(query || router.pathname == '/') && (
                                <Button className="search-button" onClick={handleClear}>
                                  <CloseOutlined />
                                </Button>
                              )}
                              <Button onClick={handleSubmit} className="search-button">
                                <img src="/icons/icon-loop.svg" alt="search" />
                              </Button>
                            </div>
                          }
                          style={isError ? { border: '1px solid red' } : { border: '1px solid black' }}
                          className={styles.input}
                          placeholder={t('common:search')}
                          defaultValue={query ? query : undefined}
                          onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
                          onChange={handleChangeQuery}
                          value={query}
                        />
                        {isError && (
                          <p style={{ position: 'absolute', top: 45, fontSize: 14, color: 'red' }}>Minimum 2 symbol</p>
                        )}
                      </Form.Item>
                    </Form>
                  </div>
                )}
              </Col>
              <Col className={`${styles.right_col} ${styles.col}`}>
                <Button
                  shape={'round'}
                  onClick={() => setShowInput(!showInput)}
                  className={`btn btn-round-white ${styles.search_btn}`}
                >
                  {showInput ? (
                    <CloseOutlined style={{ fontSize: 20 }} />
                  ) : (
                    <img src="/icons/icon-loop.svg" alt="search" />
                  )}
                </Button>
                {user ? (
                  <>
                    <Link href="/my/create">
                      <Button
                        type="link"
                        className={`${styles.create__atwork} btn btn-rounded-small-white-border-black-text`}
                      >
                        {t('common:create artwork')}
                      </Button>
                    </Link>
                    {mobileSize ? (
                      <Popover
                        visible={popoverStatus}
                        trigger={'click'}
                        content={
                          <UserMenu
                            clickMenu={onPopoverStatus}
                            handleClosePopover={() => setPopoverStatus(false)}
                            avatar={user.avatarSrc || '/icons/userpage/user-default.jpg'}
                          />
                        }
                      >
                        <div className={styles.header_div_avatar}>
                          <div className={styles.header_dot} />
                          <div onClick={showUser}>
                            <img
                              src={user.avatarSrc || '/icons/userpage/user-default.jpg'}
                              className={styles.header_user_pic}
                              alt=""
                            />
                          </div>
                        </div>
                      </Popover>
                    ) : (
                      <Popover
                        trigger={'hover'}
                        visible={isHovered}
                        onVisibleChange={() => handleHover()}
                        content={
                          <UserMenu
                            handleClosePopover={() => setIsHovered(false)}
                            clickMenu={onPopoverStatus}
                            avatar={user.avatarSrc || '/icons/userpage/user-default.jpg'}
                          />
                        }
                      >
                        <div className={styles.header_div_avatar}>
                          <div className={styles.header_dot} />
                          <div onClick={showUser}>
                            <img
                              src={user.avatarSrc || '/icons/userpage/user-default.jpg'}
                              className={styles.header_user_pic}
                              alt=""
                            />
                          </div>
                        </div>
                      </Popover>
                    )}
                  </>
                ) : (
                  <>
                    <Button shape={'round'} className={`btn btn-round-white `} onClick={onSignIn}>
                      <img src="/icons/icon-login-join.svg" alt="login" />
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <div className={styles.mobile__menu}>
              <Form name="dappForm" layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item name="search" style={{width: '92%'}}>
                  <Input
                    suffix={
                      <Button
                        shape={'round'}
                        onClick={handleSubmit}
                        className={`btn btn-round-white`}
                        style={{ height: 40, position: 'absolute', right: '-50px', background: 'transparent', border: 'transparent' }}
                      >
                        <img src="/icons/icon-loop.svg" alt="search" />
                      </Button>
                    }
                    className={`mobile-search ${styles.input} ${styles.mobile__input}`}
                    style={isError ? { border: '1px solid red' } : { border: '1px solid black' }}
                    placeholder="Search"
                    defaultValue={query ? query : undefined}
                    onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
                    onChange={e => {
                      isError && setIsError(false);
                      setQuery(e.target.value ? e.target.value : ' ');
                    }}
                  />
                  {isError && (
                    <p style={{ position: 'absolute', top: 45, fontSize: 14, color: 'red' }}>Minimum 2 symbol</p>
                  )}
                </Form.Item>
              </Form>
              {showInput && (
                <ul className={styles.mobile__menu__list}>
                  <li>
                    <Link href={'/vr/index.html'}>
                      <a onClick={() => setShowInput(false)}>{t('common:vr galleries')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/drops">
                      <a onClick={() => setShowInput(false)}>{t('common:drops')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover">
                      <a onClick={() => setShowInput(false)}>{t('common:discover')}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketplace">
                      <a onClick={() => setShowInput(false)}>{t('common:marketplace')}</a>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {authModalVisible && (
              <AuthModal
                onClose={() => setAuthModalVisible(false)}
                isConfirm={isConfirm}
                onConfirmSuccess={handleConfirmSuccess}
              />
            )}
          </header>
        </section>
        <MetamaskSet />
      </div>
    </>
  );
};

export default HeaderLogged;
