import { FC, useState } from 'react';
import { Menu, Button } from 'antd';
import { TProduct } from 'core/constants/types';
import style from './ExploreMarket.module.scss';
import store, { TAppState } from 'core/store';
import { useSelector } from 'react-redux';

interface IExtraParams {
  categoryID?: number;
}

interface IExploreMarketProps {
  data: TProduct[];
  onFilterChanged: (params: IExtraParams) => void;
}

const ExploreMarket: FC<IExploreMarketProps> = ({ onFilterChanged }) => {
  const [activeItem, setActiveItem] = useState(0);
  const categoriesList = useSelector((state: TAppState) => state.categories.list);
  const handleItem = (e: any): void => {
    setActiveItem(e.key);
    onFilterChanged({ categoryID: Number(e.key) });
  };

  return (
    <section className="container">
      <div className={style.explore}>
        <div className={style.explore__head}>
          <Menu disabledOverflow mode="horizontal" onClick={e => handleItem(e)} className={style.explore__menu}>
            <Menu.Item key={0}>
              <Button className={activeItem == 0 ? 'menu__item-active' : 'menu__item'}>All</Button>
            </Menu.Item>
            {categoriesList.map(category => (
              <Menu.Item key={category.id}>
                <Button className={activeItem == category.id ? 'menu__item-active' : 'menu__item'}>
                  {category.name}
                </Button>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </section>
  );
};

export default ExploreMarket;
