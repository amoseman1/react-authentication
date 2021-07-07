import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const onLoginClicked = async () => {
        alert("still need this feature")
    }

    return (
        <div className="content-container">
            <h1>Login</h1>
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
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLoginClicked}>Log In</button>
            {/* // history.push is a redirect */}
            <button onClick={() => history.push('/forgot-password')}>Forgot Password</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up </button>

        </div>
    )
}

export default LoginPage