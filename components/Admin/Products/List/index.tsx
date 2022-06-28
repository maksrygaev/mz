import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {Table, Empty, Typography, message, Spin, Modal, Button} from 'antd';
import { ProductsServices } from 'core/services';
import ProductBlock from '../../../Site/ProductDetail/ProductBlock';
import ProductApprove from '../../../Site/ProductDetail/ProductApprove';
import {sliceCardUserName, toLocalString} from 'core/helpers';
import {useInfiniteFetch} from "core/hooks";
import {TProduct} from "core/constants/types";
import ModalProductReject from "../../../Modal/ModalProductReject";

const { Column } = Table;
const { Title } = Typography;

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState<TProduct | null>(null);

  const { data, isFetching, hasNextPage, infiniteRef, reLoad } = useInfiniteFetch({
    service: ProductsServices.search,
    count: 20,
    filters: { status: 'Moderation'}
  });

  useEffect(() => {
    if(data.length) setProducts(data);
  }, [data]);

  const handleSuccess = () => {
    message.success('Product was approved');
    reLoad();
  };

  const closeModal = () => setProduct(null);

  return (
    <>
      <Title>Products</Title>
      <Table
        loading={isFetching}
        dataSource={products}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      >
        <Column title="Img" dataIndex="previewFilePath" key="previewFilePath" render={ (text, row: any) =>
          <Link href={`/product/${row.id}`}><a target="_blank"><img width={100} height={100} src={row.previewFilePath} alt={'avatar'} /></a></Link>
        } />
        <Column title="Product name" dataIndex="name" key="name" render={ (text, row: any) =>
          <Link href={`/product/${row.id}`} ><a  target="_blank" style={{color: 'black'}}>{row.name}</a></Link>
        } />
        <Column title="Status" dataIndex="status" key="status" render={ (text, row: any) =>
          <ProductBlock>
            <ProductApprove product={row} onSuccess={handleSuccess} />
            <Button onClick={() => setProduct(row)}>Reject</Button>
          </ProductBlock>
        } />
        <Column title="Author" dataIndex="userName" key="userName" render={(text, row: any) => sliceCardUserName(row.userName)} />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Date" dataIndex="dateCreated" key="dateCreated" render={ (text, row: any) => toLocalString(row.dateCreated) }/>
      </Table>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
      {product && (
        <Modal footer={null} width={500} onCancel={closeModal} visible>
          <ModalProductReject product={product} closeModal={closeModal} loadData={reLoad} />
        </Modal>
      )}
    </>
  );
}
