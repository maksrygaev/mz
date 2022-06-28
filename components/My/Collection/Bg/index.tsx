import React, { FC, useState } from 'react';
import DetailBackground from 'components/My/DetailBackground';
import LinkButton from 'components/Common/LinkButton';
import { CollectionsServices, FilesServices } from 'core/services';

interface IProps {
  id: any;
  collection: any;
}

const CollectionBg: FC<IProps> = ({ id, collection }) => {
  const [fileBannerInfo, setFileBannerInfo] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const uploadBanner = (info: any): void => {
    const data = new FormData();
    data.append('file', info.file);
    FilesServices.fileUpload(data)
      .then(response => {
        setFileBannerInfo(response);
        CollectionsServices.collectionUpdate({ id: id, bannerFileID: response.id })
          .then(rs => console.log(rs))
          .catch(() => []);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const bannerImage = fileBannerInfo
    ? fileBannerInfo.path
    : collection?.previewFilePath
      ? collection?.previewFilePath
      : '';

  return (
    <DetailBackground
      bgImage={bannerImage}
      rightContent={
        <LinkButton icon="/icons/icon-setting.svg" href={`/my/collection/${id}/edit`}>
          Edit collection
        </LinkButton>
      }
      // rightContent={<div className={styles.closeTime}>Time to close: 3 hours</div>}
    />
  );
};

export default CollectionBg;
