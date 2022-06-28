import { HeartFilled } from '@ant-design/icons';
import Link from 'next/link';
import style from './CardArtist.module.scss';
import {sliceCardUserName} from "../../../../core/helpers";

interface ICard {
  id: number;
  name: string;
  avatar?: string;
  likes?: number;
  sold?: number;
}
const HotArtistsCard = ({ id, name, avatar, likes, sold }: ICard): JSX.Element  => {
  return (
    <div className={style.card}>
      <Link href={`/user/${id}`}>
        <a>
          <div className={style.card__avatar}>
            <img src={avatar} alt={name} />
            <div className={style.card__title}>{name?.length > 20 ? `${name?.slice(0, 12)} ...` : name}</div>
          </div>
        </a>
      </Link>
      <div className={style.card__info}>
        <div className={style.card__likes}>
          <div className={style.card__likes__img}>
            {<HeartFilled />}
          </div>
          {likes}
        </div>
        <div className={style.card__sold}>
          {sold} sold
        </div>
      </div>
    </div>
  );
};

export default HotArtistsCard;
