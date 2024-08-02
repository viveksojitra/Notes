/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../Firebaseconfig";

const signUpSuccess = (user) => ({
    type: "SIGNUP_SUCCESS",
    payload: user
});

const signUpError = (error) => ({
    type: "SIGNUP_ERROR",
    payload: error
});

const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

const loginError = (error) => ({
    type: "LOGIN_ERROR",
    payload: error
});

const logOutSuccess = () => ({
    type: "LOGOUT_SUCCESS"
});

const logOutError = (error) => ({
    type: "LOGOUT_ERROR",
    payload: error
});

// Create New User
export const signUpAsync = (data) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCr) => {
                dispatch(signUpSuccess(userCr.user));
            })
            .catch((error) => {
                dispatch(signUpError(error.message));
            });
    };
};

// Login With Existing User
export const loginAsync = (data) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCr) => {
                dispatch(loginSuccess(userCr.user));
            })
            .catch((error) => {
                dispatch(loginError(error.message));
            });
    };
};

// SignIn Through Google
const googleProvider = new GoogleAuthProvider();  // Reusable instance
export const googleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleProvider)
            .then((userCr) => {
                dispatch(loginSuccess(userCr.user));
            })
            .catch((error) => {
                dispatch(loginError(error.message));
            });
    };
};

// SignOut a User
export const signOutUser = () => {
    return (dispatch) => {
        signOut(auth)
            .then(() => {
                dispatch(logOutSuccess());
            })
            .catch((error) => {
                dispatch(logOutError(error.message));
            });
    };
};
