import { Button, Table } from 'antd';
import style from './StatsBlock.module.scss';
import { FC } from 'react';

interface IProps {
  data: any
}

const StatsBlock: FC<IProps> = ({ data }) => {
  const columns: any = [
    {
      title: 'Rank',
      dataIndex: 'author',
      fixed: 'left',
      render: function rank(author: any, row: any, index: number) {
        return (
          <div className={style.stats__author}>
            <div className={style.stats__author__num}>
              {index + 1}
            </div>
            <div className={style.stats__author__avatar}>
              <img src={row.userPreviewFilePath} alt="" />
            </div>
            <div className={style.stats__author__name}>
              {author}
            </div>
          </div>
        )
      }
    },
    {
      title: 'Artwork',
      dataIndex: 'previewFilePath',
      render: function actions(previewFilePath: any) {
        return (
          <img src={previewFilePath} style={{width: '60px', height: '60px'}} alt="" />
        )
      }
    },
    {
      title: 'Title Artwork',
      dataIndex: 'name',
    },
    {
      title: '№ of edition',
      dataIndex: 'name',
    },
    {
      title: 'Avg. Resale',
      dataIndex: 'price',
      render: function actions(price: any) {
        return (
          <div className={style.stats__price}>
            {price}
          </div>
        )
      }
    },
    {
      title: 'Orig. Price',
      dataIndex: 'price',
      render: function actions(price: any) {
        return (
          <div className={style.stats__price}>
            {price}
          </div>
        )
      }
    },
    {
      title: 'Appreciation',
      dataIndex: 'price',
    },
    {
      title: 'Total Sales',
      dataIndex: 'price',
    },
    {
      title: 'Grross Sales',
      dataIndex: 'price',
    },
    {
      title: 'Last Sales',
      dataIndex: 'price',
    },
  ];
  return (
    <section className="container_first">
      <div className={style.stats}>
        <h2>Top Metazons</h2>
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
      <div className={style.stats__load}>
        <Button className="btn btn-load-more">
          Load more
        </Button>
      </div>
    </section>
  );
};

export default StatsBlock;
