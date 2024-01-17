import React, { useState } from 'react'
import {Form, Button, Alert, Container, Col} from "react-bootstrap"
import styles from "../../styles/SignInForm.module.css";
import { useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser()
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    })

    const {username, password} = signInData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            history.push("/");
        }catch (err){
            setErrors(err.response?.data);
        }
    }

  return (
        <Col md={6} className={styles.center}>
            <Container className={styles.container}>
                <p className={styles.title}>sign in</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                    <Form.Label className="d-none">username</Form.Label>
                        <Form.Control 
                            className={styles.input}
                            type="text" 
                            placeholder="Username" 
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password">
                    <Form.Label className="d-none">password</Form.Label>
                        <Form.Control 
                            className={styles.input}
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <div className={styles.center}>
                        <Button className={styles.btn} type="submit">
                            Sign in
                        </Button>
                    </div>
                    
                    {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                    ))}
                    <div className={styles.link_container}>
                        <Link to="/sign-up" className={styles.link}>
                        Don't have an account? Sign up now!
                        </Link>
                    </div>
                </Form>
            </Container>
        </Col>
    
  )
}

export default SignInForm
