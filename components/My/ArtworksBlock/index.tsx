import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Button, Row, Col, Input } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { ProductsServices } from 'core/services';
import style from '../../Portfolio/PortfolioExplore/PortfoloioExplore.module.scss';
import ArtworksCard from 'components/Common/Cards/ArtworksCard';
import styles from '../../Common/Cards/index.module.scss';

interface Props {
  artist?: any;
}

const ArtowrksBlock: React.FC<Props> = ({ artist }) => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const [searchStr, setSearchStr] = useState<string>('');
  const [data, setData] = useState([]);

  const handleNavigateToArtworksPage = (params: any): void => {
    if (router.query?.id) {
      router.push(`/user/${router.query.id}/artworks?${params.key}=${params.value}`);
    } else if (router.query?.hash) {
      router.push(`/artist/${router.query.hash}/artworks?${params.key}=${params.value}`);
    } else if (user) {
      router.push(`/my/artworks?${params.key}=${params.value}`);
    }
  };

  const handleOnClickMenuItem = (event: any): void => {
    handleNavigateToArtworksPage({ key: 't', value: event.key });
  };

  const handleSubmitSearchInput = (): void => {
    handleNavigateToArtworksPage({ key: 'q', value: searchStr.toLowerCase() });
  };

  const loadData = (): void => {
    ProductsServices.search({
      userID: artist.id,
      limitation: { count: user?.id === artist.id ? 3 : 4, firstRow: 0 },
      sorting: { column: 'dateCreated', isAscending: false },
    })
      .then(rs => setData(rs))
      .catch(error => console.log(error));
  };

  useEffect(() => loadData(), []);

  return (
    <section className="container">
      <div className={style.explore}>
        <div className={style.explore__head}>
          <Row align={'middle'} className={style.header} justify={'space-between'}>
            <Col>
              <div className={style.explore__head__wrap}>
                <h2 className={'section_title'}>Artworks</h2>
              </div>
            </Col>
            <Col>
              <Input
                placeholder="Search"
                className={`${style.input} input-small-rounded-black-border`}
                value={searchStr}
                onKeyDown={e => (e.key === 'Enter' ? handleSubmitSearchInput() : null)}
                onChange={e => setSearchStr(e.target?.value)}
                suffix={
                  <Button style={{ border: 'none' }} onClick={() => handleSubmitSearchInput()}>
                    <img src="/icons/icon-loop.svg" alt="icon-loop" />
                  </Button>
                }
              />
            </Col>
            <Col className={style.col_menu} style={router.query?.id ? { textAlignLast: 'right' } : {}}>
              <Menu disabledOverflow mode="horizontal" onClick={handleOnClickMenuItem} className={`profile_menu`}>
                <Menu.Item key="All">
                  <Button
                    style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}
                    className={'menu__item-active'}
                  >
                    All
                  </Button>
                </Menu.Item>
                <Menu.Item key="Draft">
                  <Button className={'menu__item'}>Draft</Button>
                </Menu.Item>
                <Menu.Item key="Owned">
                  <Button className={`menu__item`}>Owned</Button>
                </Menu.Item>
                <Menu.Item key="Moderation">
                  <Button className={`menu__item`}>Moderation</Button>
                </Menu.Item>
                <Menu.Item key="Stock">
                  <Button
                    style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}
                    className={`menu__item`}
                  >
                    In stock
                  </Button>
                </Menu.Item>
              </Menu>
            </Col>
            <Col>
              <Link
                href={
                  router.query.id
                    ? `/user/${router.query.id}/artworks`
                    : router.query.hash
                    ? `/artist/${router.query.hash}/artworks`
                    : '/my/artworks'
                }
              >
                <Button className={`btn btn-see-all ${style.see_all}`}>See all</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <ul className={styles.list}>
          {user?.id === artist.id && (
            <Link href="/my/create">
              <li className={`${styles.card} ${styles.card__artwork} ${styles.card__create}`}>
                <div className={styles.create_image_wrapper}>
                  <img src="/images/create-element.png" alt="Create new collection" />
                </div>
                <p className={styles.createNewTitle}>
                  Create
                  <br />
                  <span className={styles.bottom__title}> new artwork</span>
                </p>
              </li>
            </Link>
          )}
          {data.map((artwork: any) => (
            <Link key={artwork.id} href={`/product/${artwork?.id}`}>
              <li className={`${styles.card} ${styles.card__artwork}`}>
                <ArtworksCard artwork={artwork} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ArtowrksBlock;
