/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { googleLogin, loginAsync } from '../store/actions/authAction';

const Login = () => {
    const navigateTo = useNavigate();
    const { isLogin } = useSelector((state) => state.authReducer);

    console.log("isLogin", isLogin)

    const [input, setInput] = useState({
        id: '',
        email: '',
        password: ''

    });

    const handleInput = (event) => {

        const { name, value } = event.target;

        setInput({ ...input, [name]: value });
    }

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(loginAsync(input));
    }

    const handleCreateAccount = () => {
        navigateTo("/signup");
    }

    const handleGoogleLogin = () => {
        dispatch(googleLogin());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginAsync(input));

        setInput({
            id: '',
            email: '',
            password: ''
        })
    }

    useEffect(() => {
        if (isLogin) {
            navigateTo('/');
        }
    }, [isLogin]);

    return (
        <Container className='loginWrapper d-flex justify-content-center align-items-center'>
            <Form onSubmit={handleSubmit} className='loginForm'>
            <h1 className='h2 text-center mb-5'>Login</h1>

                <div className='d-flex justify-content-center mb-4'>
                    <Button className='bg-transparent text-dark border-0' onClick={handleGoogleLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                    </Button>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' value={input.email} placeholder="Enter Email Address" onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' autoComplete="on" value={input.password} placeholder="Password" onChange={handleInput} />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                    <Button className='me-2 p-0 border-0' variant="" onClick={handleCreateAccount}>
                        Create Account
                    </Button>
                    <Button className='position-relative me-0' variant="primary" onClick={handleLogin}>
                        LOGIN
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Login