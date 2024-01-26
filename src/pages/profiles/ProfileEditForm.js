import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {Form, Button, Alert, Col, Container,Image} from "react-bootstrap"
import styles from "../../styles/PostCreateForm.module.css";
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefault';

const ProfileEditForm = () => {
    const history = useHistory();
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const {id} = useParams();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        image: "",
    })

    const {image} = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async() => {
            if(currentUser?.profile_id?.toString() === id) {
                try{
                    const {data} = await axiosReq.get(`/profiles/${id}/`);
                    const {image} = data;
                    setProfileData({image});
                }catch(err){
                    console.log(err);
                    history.push('/');
                }
            }else{
                history.push('/');
            }
        }
        handleMount();
    }, [currentUser, history, id])

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData();

        if(imageFile?.current?.files[0]){
            formData.append("image", imageFile?.current?.files[0]);
        }

        try{
            const {data} = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }))
            history.goBack();
        }catch(err){
            console.log(err)
            setErrors(err.response?.data)
        }
    }

  return (
    <Col md={6} className={styles.center}>
    <Container className={styles.container}>
    <p className={styles.title}>Edit your profile picture</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                {image && (
                    <figure>
                        <Image src={image} fluid />
                    </figure>
                    )}
                    {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                    ))}
                    <div>
                    <Form.Label
                        className={`${styles.btn} btn my-auto`}
                        htmlFor="image-upload"
                    >
                        Change the image
                    </Form.Label>
                    </div>
                <Form.File 
                    id="image-upload" 
                    accept="image/*" 
                    ref={imageFile}
                    onChange={(e) => {
                        if (e.target.files.length) {
                          setProfileData({
                            ...profileData,
                            image: URL.createObjectURL(e.target.files[0]),
                          });
                        }
                      }}
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
                        edit
                    </Button>
                </div>
            </div>
            
        </Form>
        </Container>
        </Col>
  )
}

export default ProfileEditForm