import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { FilesServices, UsersServices } from 'core/services';
import { message, Upload } from 'antd';
import ProfileBackground from '../ProfileBackground';
import EditProfileForm from './EditForm';
import { UserProps } from '../models';

const UserEditProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [FileBannerInfo, setFileBannerInfo] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const id = useSelector((state: TAppState) => state.session.user)?.id;

  const loadProfile = (): void => {
    UsersServices.getUser({ id })
      .then(rs => setUserData(rs))
      .catch(() => []);
  };

  const uploadBanner = (info: any): void => {
    const data = new FormData();
    data.append('file', info.file);

    FilesServices.fileUpload(data)
      .then(response => setFileBannerInfo(response))
      .catch(error => setErrorMessage(error.message));
  };

  const beforeUpload = (file: any): boolean => {
    const isLt2M = file.size / 1024 / 1024 / 40 < 1;
    if (!isLt2M) setErrorMessage('Image must be smaller than 40MB!');
    return isLt2M;
  };

  useEffect(() => {
    if (!id) return;
    loadProfile();
  }, [id]);

  if (!userData) {
    return null;
  }

  const bannerImage = FileBannerInfo ? FileBannerInfo?.path : userData?.contentFilePath;

  return (
    <section className="container_first">
      <ProfileBackground
        bannerImage={bannerImage}
        user={userData}
        leftButton={
          <>
            <Upload beforeUpload={beforeUpload} customRequest={uploadBanner} showUploadList={false}>
              <button className="btn-link-white-rounded">
                Choose Banner <img src="/icons/icon-choose-banner.svg" alt="Choose Banner icon" />
              </button>
            </Upload>
            {errorMessage && <>{message.error(errorMessage)}</>}
          </>
        }
      />
      <EditProfileForm user={userData} bannerFileID={FileBannerInfo?.id} />
    </section>
  );
};

export default UserEditProfile;
