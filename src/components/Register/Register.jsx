import {
    Form,
    FormField,
    Input,
    Button,
    Grid,
    Header,
    Container,
    Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './Register.scss'
import useForm from "../../hooks/useForm.js";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_USER } from "../../gql/user.js";


const Register = () => {

    const [addUser] = useMutation(NEW_USER, {
        onCompleted: (data) => {
            console.log("Mutation completed successfully:", data);
            // Implement success logic here
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            handleError(error)
        }
    });


    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting
    } = useForm({
            name: '',
            username: '',
            email: '',
            password: '',
        }, {
            name: (value) => value.trim().length > 0,
            username: (value) => value.trim().length > 0,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            password: (value) => value.trim().length > 6,
        });


    const handleRegister = (data) => {
        try {
            const response = addUser({ variables: { input: data } });
            handleSuccess(response);
        } catch (error) {
            handleError(error);
        }
    };

    const handleSuccess = (responseData) => {
        setMessage({
            header: 'Your Registration was successful',
            content: 'Registration successful you will be redirected!',
            positive: true,
        });
        console.log('User added successfully:', responseData);
    };

    const handleError = (error) => {
        let errorMessage = 'There was a problem with registration.';
        if (error.message) {
            errorMessage = error.message;
        }

        setMessage({
            header: 'User registration failed',
            content: errorMessage,
            negative: true,
        });
        console.error('Error during registration:', error);
    };



    const [message, setMessage] = useState(null);




    return (
        <Container className="centered-container">
            <Header as="h1" textAlign="center">
                Join Twitter
            </Header>
            <Form>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <FormField error={!!errors.name}>
                            <label>Name</label>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                icon="user"
                            />
                        </FormField>
                        <FormField error={!!errors.username}>
                            <label>Username</label>
                            <Input
                                type="text"
                                placeholder="Choose a username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                icon="at"
                            />
                        </FormField>
                    </Grid.Column>
                    <Grid.Column>
                        <FormField error={!!errors.email}>
                            <label>Email</label>
                            <Input
                                type='email'
                                placeholder="Enter your email address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                icon="mail"
                            />
                        </FormField>
                        <FormField error={!!errors.password}>
                            <label>Password</label>
                            <Input
                                type="password"
                                placeholder="Create a password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                icon="lock"
                            />
                        </FormField>
                    </Grid.Column>
                </Grid>
                <Button
                    type="submit"
                    primary fluid
                    size="large"
                    onClick={(event) => {
                        event.preventDefault();
                        handleSubmit(handleRegister);
                    }}
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                        >
                    {isSubmitting ? 'Registering...' : 'Create your account'}
                </Button>
            </Form>
            <Message attached="bottom">
                Already have an account? <Link to="/login">Log in</Link>
            </Message>
            {message && (
                <Message {...message} />
            )}
        </Container>
    );
};


export default Register