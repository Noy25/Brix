import { authService } from '../services/auth.service';
import { shouldShowLogin } from './system.action';

export function onSignup(credentials) {
    return async (dispatch) => {

        try {
            const user = await authService.signup(credentials);
            dispatch({ type: 'SET_USER', user });
            dispatch(shouldShowLogin(false));
            dispatch(setUserMsg({ type: 'success', txt: `Welcome ${credentials.nickname} !`, timer: 4000 }));
        } catch (err) {
            console.log('Something went wrong, check the provided credentials', credentials);
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {

        try {
            const user = await authService.login(credentials);
            dispatch({ type: 'SET_USER', user });
            dispatch(shouldShowLogin(false));
            dispatch(setUserMsg({ type: 'success', txt: 'Welcome Back !', timer: 4000 }));
        } catch (err) {
            console.log('Something went wrong, invalid username or password, compare credentials to db', credentials);
            dispatch(setUserMsg({ type: 'error', txt: 'Invalid username or password.', timer: 4000 }));
        }
    }
}

export function onLogout() {
    return async (dispatch) => {

        try {
            await authService.logout();
            dispatch({ type: 'SET_USER', user: null });
            dispatch(setUserMsg({ type: 'reg', txt: 'Come Back Soon!', timer: 3000 }));
        } catch (err) {

        }
    }
}

export function setUserMsg(msg) {
    return dispatch => {
        dispatch({ type: 'SET_USER_MSG', msg });
        setTimeout(() => dispatch({ type: 'SET_USER_MSG', msg: null }), msg.timer);
    }
}