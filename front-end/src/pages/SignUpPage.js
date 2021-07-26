import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';

export const SignUpPage = () => {
    const [token, setToken] = useToken() //our custom hook
    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue
        });
        const { token } = response.data;
        setToken(token);
        history.push('/'); //redirects us to the homepage
    }

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="some@gmail.com" />
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password" />
            <input
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue ||
                    passwordValue !== confirmPasswordValue}
                onClick={onSignUpClicked}>Sign Up</button>
            {/* // history.push is a redirect */}

            <button onClick={() => history.push('/login')}>Already have an account? Login In </button>

        </div>
    )
}

export default SignUpPage