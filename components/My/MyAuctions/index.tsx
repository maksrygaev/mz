import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Space } from 'antd';
import { TAppState } from 'core/store';
import MyAuctionsTable from './MyAuctionsTable';
import MyBidsTable from './MyBidsTable';

const MyAuctions: React.FC = () => {
  const [activeSection, setActiveSection] = useState('My auctions');
  const user = useSelector((state: TAppState) => state.session.user);

  if (!user) return null;

  return (
    <div className="container">
      <h2 className="section_title">Auctions</h2>
      <Space style={{ paddingTop: 16, paddingBottom: 40 }} size={20}>
        <Button
          onClick={() => setActiveSection('My auctions')}
          className={
            activeSection === 'My auctions'
              ? 'btn btn-rounded-small-black-border-white-text'
              : 'btn btn-rounded-small-white-border-black-text'
          }
        >
          My auctions
        </Button>
        <Button
          onClick={() => setActiveSection('My bids')}
          className={
            activeSection === 'My bids'
              ? 'btn btn-rounded-small-black-border-white-text'
              : 'btn btn-rounded-small-white-border-black-text'
          }
        >
          My bids
        </Button>
      </Space>
      {activeSection === 'My auctions' && <MyAuctionsTable artist={user} />}
      {activeSection === 'My bids' && <MyBidsTable artist={user} />}
    </div>
  );
};

export default MyAuctions;
