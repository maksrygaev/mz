import { useEffect, useState } from 'react';
import { Menu, Button, Row, Col } from 'antd';
import { ProductsServices } from 'core/services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import style from './ActivityHistory.module.scss';

const ActivityHistory = () => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const id = router.query.id ?? user?.id;
  const [sort, setSort] = useState('none');
  const [activeItem, setActiveItem] = useState('all');
  const [data, setData] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const loadHistory = () => {
    ProductsServices.search({userID: id, limitation: {count: 7, firstRow: 0}, sorting: {column: 'dateCreated', isAscending: false}}).then((rs) => setHistoryList(rs)).catch(() => []);
  };
  useEffect(() => {
    loadHistory();
  }, []);
  const handleItem = (e: any) => setActiveItem(e.key);

  useEffect(() => {
    if (activeItem == 'all') setData(data);
    else {
      setData(
        data.filter((item: any) => {
          return item.cathegory.some((kek: any) => {
            return kek == activeItem;
          });
        }),
      );
    }
  }, [activeItem]);

  useEffect(() => {
    if (sort == 'none') setData(data);
    else if (sort == 'likes') setData(data.sort(({ a, b }: any) => b.likes - a.likes));
    else if (sort == 'price') setData(data.sort(({ a, b }: any) => b.price - a.price));
  }, [sort]);

  const toLocalString = (date: any) => {
    return new Date(date).toLocaleDateString("en-US");
  }

  return (
    <section className="container">
      <div className={style.explore}>
        <div className={style.explore__head}>
          <Row>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
              <h2 className={style.explore__title}>Activity History</h2>
            </Col>
            <Col xs={24} sm={24} md={17} lg={17} xl={17} className={style.explore__navigation}>
              <div className={style.explore__menu}>
              <Menu mode="horizontal" onClick={e => handleItem(e)} className={style.explore__menu} style={{minWidth: '640px', textAlign: 'right'}}>
                <Menu.Item key="all">
                  <Button style={{borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', padding: '0 19px'}}
                    className={activeItem == 'all' ? 'menu__item-active' : 'menu__item'}
                  >
                    All
                  </Button>
                </Menu.Item>
                <Menu.Item key="created">
                  <Button
                    className={activeItem == 'created' ? 'menu__item-active' : 'menu__item'}
                  >
                    Created
                  </Button>
                </Menu.Item>
                <Menu.Item key="purchase">
                  <Button
                    className={activeItem == 'purchase' ? 'menu__item-active' : 'menu__item'}
                  >
                    Purchase
                  </Button>
                </Menu.Item>
                <Menu.Item key="sales">
                  <Button
                    className={activeItem == 'sales' ? 'menu__item-active' : 'menu__item'}
                  >
                    Sales
                  </Button>
                </Menu.Item>
                <Menu.Item key="bids">
                  <Button
                    className={activeItem == 'bids' ? 'menu__item-active' : 'menu__item'}
                  >
                    Bids
                  </Button>
                </Menu.Item>
                <Menu.Item key="likes">
                  <Button style={{borderTopRightRadius: '5px', borderBottomRightRadius: '5px', padding: '0 19px'}}
                    className={activeItem == 'likes' ? 'menu__item-active' : 'menu__item'}
                  >
                    Likes Artworks
                  </Button>
                </Menu.Item>
              </Menu>
              </div>
            </Col>
          </Row>
        </div>
        <div className={style.explore__content}>
          {historyList?.map((item: any) => {
            return (
              <div className={style.history__card} key={item.id}>
                <div>
                  <div className={style.history__card__img}>
                    <img src={item.previewFilePath} alt={item.name} />
                  </div>
                  <div className={style.history__card__info}>
                    <div className={style.history__card__name}>
                      {item.name}
                    </div>
                    <div className={style.history__card__footer}>
                      <div className={style.history__card__footer__left}>
                        Edited by
                      </div>
                      <div className={style.history__card__avatar}>
                        <img src={item.userPreviewFilePath} alt="" />
                      </div>
                      <div className={style.history__card__footer__right}>
                        {item.userName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.history__card__date}>
                  {new Date(item.dateCreated).toLocaleDateString('ru-RU')}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ActivityHistory;
