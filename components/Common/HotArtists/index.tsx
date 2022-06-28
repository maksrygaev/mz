import { useEffect, useState } from 'react';
import { UsersServices } from 'core/services/users';
import hotArtists from './HotArtists.module.scss';
import HotArtistsCard from '../Cards/HotArtistscard';
import useTranslation from 'next-translate/useTranslation';

const HotArtists = () => {
  const [artists, setArtists] = useState([]);
  const { t } = useTranslation();
  const loadArtists = () => {
    UsersServices.search({
      sorting: { column: 'countLikes', isAscending: 'false' },
      limitation: { count: 12 },
    })
      .then(rs => setArtists(rs))
      .catch(() => []);
  };
  useEffect(() => {
    loadArtists();
  }, []);

  artists.sort(function (x1: any, x2: any) {
    if (x1.countLikes > x2.countLikes) return -1;
    if (x1.countLikes < x2.countLikes) return 1;
    if (x1.countProductsSold > x2.countProductsSold) return -1;
    if (x1.countProductsSold < x2.countProductsSold) return 1;
    return 0;
  });

  return (
    <section className="container">
      <div className={hotArtists.artists}>
        <div className={hotArtists.artists__head}>
          <h2>{t('common:hot artist')}</h2>
        </div>
        <div className={hotArtists.artists__content}>
          {artists.map((item: any) => (
            <div className={hotArtists.artists__card} key={item.id}>
              <HotArtistsCard
                id={item.id}
                name={item.name}
                avatar={item?.previewFilePath ? item?.previewFilePath : '/icons/userpage/user-default.jpg'}
                likes={item.countLikes}
                sold={item.countProductsSold}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotArtists;
