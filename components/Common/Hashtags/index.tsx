import React from 'react';
import Tag from 'components/Common/Tag';
import Tags from 'components/Common/Tags';

interface HashtagProps {
  id: string;
  content?: string;
}

interface Props {
  hashtags?: HashtagProps[];
}

const Hashtags: React.FC<Props> = ({ hashtags }) => {
  if (!hashtags?.length) {
    return null;
  }

  return (
    <Tags>
      {hashtags.map(item => (
        <Tag key={item.id} text={`#${item.content}`} />
      ))}
    </Tags>
  );
};

export default Hashtags;
