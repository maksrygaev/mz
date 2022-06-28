import { FC } from 'react';
import Link from 'next/link';
import { InstagramFilled, TwitterOutlined } from '@ant-design/icons';
import community from './Community.module.scss';

export const Community: FC = () => {
  return (
    <section className="container">
      <div className={community.community}>
        <div className={community.community_txt}>
          Join The Community
        </div>
        <div className={community.community_social_wrap}>
          <div className={community.community_social}>
            <Link href="#">
              <div className={community.community_btn}>
                <InstagramFilled />
              </div>
            </Link>
            <Link href="#">
              <div className={community.community_btn}>
                <TwitterOutlined />
              </div>
            </Link>
            <Link href="#">
              <div className={community.community_btn}>
                <img src="/icons/social/discord.svg" alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};