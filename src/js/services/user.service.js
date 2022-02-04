import { storageService } from './storage.service';

// Frontend Demo :
import { asyncStorageService } from './async-storage.service';
// Backend :
import { httpService } from './http.service';


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
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

// *** *** *** Private Functions *** *** *** //

function _setUserSession(user) {
    storageService.saveToSession(LOGGEDIN_USER_STORAGE_KEY, user);
    return user
}

function _clearUserSession() {
    storageService.removeFromSession(LOGGEDIN_USER_STORAGE_KEY);
}

function _getUserFromSession() {
    const user = storageService.loadFromSession(LOGGEDIN_USER_STORAGE_KEY);
    return user;
}