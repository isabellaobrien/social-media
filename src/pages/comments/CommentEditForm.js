import React, { useState } from 'react'
import styles from '../../styles/CommentCreateForm.module.css'
import { axiosRes } from '../../api/axiosDefault';
import {Form, Button} from 'react-bootstrap'

const CommentEditForm = (props) => {
    const {id, content, setShowEditForm, setComments} = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            })
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id ? {
                        ...comment,
                        content: formContent.trim(),
                        updated_at: "now",
                    } : comment;
                })
            }))
            setShowEditForm(false)
        }catch(err) {
            console.log(err);
        }
    }
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
            <Form.Control 
                as="textarea"
                onChange={handleChange}
                value={formContent} 
            />
                
        </Form.Group>
            <div className={styles.btn_center}>
                <div className={styles.btn_container}>
                    <button className={styles.btn} onClick={() => setShowEditForm(false)}>
                        cancel
                    </button>
                </div>
                <div className={styles.btn_container}>
                    <button type="submit" className={styles.btn}>
                        edit
                    </button>
                </div>
            </div>
    </Form>
  )
}

export default CommentEditForm