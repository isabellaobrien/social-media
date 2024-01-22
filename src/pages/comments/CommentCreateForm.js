import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefault';

const CommentCreateForm = (props) => {
    const {post, setPost, setComments, profile_image, profile_id} = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await axiosRes.post("/comments/", {
                content, 
                post,
            })
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count + 1,
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
        <Form.Group controlId="formBasicEmail">
            <Form.Label>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                write a comment
            </Form.Label>
            <Form.Control 
                type="textarea"
                onChange={handleChange}
                value={content} />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn d-block ml-auto">
            Submit
        </Button>
    </Form>
  )
}

export default CommentCreateForm