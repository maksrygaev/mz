import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { TAppState } from 'core/store';
import { LinkData, LinksServices, UsersServices } from 'core/services';
import LinkButton from 'components/Common/LinkButton';
import ProfileBackground from './ProfileBackground';
import { UserProps } from './models';
import { PortfolioTop } from '../../Portfolio/PortfolioTop';
import styles from './profile.module.scss';

interface Props {
  isAuthorized?: boolean;
  artist?: any;
}

const UserProfile: React.FC<Props> = ({ isAuthorized, artist }) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [linksList, setLinksList] = useState<LinkData[]>([]);
  const [fileBannerInfo, setFileBannerInfo] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const user = useSelector((state: TAppState) => state.session.user);
  const id = router.query.id ?? user?.id;

  useEffect(() => {
    if (!id) return;
    UsersServices.getUser({ id: artist.id })
      .then(rs => setUserData(rs))
      .catch(() => []);
    LinksServices.linksFetch({ userID: artist.id })
      .then(response => setLinksList(response))
      .catch(() => []);
  }, [id]);

  const avatarImage = userData?.previewFileID ? userData?.previewFilePath : '/icons/userpage/user-default.jpg';

  const bannerImage = fileBannerInfo ? fileBannerInfo?.path : userData?.contentFilePath;

  if (!userData) return null;

  return (
    <section className={`${styles.container} container`}>
      <ProfileBackground
        bannerImage={bannerImage}
        className={styles.profileBackgroundBackground}
        avatar={avatarImage}
        user={userData}
        rightButton={
          artist?.id === user?.id &&
            <LinkButton icon="/icons/icon-setting.svg" href="/my/edit">
              Edit profile
            </LinkButton>
        }
      />
      <PortfolioTop settings={isAuthorized} follow={isAuthorized} userData={userData} linksList={linksList} />
    </section>
  );
};

export default UserProfile;
