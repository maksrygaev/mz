import React from 'react';
import UserProfile from 'components/My/Profile';
import Layout from 'components/Common/Layout';
import { UsersServices } from 'core/services';
import { TUser } from 'core/constants/types';
import ArtowrksBlock from 'components/My/ArtworksBlock';
import CollectionsBlock from 'components/My/CollectionsBlock';
import GalleriesBlock from 'components/My/GalleriesBlock';

interface IProps {
  artist: TUser;
}

const Artist: React.FC<IProps> = ({artist}) => {
  return (
  <Layout>
    <UserProfile artist={artist} />
    <ArtowrksBlock artist={artist} />
    <CollectionsBlock artist={artist} />
    <GalleriesBlock artist={artist} />
  </Layout>
  );
};


export async function getServerSideProps(context: any) {
  const { hash } = context.query;
  const artist: any = await UsersServices.usersFetch({ hash }).catch(() => null);
  if (!artist) {
    return {
      notFound: true,
    };
  }
  return {
    props: { artist },
  };
}

export default Artist;
