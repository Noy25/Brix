import { userService } from "../services/user.service.js";


export function onSignup(credentials) {
    return async (dispatch) => {

        try {
            const user = await userService.signup(credentials);
            dispatch({ type: 'SET_USER', user });
            dispatch(setUserMsg({ type: 'success', txt: `Welcome ${credentials.nickname} !`, timer: 4000 }));
        } catch (err) {
            console.log('Something went wrong, check the provided credentials', credentials);
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {

        try {
            const user = await userService.login(credentials);
            dispatch({ type: 'SET_USER', user });
            dispatch(setUserMsg({ type: 'success', txt: 'Welcome Back !', timer: 4000 }));
        } catch (err) {
            console.log('Something went wrong, invalid username or password, compare credentials to db', credentials);
        }
    }
}

export function onLogout() {
    return async (dispatch) => {

        try {
            await userService.logout();
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