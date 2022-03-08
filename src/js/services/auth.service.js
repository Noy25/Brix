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
    checkCredentials,
    checkIsAvailable
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

function checkCredentials({ username, password, nickname }) {
    const regex = {
        username: /^[a-z][a-z\d]{3,15}/,
        email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        password: /\w{6,18}/,
        nickname: /^[a-zA-Z]\w{3,20}/
    }
    console.log(regex.username.test(username));
    console.log(regex.password.test(password));
    console.log(regex.nickname.test(nickname));
}

async function checkIsAvailable(username) {
    // Frontend Demo :
    // const users = await asyncStorageService.query(USER_STORAGE_KEY);
    // const user = users.find(user => user.username === username);
    // return !user;

    // Backend :
    const isAvailable = await httpService.post('auth/username', { username });
    return isAvailable;
}

// *** *** *** Private Functions *** *** *** //

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