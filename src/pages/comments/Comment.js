import React, {useState} from 'react';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Comment.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefault';
import { Dropdown } from 'react-bootstrap';
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
                    onClick={handleDelete}>
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
        <small>{updated_at}</small>
        
    </div>
  )
}

export default Comment