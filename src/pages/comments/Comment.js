import React, {useState} from 'react';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Comment.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefault';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CommentEditForm from './CommentEditForm';

const Comment = (props) => {
    const {
        profile_id, 
        profile_image, 
        owner, 
        updated_at, 
        content,
        id,
        setPost,
        setComments,
        comment_like_id,
        comment_likes_count,
    } = props;
    
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/comments/${id}`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        commments_count: prevPost.results[0].commments_count - 1,
                    }
                ]
            }))

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id)
            }))
        }catch (err){
            console.log(err)
        }
    }

    const handleCommentLike = async () => {
      try{
        const {data} = await axiosRes.post("/comment-likes/", {comment : id});
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            return comment.id === id ? 
            {...comment, comment_likes_count: comment_likes_count + 1, comment_like_id: data.id} :
            comment
          })
        }))
      }catch (err){
        console.log(err)
      }

    }

    const handleCommentUnlike = async () => {
      try {
        await axiosRes.delete(`/comment-likes/${comment_like_id}/`);
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            return comment.id === id
              ? { ...comment, comment_likes_count: comment_likes_count - 1, comment_like_id: null }
              : comment;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <div className={styles.container}>
        <Link to={`/profiles/${profile_id}`} className={styles.profile}>
            <Avatar src={profile_image} />
            {owner}
        </Link>
        <div className={styles.more}>
            {is_owner && !showEditForm && (<Dropdown drop="up">
              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => setShowEditForm(true)}>
                    edit <i class="fa-solid fa-pen-to-square"></i>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(handleDelete)}>
                    delete <i class="fa-solid fa-trash"></i>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>)}
        </div>
        <div>
          {showEditForm? (
            <CommentEditForm
              id={id} 
              profile_id={profile_id}
              content={content}
              profile_image={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        <hr/>
        <div className={styles.icon}>
                {is_owner? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own comment!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ): comment_like_id? <span onClick={handleCommentUnlike}>
            <i class="fa-solid fa-heart"></i>
          </span> : currentUser? <span onClick={handleCommentLike}>
            <i class="fa-regular fa-heart"></i>
          </span>: <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like comments</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger> }

            
            {comment_likes_count}
          </div>
          <br/>
          <small>{updated_at}</small>
        
    </div>
  )
}

export default Comment