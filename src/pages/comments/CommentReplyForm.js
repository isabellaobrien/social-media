import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefault';
import styles from '../../styles/CommentCreateForm.module.css'

const CommentReplyForm = (props) => {
    const {comment, setComments, setReply} = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await axiosRes.post("/comment-reply/", {
                content, 
                comment,
            })
            setReply((prevReply) => ({
                ...prevReply,
                results: [data, ...prevReply.results],
            }));
            setComments((prevComments) => ({
                results: [
                    {
                        ...prevComments.results[0],
                        comment_reply_count: prevComments.results[0].comment_reply_count + 1,
                    },
                ],
            }))
            setContent("");
        }catch (err){
            console.log(err)
        }
    }
  return (
    <div className={styles.container}>
        <br/>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reply">
            <Form.Control 
                as="textarea"
                onChange={handleChange}
                value={content} 
                className={styles.input}
            />
                
        </Form.Group>
        
        <Button  type="submit" className={`${styles.btn} btn d-block ml-auto`}>
            reply
        </Button>
    </Form>
    </div>
  )
}

export default CommentReplyForm