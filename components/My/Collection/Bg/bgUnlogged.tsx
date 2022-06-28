import React, { FC, useEffect, useState } from 'react';
import DetailBackground from 'components/My/DetailBackground';
import LinkButton from "../../../Common/LinkButton";
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';
import { CollectionsServices } from 'core/services';

interface IProps {
  collection: any;
}

const CollectionBgUnlogged: FC<IProps> = ({ collection }) => {
  const user = useSelector((state: TAppState) => state.session.user);
  const [collectionData, setCollectionData] = useState<any>({});

  useEffect(() => {
    if (collection?.id) {
      CollectionsServices.getCollection({id: collection?.id})
        .then(res => setCollectionData(res))
        .catch(error => console.log(error))
    }
  }, [collection]);

  if(Object.keys(collection).length == 0) return null;

  return (
    <DetailBackground
      bgImage={collection?.previewFilePath}
      rightContent={collectionData?.userID === user?.id &&
        <LinkButton icon="/icons/icon-setting.svg" href={`/my/collection/${collection?.id}/edit`}>
          Edit collection
        </LinkButton>
      }
    />
  );
};

export default CollectionBgUnlogged;
