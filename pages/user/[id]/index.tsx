import React from 'react';
import UserProfile from 'components/My/Profile';
import Layout from 'components/Common/Layout';
import { UsersServices } from 'core/services';
import ArtowrksBlock from 'components/My/ArtworksBlock';
import { TUser } from 'core/constants/types';
import CollectionsBlock from 'components/My/CollectionsBlock';
import GalleriesBlock from 'components/My/GalleriesBlock';

interface IProps {
  artist: TUser;
}

const User: React.FC<IProps> = ({ artist }) => {
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
  const { id } = context.query;
  const artist: any = await UsersServices.getUser({ id }).catch(() => null);
  if (!artist) {
    return {
      notFound: true,
    };
  }
  return {
    props: { artist },
  };
}

export default User;
