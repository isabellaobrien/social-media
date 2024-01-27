import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefault';
import styles from '../../styles/CommentCreateForm.module.css'

const CommentEditReplyForm = (props) => {
    const {id, content, setShowReplyEditForm, setReply, profile_id, profile_image} = props;
    const [formContent, setFormContent] = useState(content);
    

    const handleChange = (event) => {
        setFormContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
            try{
                await axiosRes.put(`/comment-reply/${id}/`, {
                    content: formContent.trim(),
                })
                setReply((prevReply) => ({
                    ...prevReply,
                    results: prevReply.results.map((reply) => {
                        return reply.id === id ? {
                            ...reply,
                            content: formContent.trim(),
                            updated_at: "now",
                        } : reply;
                    })
                }))
                setShowReplyEditForm(false)
        }catch (err){
            console.log(err)
        }
    }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reply">
            <Form.Label>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
            </Form.Label>
            <Form.Control 
                as="textarea"
                onChange={handleChange}
                value={formContent} 
            />
                
        </Form.Group>
        <Button className={styles.btn} onClick={() => setShowReplyEditForm(false)}>
            cancel
        </Button>
        <Button  type="submit" className={styles.btn}>
            save
        </Button>
    </Form>
  )
}

export default CommentEditReplyForm