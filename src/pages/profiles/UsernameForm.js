import React,{useEffect, useState} from 'react'
import styles from "../../styles/PostCreateForm.module.css";
import {Form, Button, Alert, Col, Container} from "react-bootstrap"
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
    useCurrentUser,
    useSetCurrentUser,
  } from "../../contexts/CurrentUserContext";
import { axiosRes } from '../../api/axiosDefault';

const UsernameForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState({})
  const {id} = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if(currentUser?.profile_id?.toString() === id){
        setUsername(currentUser.username)
    }else{
        history.push("/")
    }
  }, [currentUser, history, id])

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        await axiosRes.put("/dj-rest-auth/user/", {
            username,
        })
        setCurrentUser((prevUser) => ({
            ...prevUser,
            username,
        }));
        history.goBack();
    }catch(err){
        console.log(err);
        setErrors(err.response?.data);
    }
  }
  return (
    <Col md={6} className={styles.center}>
    <Container className={styles.container}>
    <p className={styles.title}>Edit your username</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
              <Form.Label>username</Form.Label>
                  <Form.Control 
                      type="text" 
                      name="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)} 
                  />
          </Form.Group>
          {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                  {message}
              </Alert>
          ))}

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

export default UsernameForm