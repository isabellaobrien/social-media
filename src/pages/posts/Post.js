import React from 'react'
import {Card, Tooltip, OverlayTrigger, Dropdown} from "react-bootstrap"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Post.module.css"
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefault";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
        setPosts,
      } = props;

      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const history = useHistory();

      const handleEdit = ()=>{
        history.push(`${id}/edit`);
      }

      const handleDelete = async () => {
        try{
          await axiosRes.delete(`posts/${id}/`);
          history.goBack();
        }catch (err){
          console.log(err)
        }
      }

      const handleLike = async () => {
        try{
          const {data} = await axiosRes.post("/likes/", {post : id});
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id ? 
              {...post, likes_count: post.likes_count + 1, like_id: data.id} :
              post
            })
          }))
        }catch (err){
          console.log(err)
        }

      }

      const handleUnlike = async () => {
        try {
          await axiosRes.delete(`/likes/${like_id}/`);
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id
                ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                : post;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };
    

  return (
    <div className={styles.container}>
        <Card className={styles.post}>
            <div className={styles.next}>
              <Link to={`/profiles/${profile_id}`} className={styles.profile}>
                  <Avatar src={profile_image} height={55}/>
                  {owner}
              </Link>
              <div className={styles.more}>
                {is_owner && postPage && (<Dropdown drop="up">
              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={handleEdit}>
                    edit <i class="fa-solid fa-pen-to-square"></i>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleDelete}>
                    delete <i class="fa-solid fa-trash"></i>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>)}
              </div>
            </div>
          
            
            <Link to={`/posts/${id}`}>
                <Card.Img alt={title} src={image} />
            </Link>

            <Card.Body className={styles.body}>
            <div className={styles.icon}>
                {is_owner? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ): like_id? <span onClick={handleUnlike}>
            <i class="fa-solid fa-heart"></i>
          </span> : currentUser? <span onClick={handleLike}>
            <i class="fa-regular fa-heart"></i>
          </span>: <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger> }

            
            {likes_count}
            </div>
            
          
            <div className={styles.icon}>
              <Link to={`/posts/${id}`} className={styles.link}>
                  <i class="fa-regular fa-comment"></i>
              </Link>
              {comments_count}
            </div>
            

                <Card.Title>{title}</Card.Title>

                <Card.Text>{content}</Card.Text>

                <Card.Text>{updated_at}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Post