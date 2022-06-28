import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { UsersServices } from 'core/services';
import { useSelector } from 'react-redux';
import { TAppState } from 'core/store';

interface Props {
  id?: any,
  followed?: boolean,
  countFollowers?: number;
  onSuccess: (value: number) => void;
}

const UserFollowers: React.FC<Props> = ({ id, countFollowers, followed, onSuccess }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isfollowed, setIsfollowed] = useState<boolean>(followed || false);
  const [followers, setFollowers] = useState<number>(countFollowers || 0);
  const user = useSelector((state: TAppState) => state.session.user);

  useEffect(() => setIsfollowed(followed || false), [followed])
  useEffect(() => setFollowers(countFollowers || 0), [countFollowers])

  const handleFollow = async () => {
    try {
      await UsersServices.followersCreate({ id: id })
      setIsfollowed(true);
      setFollowers(followers + 1);
      onSuccess(followers + 1);
    }  catch (error) {
      setErrorMessage(error.message);
    }
  }
  const handleUnFollow = async () => {
    UsersServices.followersSearch({userID: id})
    .then(res => {
      res.map((follower: any) => {
        if(follower.followerID === user?.id) {
          try {
           UsersServices.followersDelete(follower.id)
            .then(res => console.log(res))
            .catch(err => console.log(`Followers delete error`, err))      
              setIsfollowed(false);
              setFollowers(followers - 1);
              onSuccess(followers - 1);
          }  catch (error) {
            setErrorMessage(error.message);
          }
        }
      })
    })
    .catch(err => console.log(err))
  }
  return (
    <div style={{border: '0 !important', padding: '0 !important', marginRight: '5px'}}>
      <div>
        <Button onClick={isfollowed ? handleUnFollow : handleFollow}  className={`btn btn-rounded-white-black-border`}>
          {isfollowed ? (
            <>Unfollow</>
          ): (
            <>Follow</>
          )}
        </Button>
        {/*<span>{followers}</span>*/}
      </div>
      {errorMessage && <>{message.error(errorMessage)}</>}
    </div>
  );
};

export default UserFollowers;
