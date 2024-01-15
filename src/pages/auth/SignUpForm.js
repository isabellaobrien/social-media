import React, { useState } from 'react'
import {Form, Button, Alert} from "react-bootstrap"
import styles from "../../styles/SignUpForm.module.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    })

    const {username, password1, password2} = signUpData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/sign-in");
        }catch (err){
            setErrors(err.response?.data);
        }
    }

  return (
    <div className={styles.container}>
        <p className={styles.title}>SIGN UP FORM</p>
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

            <Form.Group controlId="password1">
            <Form.Label className="d-none">password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}


            <Button variant="primary" type="submit">
                Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
        </Form>
    </div>
  )
}

export default SignUpForm
