import React, { useState } from 'react';
import Link from 'next/link';
import {Table, Empty, Typography, Button, message, Modal, Spin} from 'antd';
import { GalleriesServices } from 'core/services/galleries';
import ModalGalleryReject from 'components/Modal/ModalGalleryReject';
import { TGallery } from 'core/constants/types';
import {useInfiniteFetch} from "../../../../core/hooks";
import {sliceCardUserName} from "../../../../core/helpers";

const { Column } = Table;
const { Title } = Typography;

const GalleriesList:React.FC = () => {
  const [gallery, setGallery] = useState<TGallery | null>(null);

  const { data, isFetching, hasNextPage, infiniteRef, reLoad } = useInfiniteFetch({
    service: GalleriesServices.search,
    count: 20,
    filters: { status: 'Moderation'}
  });

  const handleApproveGallery = (row: TGallery): void => {
    GalleriesServices.approve(row.id)
      .then(() => {
        message.success('Gallery was approved');
        reLoad();
      })
      .catch(error => console.log('Approve gallery error', error));
  };

  const closeModal = (): void => setGallery(null);

  const toLocalString = (date: number) => new Date(date).toLocaleDateString('en-US');

  return (
    <>
      <Title>Galleries</Title>
      <Table dataSource={data} pagination={false} locale={{ emptyText: <Empty /> }} className="admin_galleries">
        <Column
          title="Img"
          dataIndex="previewFilePath"
          key="previewFilePath"
          render={(text, row: TGallery) => (
            <Link href={`/gallery/${row.id}`}>
              <a target="_blank">
                <img width={100} src={row.previewFilePath} alt={'banner'} />
              </a>
            </Link>
          )}
        />
        <Column
          title="Gallery name"
          dataIndex="name"
          key="name"
          render={(text, row: TGallery) => (
            <Link href={`/gallery/${row.id}`}>
              <a target="_blank" style={{ color: 'black' }}>
                {row.name}
              </a>
            </Link>
          )}
        />
        <Column
          title="Author"
          dataIndex="userName"
          key="userName"
          render={(text, row: TGallery) => (
            <Link href={`/user/${row.userID}`}>
              <a target="_blank" style={{ color: 'black' }}>
                {sliceCardUserName(row.userName) || 'Master'}
              </a>
            </Link>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text, row: TGallery) => (
            <>
              <Button onClick={() => handleApproveGallery(row)}>Approve</Button>
              <Button onClick={() => setGallery(row)}>Reject</Button>
            </>
          )}
        />
        <Column
          title="Date"
          dataIndex="dateCreated"
          key="dateCreated"
          render={(text, row: TGallery) => toLocalString(row.dateCreated)}
        />
      </Table>
      {(isFetching || hasNextPage) && (
        <div className={'loading-spinner'} ref={infiniteRef}>
          <Spin />
        </div>
      )}
      {gallery && (
        <Modal width={500} onCancel={closeModal} visible>
          <ModalGalleryReject gallery={gallery} closeModal={closeModal} loadData={reLoad} />
        </Modal>
      )}
    </>
  );
};

export default GalleriesList;
