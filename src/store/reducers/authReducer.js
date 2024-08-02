const initialState = {
    user: null,
    record: null,
    isLogin: false,
    isSignUp: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isSignUp: true,
                isLogin: false,
                error: null,
            };

        case "SIGNUP_ERROR":
            return {
                ...state,
                error: action.payload,
                isSignUp: false,
                isLogin: false,
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isSignUp: false,
                error: null,
            };

        case "LOGIN_ERROR":
            return {
                ...state,
                error: action.payload,
                isLogin: false,
                isSignUp: false,
            };

        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: null,
                error: null,
                isLogin: false,
                isSignUp: false,
            };

        case "LOGOUT_ERROR":
            return {
                ...state,
                error: action.payload,
                isLogin: state.isLogin,
                isSignUp: state.isSignUp,
            };

        case "RECORD_UPDATED":
            return {
                ...state,
                record: action.payload
            };

        case "RECORD_ERROR":
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default authReducer;
