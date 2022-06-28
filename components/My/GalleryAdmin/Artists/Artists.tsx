import React, { FC, useEffect, useState } from 'react';
import { Table, Empty, Button, Modal, Form } from 'antd';
import { useRouter } from 'next/router';
import style from '../galleryAdmin.module.scss';
import ModalUserInvite from 'components/Modal/ModalUserInvite';
import { GalleriesServices } from 'core/services/galleries';
import { TArtist, TGallery } from 'core/constants/types';

interface IProps {
  galleryID: number;
}

const { Column } = Table;

const Artists: FC<IProps> = ({ galleryID }) => {
  const [isShowInviteModal, setIsShowInviteModal] = useState<boolean>(false);
  const [gallery, setGallery] = useState<TGallery | null>(null);
  const [artists, setArtists] = useState<TArtist[]>([]);
  const router = useRouter();
  const [form] = Form.useForm()

  const loadData = (): void => {
    GalleriesServices.get(galleryID)
      .then(res => {
        setGallery(res)
        if(res?.status == 'Approved') {
          GalleriesServices.invitesList({galleryID: galleryID})
            .then(res => setArtists(res))
            .catch(err => console.log(err))
        }
      })
      .catch(console.log)
  };

  const closeModal = (): void => {
    setIsShowInviteModal(false);
    form.resetFields()
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className={style.gallery__subhead}>
        <h2 className={style.gallery__title}>Artists</h2>
      </div>
      <Table
        dataSource={artists}
        pagination={false}
        locale={{ emptyText: <Empty /> }}
        rowKey={'id'}
      >
        <Column
          title="User name"
          dataIndex="name"
          render={(text, row: any) => (
            <div className={style.gallery__card__footer}>
              <div className={style.gallery__card__avatar}>
                <img src={row.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt="avatar" />
              </div>
              <div className={style.gallery__card__footer__left}>{row.userName || 'No Name'}</div>
            </div>
          )}
        />
        <Column
          title="Add upload"
          dataIndex="productAmountLimit"
          render={(text, row: TArtist) => <div className={style.gallery__card__date}>{row?.productAmountLimit}</div>}
        />
        <Column
          title="Artwork uploaded"
          dataIndex="countProductPublished"
          render={(text, row: TArtist) => (
            <div className={style.gallery__card__date}>{row?.countProductsPublished || 0}</div>
          )}
        />
        <Column
          title="Waiting for approve"
          dataIndex="countProductsWaiting"
          render={(text, row: TArtist) => (
            <div className={style.gallery__card__date}>{row?.countProductsWaiting || 0}</div>
          )}
        />
      </Table>
      <div className={style.gallery__buttons__artist}>
        <Button
          disabled={gallery?.status !== 'Approved'}
          onClick={() => setIsShowInviteModal(true)}
          className="btn btn-rounded-small-black-border-white-text"
        >
          Invite new artist
        </Button>
      </div>
      <Modal onCancel={closeModal} width={620} visible={isShowInviteModal}>
        <ModalUserInvite form={form} loadData={loadData} onOk={closeModal} id={Number(router.query?.id)} />
      </Modal>
    </>
  );
};

export default Artists;
