import React, {useState, useEffect} from 'react';
import styles from "../../styles/PostCreateForm.module.css";
import {Form, Button, Alert, Col, Container} from "react-bootstrap";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
    useCurrentUser,
  } from "../../contexts/CurrentUserContext";
import { axiosRes } from '../../api/axiosDefault';

const PasswordForm = () => {
  const history = useHistory();
  const {id} = useParams();

  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  })
  const {new_password1, new_password2} = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    if(currentUser?.profile_id?.toString() !== id){
      history.push("/")
    }
  }, [currentUser, history, id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axiosRes.post("/dj-rest-auth/password/change/", userData)
      history.goBack()
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
          <Form.Group controlId="new_password1">
              <Form.Label>New password</Form.Label>
                  <Form.Control 
                      placeholder='new password'
                      type="password" 
                      name="new_password1"
                      value={new_password1}
                      onChange={handleChange} 
                  />
          </Form.Group>
          {errors?.new_password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                  {message}
              </Alert>
          ))}
          <Form.Group controlId="new_password2">
              <Form.Label>Confirm password</Form.Label>
                  <Form.Control 
                      placeholder='confirm new password'
                      type="password" 
                      name="new_password2"
                      value={new_password2}
                      onChange={handleChange} 
                  />
          </Form.Group>
          {errors?.new_password2?.map((message, idx) => (
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

export default PasswordForm