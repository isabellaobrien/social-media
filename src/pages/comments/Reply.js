import React from 'react'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";


const Reply = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;
  return (
    <div>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>

          <span>{owner}</span>
          <p>{content}</p>
          <small>{updated_at}</small>
          <hr/>

    </div>

  )
}

export default Reply