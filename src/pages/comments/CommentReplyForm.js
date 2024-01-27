import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefault';
import styles from '../../styles/CommentCreateForm.module.css'

const CommentReplyForm = (props) => {
    const {comment, setComments, setReply, profile_image, profile_id} = props;
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
                value={content} 
            />
                
        </Form.Group>
        
        <Button  type="submit" className={`${styles.btn} btn d-block ml-auto`}>
            reply
        </Button>
    </Form>
  )
}

export default CommentReplyForm