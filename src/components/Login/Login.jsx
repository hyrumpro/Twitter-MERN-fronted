import {Grid, GridRow, GridColumn, Image, Form, FormField, Checkbox, Button, Message} from 'semantic-ui-react'
import { Link } from "react-router-dom";

import mainImage from '../../assets/Twitter-main-login.jpg'
import './Login.scss'
import useForm from "../../hooks/useForm.js";
import {useState} from "react";
import { LOGIN } from "../../gql/user.js";
import { useMutation } from "@apollo/client";

const Login = () => {

    const { formData, errors, handleChange, handleSubmit, isSubmitting } = useForm({
        email: '',
        password: '',
    }, {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Email validation rule
        password: (value) => value.length >= 6, // Password validation rule (example)
    });

    const [loggin] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log("Login successful:", data);
            handleSuccess(data);
        },
        onError: (error) => {
            console.error("Login error:", error);
            handleError(error);

        }
    });


    const handleLogin = async (data) => {
        try {
            const response = await loggin({ variables: { input: data } });
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        let errorMessage = 'There was a problem with the login. Check the user or password';
        if (error.message) {
            errorMessage = error.message;
        }
        setMessage({
            header: 'User Login failed',
            content: errorMessage,
            negative: true,
        });
        console.error('Error during the login:', error);
    };

    const handleSuccess = (responseData) => {
        setMessage({
            header: 'Your Login was successful',
            content: 'Login successful you will be redirected!',
            positive: true,
        });
        console.log('User Login successfully:', responseData);
    };



    const [message, setMessage] = useState(null);





    return(
         <Grid className="Login">
            <GridRow>
                <GridColumn width={8}>
                    <Image src={mainImage} className="img-login" />
                </GridColumn>
                <GridColumn verticalAlign="middle" width={8}>
                    {message && (
                        <Message {...message} />
                    )}
                    <h1>Login to Twitter</h1>
                    <Form>
                        <FormField error={!!errors.email}>
                            <label>Email</label>
                            <input type='email'
                                   placeholder='Email'
                                   name='email'
                                   value={formData.email}
                                   onChange={handleChange}
                            />
                        </FormField>
                        <FormField error={!!errors.password}>
                            <label>Password</label>
                            <input type='password'
                                   placeholder='Password'
                                   name='password'
                                   value={formData.password}
                                   onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <Checkbox label='Remember me' checked={false} /> <Link to='/register'>Sign Up to Twitter</Link>
                        </FormField>
                        <Button
                            type='submit'
                            onClick={(event) => {
                                event.preventDefault();
                                handleSubmit(handleLogin);
                            }}
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                        >Log In</Button>
                    </Form>
                </GridColumn>
            </GridRow>
        </Grid>
    );

}



export default Login;
