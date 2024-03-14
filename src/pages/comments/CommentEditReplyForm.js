import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefault';
import styles from '../../styles/PostCreateForm.module.css'

const CommentEditReplyForm = (props) => {
    const {id, content, setShowReplyEditForm, setReply} = props;
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
        <br/>
        <Form.Group controlId="reply">
            <Form.Control 
                as="textarea"
                onChange={handleChange}
                value={formContent} 
            />
                
        </Form.Group>
        <div className={styles.btn_center}>
            <div className={styles.btn_container}>
                <button className={styles.btn} onClick={() => setShowReplyEditForm(false)}>
                    cancel
                </button>
            </div>

            <div className={styles.btn_container}>
                <button  type="submit" className={styles.btn}>
                    save
                </button>
            </div>
        </div>
    </Form>
  )
}

export default CommentEditReplyForm


