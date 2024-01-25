import React, {useState} from 'react'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from '../../styles/Comment.module.css'
import { Dropdown } from 'react-bootstrap';
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
  return (
    <div>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>

          <span>{owner}</span>
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

          <small>{updated_at}</small>
          <hr/>

    </div>

  )
}

export default Reply