import React, {FC, useState} from 'react';
import Link from 'next/link';
import {Button, message, Modal} from 'antd';
import style from '../../galleryAdmin.module.scss';
import { ProposalsServices } from 'core/services/proposals';
import ModalGalleryArtworkReject from "../../../../Modal/ModalGalleryArtworkReject";
import {sliceProductName, toLocalString} from "../../../../../core/helpers";

interface IProps {
  artworks: any;
  loadProposals?: any;
  hideButtons?: boolean;
  title: string;
}

const RenderArtwork: FC<IProps> = props => {
  const [product, setProduct] = useState<any | null>(null);

  const handleApproveProposal = (row: any) => {
    ProposalsServices.approve({id: row?.id})
      .then(() => {
        message.success('Proposal was approved');
        props.loadProposals();
      })
      .catch(error => console.log(error))
  }

  const handleCloseModal = (): void => setProduct(null);

  return (
    <>
      <h1 className={`${style.sectionTitle} section_title`}>
        {props.title}
      </h1>
      {props.artworks.length ? (
        <ul className={style.list}>
          {props.artworks.map((item: any) => (
            <li className={style.gallery__card} key={item.id}>
              <div>
                <Link href={`/product/${item?.productID}`}>
                  <a target="_blank">
                    <div className={style.gallery__card__img}>
                      <img src={item.previewFilePath || item.productPreviewFilePath} alt={item.name} />
                    </div>
                  </a>
                </Link>
                <div className={style.gallery__card__info}>
                  <Link href={`/product/${item?.productID}`}>
                    <a className={style.link} target="_blank">
                      <div className={style.gallery__card__name}>{sliceProductName(item.name) || sliceProductName(item.productName)}</div>
                    </a>
                  </Link>
                  <div className={style.gallery__card__footer}>
                    <Link href={`/user/${item?.userID}`}>
                      <a className={style.link} target="_blank">
                        <div className={style.gallery__card__avatar}>
                          <img src={item.userPreviewFilePath || '/icons/userpage/user-default.jpg'} alt="avatar" />
                        </div>
                      </a>
                    </Link>
                    <Link href={`/user/${item?.userID}`}>
                      <a className={style.link} target="_blank">
                        <div className={style.gallery__card__footer__left}>{item.userName}</div>
                      </a>
                    </Link>
                    <div className={style.gallery__card__footer__right}>
                      {toLocalString(item.dateCreated)}
                    </div>
                  </div>
                </div>
              </div>
              {!props.hideButtons && (
                <div>
                  <Button onClick={() => handleApproveProposal(item)} style={{ border: 'none', padding: '0 4px' }}>
                    <img src="/images/pic-yes.png" alt="Approve" />
                  </Button>
                    <Button
                      onClick={() => setProduct(item)}
                      style={{ border: 'none' }}
                    >
                      <img src="/images/pic-bin.png" alt="Reject" />
                    </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
      {product && (
        <Modal footer={null} onCancel={handleCloseModal} visible>
          <ModalGalleryArtworkReject artwork={product} loadData={() => props.loadProposals()} closeModal={handleCloseModal} />
        </Modal>

      )}
    </>
  );
};

export default RenderArtwork;
