import { Avatar } from 'antd';
import style from './CardTop.module.scss';
import Link from 'next/link';

interface ICard {
  id?: string;
  src: string;
  href?: string;
  type?: string;
  price?: string;
  category?: string;
  name: string;
  likes?: string;
  liked?: boolean;
  userID?: string,
  author?: string;
  avatar?: string;
  showIcon?: boolean;
}
const CardTop = ({ id, src, type, price, category, name, likes, avatar, author, href, userID }: ICard): JSX.Element  => {
  return (
    <div className={style.card}>
{/*      <div className={style.header}>
        <div className={style.header__clock}>
          Next release
        </div>
        <div className={style.header__time}>
          <div className={style.header__clock_img}>
            <img src="/icons/icon-clock.svg" alt="Next release" />
          </div>
          <span>20</span> hours <span>15</span> min <span>05</span> sec
        </div>
      </div>*/}
      {/* <div className={style.card__view}> */}
      <div>
        {(href === undefined) ? (
          <div className={style.mainWrapper}>
            <div className={style.imgWrapper}>
              <img className={style.img} src={src} alt={name} />
            </div>
          </div>
        ) : (
          <Link href={`${href}`}>
            <a>
              <div className={style.card__image}>
                <img src={src} alt={name} />
              </div>
            </a>
          </Link>
        )}
        <div className={style.info}>
          {(href === undefined) ? (
            <a>
              <h2 className={style.card__title}>{name}</h2>
            </a>
          ) : (
            <Link href={`${href}`}>
              <a>
                <h2 className={style.card__title}>{name}</h2>
              </a>
            </Link>
          )}
          {(price !== "") &&
          <div className={style.card__tag}>
            <div className={style.card__tag__price}>
              {price} ETH
            </div>
            <div className={style.card__tag__last}>Last Trade</div>
          </div>
          }
          <div className={style.card__creator}>
            {(userID === undefined) ? (
              <>
                <Avatar size={25} icon={<img src={avatar} alt={author} />} />
                <p>{author}</p>
              </>
            ) : (
              <>
                <Link href={`/user/${userID}`}>
                  <a>
                    <Avatar size={25} icon={<img src={avatar} alt={author} />} />
                  </a>
                </Link>
                <Link href={`/user/${userID}`}>
                  <a>
                    <p>{author}</p>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTop;
