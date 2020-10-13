import { combineReducers } from "redux";
import {
        Books,
    } from './booksReducer';
import Authors from './authorsReducer';
import {
        AccessToken,
        CurrentUser
    } from './userReducer';

const allReducers = combineReducers({
    authors:Authors,
    books: Books,
    accessToken: AccessToken,
    currentUser: CurrentUser
});

export default allReducers;