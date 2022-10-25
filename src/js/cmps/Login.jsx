// React
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// Actions
import { onSignup, onLogin } from '../store/auth.action';
import { shouldShowLogin } from '../store/system.action';
// Services
import { authService } from '../services/auth.service';
import { utilService } from '../services/util.service';
// Cmps
import { Screen } from './Screen';
// Assets
import userProfile from '../../assets/imgs/user.png';
import { FaFacebookF, FaInfoCircle, FaRegCheckCircle, FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import Loader from 'react-loaders';


export function Login() {

    const dispatch = useDispatch();
    const inputRef = useRef();

    const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '', nickname: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        if (!isLogin) {
            setIsUsernameAvailable('');

            if (credentials.username.length < 4) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            checkAvailability(credentials.username);
        }
    }, [credentials.username])

    useEffect(() => {
        if (isSubmitted) {
            if ((isUsernameAvailable === 'yes') && (!formErrors.username && !formErrors.password && !formErrors.nickname)) dispatch(onSignup(credentials));
            else setIsSubmitted(false);
        }
    }, [isSubmitted])

    const setSignup = (ev) => {
        ev.stopPropagation();
        setIsLogin(false)
    }

    const setLogin = (ev) => {
        ev.stopPropagation();
        setIsLogin(true);
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        try {
            //  Login
            if (isLogin) {
                delete credentials.nickname;
                dispatch(onLogin(credentials));
            } else { //  Signup
                setFormErrors(authService.validateForm(credentials));
                setIsSubmitted(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleGoogleLogin = ({ profileObj }) => {
        const googleCredentials = {
            username: profileObj.email,
            password: '123', // fictive password for backend auth
            nickname: profileObj.givenName
        }
        dispatch(onSignup(googleCredentials));
        dispatch(shouldShowLogin(false));
    }

    const handleGoogleLoginFailure = err => {
        console.log(err);
    }

    const handleFacebookLogin = (res) => {
        console.log(res);
        const facebookCredentials = {
            username: res.email,
            password: '123', // fictive password for backend auth
            nickname: res.name.split(' ')[0]
        }
        dispatch(onSignup(facebookCredentials));
        dispatch(shouldShowLogin(false));
    }

    const handleFacebookLoginFailure = err => {
        console.log(err);
    }

    const checkAvailability = useCallback(utilService.debounce(async (username) => {
        const isAvailable = await authService.checkIsAvailable(username);
        setIsLoading(false);
        isAvailable ? setIsUsernameAvailable('yes') : setIsUsernameAvailable('no');
    }), [])


    return (
        <Screen cb={() => dispatch(shouldShowLogin(false))}>
            <section className="login" onClick={ev => ev.stopPropagation()}>
                <i className="flex justify-center align-center" onClick={() => dispatch(shouldShowLogin(false))}>&times;</i>

                <div className="pfp">
                    <img src={userProfile} alt="" />
                </div>

                <form className="flex column" onSubmit={handleSubmit}>

                    <div className="field flex column">
                        <label htmlFor="username" className="flex align-center">Username / Email {!isLogin && <FaInfoCircle title="Will be used to log in" />}</label>
                        <input type="text" ref={inputRef} id="username" name="username" value={credentials.username} onChange={handleChange} placeholder={isLogin ? "Please enter your username" : "example123 / example@gmail.com"} required />
                        {isLoading && <Loader type="ball-pulse" />}
                        {isUsernameAvailable !== '' &&
                            <p className="username-available flex align-center">
                                {isUsernameAvailable === 'yes'
                                    ? <>{`${credentials.username} is available`} <FaRegCheckCircle color="#69e353" /></>
                                    : <>{`Sorry, ${credentials.username} is already taken`} <FaExclamationTriangle color="#ebbb35" /></>}
                            </p>}
                        <p className="form-error">{formErrors.username}</p>
                    </div>

                    <div className="field flex column">
                        <label htmlFor="password" className="flex align-center">Password {!isLogin && <FaInfoCircle title="Should be at least 6 characters long" />}</label>
                        <input type={shouldShowPassword ? "text" : "password"} id="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Please enter your password" required />
                        <div className="icon-eye" onClick={() => setShouldShowPassword(!shouldShowPassword)} title="Show/unshow password">{shouldShowPassword ? <FaEyeSlash /> : <FaEye />}</div>
                        <p className="form-error">{formErrors.password}</p>
                    </div>

                    {!isLogin && <div className="field flex column">
                        <label htmlFor="confirmPassword" className="flex align-center">Confirm Password <FaInfoCircle title="Should match the password above" /></label>
                        <input type={shouldShowPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={credentials.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                        <div className="icon-eye" onClick={() => setShouldShowPassword(!shouldShowPassword)} title="Show/unshow password">{shouldShowPassword ? <FaEyeSlash /> : <FaEye />}</div>
                    </div>}

                    {!isLogin && <div className="field flex column">
                        <label htmlFor="nickname" className="flex align-center">Nickname <FaInfoCircle title="Will be displayed to everyone else" /></label>
                        <input type="text" id="nickname" name="nickname" value={credentials.nickname} onChange={handleChange} placeholder="Please enter a nickname" required />
                        <p className="form-error">{formErrors.nickname}</p>
                    </div>}

                    <button className="align-self-start">{isLogin ? 'Sign in' : 'Sign up'}</button>

                </form>

                <GoogleLogin className="google-login"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    theme="dark"
                    buttonText="Continue with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy="single_host_origin"
                    prompt="consent" />

                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    fields="name,email,picture"
                    callback={handleFacebookLogin}
                    onFailure={handleFacebookLoginFailure}
                    render={renderProps => (
                        <div className="facebook-login flex align-center" onClick={renderProps.onClick}>
                            <div className="icon flex justify-center align-center"><FaFacebookF /></div>
                            <button>Continue with Facebook</button>
                        </div>
                    )} />


                {isLogin && <p>Don't have an account yet? <span onClick={setSignup}>Sign up</span></p>}
                {!isLogin && <p>Already have an account? <span onClick={setLogin}>Login</span></p>}

            </section>
        </Screen>
    )
}