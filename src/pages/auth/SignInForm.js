import React, { useState } from 'react'
import {Form, Button, Alert} from "react-bootstrap"
import styles from "../../styles/SignUpForm.module.css";
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
    <div className={styles.container}>
        <p className={styles.title}>SIGN IN FORM</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
            <Form.Label className="d-none">username</Form.Label>
                <Form.Control 
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


            <Button variant="primary" type="submit">
                Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <div>
                <Link to="/sign-up">
                Don't have an account? <span>Sign up now!</span>
                </Link>
            </div>
        </Form>
    </div>
  )
}

export default SignInForm
