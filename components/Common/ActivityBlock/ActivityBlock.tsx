import style from './ActivityBlock.module.scss';
import { FC } from 'react';

interface IProps {
  data: any
}

const ActivityBlock: FC<IProps> = ({ data }) => {
  return (
    <section className="container_first">
      <div className={style.explore}>
        <div className={style.explore__head}>
          <h2 className={style.explore__title}>Activity</h2>
        </div>

        <div className={style.explore__content}>
          <div className={style.history__card}>
            <div>
              <div className={style.history__card__img}>
                <img src="/images/card6.jpg" alt="" />
              </div>
              <div className={style.history__card__info}>
                <div className={style.history__card__name}>
                  Asset name
                </div>
                <div className={style.history__card__footer}>
                  <div className={style.history__card__footer__left}>
                    1 Edition purchased by
                  </div>
                  <div className={style.history__card__avatar}>
                    <img src="/icons/avatars/ava-1.png" alt="" />
                  </div>
                  <div className={style.history__card__footer__right}>
                    Morgan Teylor for $ 230,16
                  </div>
                </div>
              </div>
            </div>
            <div className={style.history__card__date}>
              20.08.2021
            </div>
          </div>

          <div className={style.history__card}>
            <div>
              <div className={style.history__card__img}>
                <img src="/images/card5.jpg" alt="" />
              </div>
              <div className={style.history__card__info}>
                <div className={style.history__card__name}>
                  Asset name
                </div>
                <div className={style.history__card__footer}>
                  <div className={style.history__card__footer__left}>
                    Created by
                  </div>
                  <div className={style.history__card__avatar}>
                    <img src="/icons/avatars/ava-2.png" alt="" />
                  </div>
                  <div className={style.history__card__footer__right}>
                    Trevis Pac for $ 110
                  </div>
                </div>
              </div>
            </div>
            <div className={style.history__card__date}>
              19.08.2021
            </div>
          </div>

          <div className={style.history__card}>
            <div>
              <div className={style.history__card__img}>
                <img src="/images/card4.jpg" alt="" />
              </div>
              <div className={style.history__card__info}>
                <div className={style.history__card__name}>
                  Asset name
                </div>
                <div className={style.history__card__footer}>
                  <div className={style.history__card__footer__left}>
                    Sold by
                  </div>
                  <div className={style.history__card__avatar}>
                    <img src="/icons/avatars/ava-3.png" alt="" />
                  </div>
                  <div className={style.history__card__footer__right}>
                    Devis Ram for $ 130
                  </div>
                </div>
              </div>
            </div>
            <div className={style.history__card__date}>
              16.08.2021
            </div>
          </div>

          <div className={style.history__card}>
            <div>
              <div className={style.history__card__img}>
                <img src="/images/card3.png" alt="" />
              </div>
              <div className={style.history__card__info}>
                <div className={style.history__card__name}>
                  Asset name
                </div>
                <div className={style.history__card__footer}>
                  <div className={style.history__card__footer__left}>
                  </div>
                  <div className={style.history__card__avatar}>
                    <img src="/icons/avatars/ava-3.png" alt="" />
                  </div>
                  <div className={style.history__card__footer__right}>
                    Barbara Letty Accepted bid $ 130
                  </div>
                </div>
              </div>
            </div>
            <div className={style.history__card__date}>
              17.08.2021
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityBlock;
