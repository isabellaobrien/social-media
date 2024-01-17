import React, { useRef, useState } from 'react'
import {Form, Button, Alert, Col, Container} from "react-bootstrap"
import styles from "../../styles/PostCreateForm.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefault';

const PostCreateForm = () => {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    })

    const {title, content, image} = postData;

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeImage = (event) => {
        if(event.target.files.length){
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", imageInput.current.files[0]);

        try{
            const {data} = await axiosReq.post("/posts/", formData)
            history.push(`/posts/${data.id}`)
        }catch (err){
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
      }
        }
    }


  return (
    <Col md={6} className={styles.center}>
    <Container className={styles.container}>
    <p className={styles.title}>Create a post</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text" 
                    name="title"
                    value={title}
                    onChange={handleChange} 
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    type="textarea" 
                    name="content"
                    value={content} 
                    onChange={handleChange} 
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.File 
                    id="image" 
                    label="Image"
                    accept="image/*"
                    onChange={handleChangeImage} 
                    ref={imageInput}
                />
            </Form.Group>

            <div className={styles.btn_center}>
                <div className={styles.btn_container}>
                    <Button className={styles.btn} onClick={() => history.goBack()}>
                        cancel
                    </Button>
                </div>
                <div className={styles.btn_container}>
                    <Button type="submit" className={styles.btn}>
                        post
                    </Button>
                </div>
            </div>
            
        </Form>
        </Container>
        </Col>
  )
}

export default PostCreateForm