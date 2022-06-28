import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SplashScreen from 'components/Common/SplashScreen';
import { TGetSelfStatus } from 'core/store/session';
import { TAppState } from 'core/store';

interface IProps {
  roles: string[],
  children: any,
}

const UserAccessLayout: FC<IProps> = ({ children, roles = [] }) => {
  const router = useRouter();
  const { user, getSelfStatus } = useSelector((state: TAppState) => state.session);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  if (isClient) {
    if (user) {
      if (!roles.includes(user.role)) {
        router.push('/');
        return null;
      }

      return children;
    }
    if (getSelfStatus === TGetSelfStatus.FAILURE) {
      router.push('/');
    }
  }

  return <SplashScreen />;
}

export default UserAccessLayout;
