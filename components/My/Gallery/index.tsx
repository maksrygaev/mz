import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Modal, Spin } from 'antd';
import { TAppState } from 'core/store';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import style from '../../Common/Cards/index.module.scss';
import ModalAddToGallery from 'components/Modal/ModalAddToGallery';
import {TGallery, TGalleryTag, TProduct} from 'core/constants/types';
import ProfileBackground from '../Profile/ProfileBackground';
import ArtworksCard from 'components/Common/Cards/ArtworksCard';
import LinkButton from 'components/Common/LinkButton';
import { GalleriesServices } from 'core/services/galleries';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useInfiniteFetch } from 'core/hooks/useInfiniteFetch';
import { OrdersServices } from 'core/services/orders';
import {hashtagsSlicer} from "../../../core/helpers/hashagsSlicer";

interface IProps {
  gallery: TGallery;
  galleryOrders: any;
  galleryOrdersCount: number;
}

const mapOrdersToProducts = (orders: any) => {
  return orders.map((order: any) => ({
    ...order,
    id: order.productID,
    previewFilePath: order.productPreviewFilePath,
    name: order.productName,
    cathegory: order?.productType || '',
    countLikes: order?.productCountLikes || 0,
    minimalPrice: order?.price || 0,
  }));
};

const GalleryComponent: FC<IProps> = ({ gallery, galleryOrders, galleryOrdersCount }) => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const [galleryData, setGalleryData] = useState<TGallery>(gallery);
  const [visibleModal, setVisibleModal] = useState(false);
  const [products, setProducts] = useState<TProduct[]>(mapOrdersToProducts(galleryOrders));
  const [isLiked, setIsLiked] = useState(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [sorting, setSorting] = useState<any>({ column: 'dateCreated', isAscending: false });
  const [filters, setFilters] = useState<any>({galleryID: router.query?.id});

  // console.log(galleryData?.tags);

  useEffect(() => {
    if (user?.id && router?.query?.id && !galleryData) {
      GalleriesServices.get(Number(router.query.id))
        .then((rs: TGallery) => setGalleryData(rs))
        .catch(error => console.log(error));
    }
  }, [user]);

  const { infiniteRef, data, isFetching, hasNextPage } = useInfiniteFetch({
    service: OrdersServices.search,
    count: 10,
    sorting,
    filters,
  });

  useEffect(() => {
    if (data.length > 0) {
      setProducts(mapOrdersToProducts(data));
    }
  }, [data]);

  useEffect(() => {
    if (galleryData?.id) {
      GalleriesServices.usersSearch({ galleryID: galleryData.id, userID: user?.id })
        .then(res => setIsArtist(Boolean(res.length)))
        .catch(error => console.log(error));
    }
  }, [user?.id, galleryData]);

  const handleLike = (): void => {
    GalleriesServices.like(gallery?.id)
      .then(() => setIsLiked(true))
      .catch(error => console.log(error));
  };

  const handleUnlike = (): void => {
    GalleriesServices.unLike(gallery?.id)
      .then(() => setIsLiked(false))
      .catch(error => console.log(error));
  };

  if (!galleryData) return null;

  const isOwner = Number(user?.id) == Number(galleryData?.userID);

  return (
    <div>
      <div className={styles.bg__container}>
        <ProfileBackground
          bannerImage={galleryData?.previewFilePath}
          className={styles.bgImage}
          avatar={galleryData?.contentFilePath}
          rightButton={
            isOwner && (
              <LinkButton icon="/icons/icon-setting.svg" href={`/gallery/${galleryData?.id}/edit`}>
                Edit gallery
              </LinkButton>
            )
          }
        />
      </div>
      <div className={styles.header}>
        <ul className={styles.flex}></ul>
        <ul className={styles.flex}>
          {(isOwner || isArtist) && (
            <li>
              <Link
                href={
                  isOwner
                    ? `/gallery/${galleryData?.id}/admin`
                    : `/gallery/${galleryData?.id}/artist`
                }
              >
                <Button className={styles.workplaceBtn}>
                  {isOwner ? 'Creator admin panel' : 'Gallery Workspace'}
                </Button>
              </Link>
            </li>
          )}
          {!isOwner && (
            <li>
              <Button
                disabled={!user}
                className={`btn-like ${styles.likeBtn}`}
                onClick={isLiked ? handleUnlike : handleLike}
              >
                {isLiked ? <HeartFilled /> : <HeartOutlined />}
              </Button>
            </li>
          )}
        </ul>
      </div>
      <div>
        <h1 className={`section_title ${styles.gallery_name}`}>{galleryData?.name}</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '-30px'}}>
        {galleryData?.tags && (
          galleryData.tags.map((tag: TGalleryTag) => (
            <Link key={tag.id} href={`/galleries/?tag=${hashtagsSlicer(tag.value)}`}>
              <div className={styles.tag}>#{hashtagsSlicer(tag?.value)}</div>
            </Link>
          ))
        )}
      </div>
      <ul className={style.list}>
        {products.map((product: TProduct) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <li className={`${style.card} ${style.card__artwork}`}>
              <ArtworksCard artwork={product} />
            </li>
          </Link>
        ))}
      </ul>
      {(isFetching || hasNextPage) && (
        <div ref={infiniteRef}>
          <Spin />
        </div>
      )}
      <Modal onCancel={() => setVisibleModal(false)} visible={visibleModal} title={'Add to gallery'}>
        <ModalAddToGallery closeModal={() => setVisibleModal(false)} />
      </Modal>
    </div>
  );
};

export default GalleryComponent;
