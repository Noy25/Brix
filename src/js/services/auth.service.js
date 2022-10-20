import { storageService } from './storage.service';

// Frontend Demo :
import { asyncStorageService } from './async-storage.service';
// Backend :
import { httpService } from './http.service';


export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    checkIsAvailable,
    validateForm
}


const USER_STORAGE_KEY = 'user'; // this will be user collection in wap_db
const LOGGEDIN_USER_STORAGE_KEY = 'loggedinUser'; // currently logged in user in sessionStorage


async function signup(credentials) {
    // Frontend Demo :
    // const user = await asyncStorageService.post(USER_STORAGE_KEY, credentials);

    // Backend :
    const user = await httpService.post('auth/signup', credentials);

    // Both :
    return _setUserSession(user); // <-- Login after signup
}

async function login(credentials) {
    // Frontend Demo :
    // const users = await asyncStorageService.query(USER_STORAGE_KEY);
    // const user = users.find(user => user.username === credentials.username && user.password === credentials.password);
    // Can handle this condition in store / component :
    // if (user) {
    //     console.log('Loggedin Successfully');
    //     console.log(user);
    // } else return console.log('Invalid username or password.');

    // Backend :
    const user = await httpService.post('auth/login', credentials);

    // Both :
    return _setUserSession(user);
}

async function logout() {
    // Both :
    _clearUserSession();

    // Backend :
    return await httpService.post('auth/logout');
}

function getLoggedinUser() {
    // Frontend Demo :
    return _getUserFromSession() || null;

    // Backend : ?
    // Could get user from cookies
}

async function checkIsAvailable(username) {
    // Frontend Demo :
    // const users = await asyncStorageService.query(USER_STORAGE_KEY);
    // const user = users.find(user => user.username === username);
    // return !user;

    // Backend :
    const isAvailable = await httpService.post('auth/username', { username });
    return new Promise(resolve => setTimeout(() => resolve(isAvailable), 1000));
}

function validateForm({ username, password, confirmPassword, nickname }) {
    return {
        username: _validateUsername(username),
        password: _validatePassword(password, confirmPassword),
        nickname: _validateNickname(nickname)
    }
}


// *** *** *** Private Functions *** *** *** //

function _validateUsername(username) {
    const usernameRegex = /^[a-z][a-z\d]{3,15}$/;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!username.includes('@')) {
        const res = usernameRegex.test(username);
        if (!res) {
            if (/[A-Z]/.test(username)) return 'Please provide small letters only'
            if (!/[a-z]/.test(username.charAt(0))) return 'First character must be a letter';
            if (username.length < 4) return 'Username must be at least 4 characters long';
            if (username.length > 16) return 'Username must be less than 16 characters long';
        }
    } else {
        const res = emailRegex.test(username);
        if (!res) return 'Please provide a valid email format';
    }
}

function _validatePassword(password, confirmPassword) {
    const passwordRegex = /^\w{6,18}$/;
    const res = passwordRegex.test(password);
    if (!res) {
        if (password.length < 6) return 'Password should be at least 6 characters long';
        if (password.length > 18) return 'Password should no more than 18 characters long';
    }
    if (password !== confirmPassword) return 'Your passwords do not match';
}

function _validateNickname(nickname) {
    const nicknameRegex = /^[a-zA-Z]\w{3,20}$/;
    const res = nicknameRegex.test(nickname);
    if (!res) {
        if (!/[a-zA-Z]/.test(nickname.charAt(0))) return 'First character must be a letter';
        if (nickname.length < 4) return 'Nickname should be at least 6 characters long';
        if (nickname.length > 20) return 'Nickname should no more than 20 characters long';
    }
}

function _setUserSession(user) {
    storageService.saveToSession(LOGGEDIN_USER_STORAGE_KEY, user);
    return user
}

function _clearUserSession() {
    storageService.removeFromSession(LOGGEDIN_USER_STORAGE_KEY);
}

function _getUserFromSession() {
    return storageService.loadFromSession(LOGGEDIN_USER_STORAGE_KEY);
}