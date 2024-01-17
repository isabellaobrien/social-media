import React from 'react'
import {Card, Tooltip, OverlayTrigger} from "react-bootstrap"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Post.module.css"
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
      } = props;

      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;

  return (
    <div className={styles.container}>
        <Card className={styles.post}>
            <div className={styles.next}>
              <Link to={`/profiles/${profile_id}`} className={styles.profile}>
                  <Avatar src={profile_image} height={55}/>
                  {owner}
              </Link>
              <div className={styles.dots}>
                {is_owner && postPage && "..."}
              </div>
            </div>
          
            
            <Link to={`/posts/${id}`}>
                <Card.Img alt={title} src={image} />
            </Link>

            <Card.Body className={styles.body}>
                {is_owner? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ): like_id? <span onClick={() => {}}>
            <i class="fa-solid fa-heart"></i>
          </span> : currentUser? <span onClick={() => {}}>
            <i class="fa-regular fa-heart"></i>
          </span>: <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger> }

            {likes_count}
            <Link to={`/posts/${id}`} className={styles.icons}>
                <i class="fa-regular fa-comment"></i>
            </Link>
            {comments_count}

                <Card.Title>{title}</Card.Title>

                <Card.Text>{content}</Card.Text>

                <Card.Text>{updated_at}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Post