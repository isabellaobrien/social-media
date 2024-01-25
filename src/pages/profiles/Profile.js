import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';
import {useSetProfileData} from '../../contexts/ProfileDataCotext'

const Profile = (props) => {
    const {profile, mobile, imageSize} = props;
    const {id, following_id, image, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData()
  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
        <div>
            <Link to={`/profiles/${id}`}>
                <Avatar src={image} height={imageSize}/>
            </Link>

        </div>
        <div>
            <strong>{owner}</strong>
        </div>
        <div className={`text-right ${!mobile && "ml-auto"}`}>
            {!mobile && currentUser && !is_owner && (
                following_id ? (
                    <Button onClick={() => handleUnfollow(profile)}>unfollow</Button>
                ) : (
                    <Button onClick={() => handleFollow(profile)}>follow</Button>
                )
            )}

        </div>

    </div>
  )
}

export default Profile