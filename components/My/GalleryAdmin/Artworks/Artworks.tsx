import React, { FC, useEffect, useState } from 'react';
import { OrdersServices, ProposalsServices } from 'core/services';
import { TProposal } from 'core/constants/types';
import RenderArtwork from './RenderArtwork';

interface IProps {
  galleryID: number;
}

const Artworks: FC<IProps> = ({ galleryID }) => {
  const [proposals, setProposals] = useState<TProposal[]>([]);
  const [publishedArtworks, setPublishedArtworks] = useState<TProposal[]>([])

  const loadProposals = (): void => {
    ProposalsServices.search({galleryID: galleryID, status: 'New'})
      .then(res => setProposals(res))
      .catch(error => console.log(error))

    OrdersServices.search({ galleryID: galleryID })
      .then(res => setPublishedArtworks(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadProposals()
  }, []);

  return (
    <>
      <RenderArtwork
        title={'New requests'}
        loadProposals={loadProposals}
        artworks={proposals}
      />
      <RenderArtwork
        title={'Products on sale'}
        artworks={publishedArtworks}
        hideButtons
      />
    </>
  );
};

export default Artworks;
