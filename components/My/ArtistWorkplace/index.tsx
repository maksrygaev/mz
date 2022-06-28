import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { TProduct, TProposal } from 'core/constants/types';
import { UsersServices } from 'core/services';
import ArtistWorksList from './ArtistWorksList';
import { ProposalsServices } from 'core/services/proposals';
import { OrdersServices } from 'core/services/orders';
import styles from './index.module.scss';

interface IProps {
  gallery?: any;
}

const ArtistWorkspace: React.FC<IProps> = ({ gallery }) => {
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const galleryID = Number(router.query?.id);
  const [artworks, setArtworks] = useState<TProduct[]>([]);
  const [waitingArtworks, setWaitingArtworks] = useState<TProposal[]>([]);
  const [proposedArtworks, setProposedArtworks] = useState<any>([]);

  const loadProducts = () => {
    UsersServices.userProducts({
      userID: user?.id,
      sorting: { column: 'productID', isAscending: 'false' },
    })
      .then(res => setArtworks(res.filter((item: any) => (item?.amount || 0) > (item?.amountListed || 0))))
      .catch(error => console.log(error));

    ProposalsServices.search({ userID: user?.id, galleryID: galleryID, status: 'New' })
      .then(res => setWaitingArtworks(res))
      .catch(error => console.log(error));

    OrdersServices.search({ userID: user?.id, galleryID: galleryID })
      .then(res => setProposedArtworks(res))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      {gallery?.status === 'Moderation' ? (
        <p className={styles.title}>Please wait for the gallery to be moderated</p>
      ) : gallery?.status === 'Draft' ? (
        <p className={styles.title}>Please send your gallery for moderation</p>
      ) : (
        <>
          <ArtistWorksList
            loadProducts={loadProducts}
            title={'My artworks'}
            artworks={artworks}
            galleryID={galleryID}
          />
          <ArtistWorksList title={'Waiting for gallery admin approval'} artworks={waitingArtworks} hideButton />
          <ArtistWorksList title={'Published'} artworks={proposedArtworks} hideButton />
        </>
      )}
    </div>
  );
};

export default ArtistWorkspace;
