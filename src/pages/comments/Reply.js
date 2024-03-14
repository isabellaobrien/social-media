import React, {useState} from 'react'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from '../../styles/Comment.module.css'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefault';
import CommentEditReplyForm from './CommentEditReplyForm';


const Reply = (props) => {
    const { 
      profile_id, 
      profile_image, 
      owner, 
      updated_at, 
      content,
      setComments,
      setReply,
      reply_like_id,
      reply_likes_count,
      id,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const [showReplyEditForm, setShowReplyEditForm] = useState(false);

    const handleDelete = async () => {
      try{
          await axiosRes.delete(`/comment-reply/${id}`);
          setComments((prevComments) => ({
              results: [
                  {
                      ...prevComments.results[0],
                      commment_reply_count: prevComments.results[0].commment_reply_count - 1,
                  }
              ]
          }))

          setReply((prevReply) => ({
              ...prevReply,
              results: prevReply.results.filter((reply) => reply.id !== id)
          }))
      }catch (err){
          console.log(err)
      }
  }
  const handleReplyLike = async () => {
    try{
      const {data} = await axiosRes.post("/reply-likes/", {reply : id});
      setComments((prevReply) => ({
        ...prevReply,
        results: prevReply.results.map((reply) => {
          return reply.id === id ? 
          {...reply, reply_likes_count: reply_likes_count + 1, reply_like_id: data.id} :
          reply
        })
      }))
    }catch (err){
      console.log(err)
    }

  }

  const handleReplyUnlike = async () => {
    try {
      await axiosRes.delete(`/reply-likes/${reply_like_id}/`);
      setComments((prevReply) => ({
        ...prevReply,
        results: prevReply.results.map((reply) => {
          return reply.id === id
            ? { ...reply, reply_likes_count: reply_likes_count - 1, reply_like_id: null }
            : reply;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
        <Link to={`/profiles/${profile_id}`} className={styles.profile}>
          <Avatar src={profile_image} />
          {owner}
        </Link>
          <div className={styles.more}>
            {is_owner && (<Dropdown drop="up">
              <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => setShowReplyEditForm(true)}>
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
          <br/>
          {showReplyEditForm? (
            <CommentEditReplyForm
              id={id} 
              profile_id={profile_id}
              content={content}
              profile_image={profile_image}
              setReply={setReply}
              setShowReplyEditForm={setShowReplyEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className={styles.icon}>
                {is_owner? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own reply!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ): reply_like_id? <span onClick={handleReplyUnlike}>
            <i class="fa-solid fa-heart"></i>
          </span> : currentUser? <span onClick={handleReplyLike}>
            <i class="fa-regular fa-heart"></i>
          </span>: <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like replies</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger> }

            
            {reply_likes_count}
          </div>

          <small>{updated_at}</small>
          <hr/>

    </div>

  )
}

export default Reply