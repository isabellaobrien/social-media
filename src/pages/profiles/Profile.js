import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';
import {useSetProfileData} from '../../contexts/ProfileDataCotext'
import styles from '../../styles/CommentCreateForm.module.css'

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
                    <button onClick={() => handleUnfollow(profile)} className={styles.btn}>unfollow</button>
                ) : (
                    <button onClick={() => handleFollow(profile)} className={styles.btn}>follow</button>
                )
            )}

        </div>

    </div>
  )
}

export default Profile