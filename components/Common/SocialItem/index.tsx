import React from 'react';
import { EyeOutlined, HeartOutlined, MailOutlined } from '@ant-design/icons';
import styles from './socialItem.module.scss';

export type IconType =
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'email'
  | 'likes'
  | 'eye'
  | 'linkedIn';

interface Props {
  icon?: IconType | string | undefined;
  text?: string | number;
  url?: string;
}

export const renderIcon = (icon?: string) => {
  switch (icon) {
    case 'Instagram':
      return <img src="/icons/socials/instagram.svg" />;
    case 'Facebook':
      return <img src="/icons/socials/facebook.svg" />;
    case 'Twitter':
      return <img src="/icons/socials/twitter.svg" />;
    case 'Linked In':
      return <img src="/icons/socials/linkedin.svg" />;
    case 'Dribbble':
      return <img src="/icons/socials/dribbble.svg" />;
    case 'YouTube':
      return <img src="/icons/socials/youtube.svg" />;
    case 'Behance':
      return <img src="/icons/socials/behance.svg" />;
    case 'Vimeo':
      return <img src="/icons/socials/vimeo.svg" />;
    case 'email':
      return <MailOutlined />;
    case 'likes':
      return <HeartOutlined />;
    case 'eye':
      return <EyeOutlined />;
    default:
      return '';
  }
};

const SocialItem: React.FC<Props> = ({ icon, text, url }) => {
  console.log('icon --->', icon);
  console.log('text --->', text);
  console.log('url --->', url);

  return (
    <div className="socialList">
      <div style={{width:'100%' , height:0.5 , backgroundColor:'black'}}/>
      <div>
        <div id={'name'}>
          <span id={'icon'}>{icon}</span>
          <span>{text}</span>
        </div>
        <div id={'url'}>
        <a href={url}>{url}</a>
        </div>
      </div>
    </div>
  );
};

export default SocialItem;
