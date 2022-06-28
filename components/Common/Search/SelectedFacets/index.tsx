import React from 'react';
import { Skeleton } from 'antd';
import Tags from 'components/Common/Tags';
import Tag from 'components/Common/Tag';

import styles from '../search.module.scss';

interface FilterTag {
  text?: string;
}

interface Props {
  selectedFacets?: FilterTag[];
  isLoading?: boolean;
  onRemove?: (e: any) => void;
}

const SelectedFacets: React.FC<Props> = ({ selectedFacets, isLoading, onRemove }) => {
  if (!selectedFacets?.length && isLoading) {
    return null;
  }

  if (isLoading) {
    return <Skeleton.Input active style={{ width: 260, height: 10, marginBottom: '30px' }} />;
  }

  return (
    <Tags className={styles.selectedFacets}>
      {selectedFacets?.map(facet => (
        <Tag text={facet.text} key={`facet-${Math.random()}`} onClose={onRemove} isRemove />
      ))}
    </Tags>
  );
};

export default SelectedFacets;
