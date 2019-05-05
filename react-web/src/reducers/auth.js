const authReducerDefaultState = {
    isLoading: false,
    userToken: null,
    isAuthenticated: false
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case "WAIT_A_SEC":
            return {
                ...state,
                isLoading: true
            };
        case "DONE_LOADING":
            return {
                ...state,
                isLoading: false
            };
        case "CURRENT_AUTHENTICATED_USER":
            return {
                ...state,
                userToken: action.userToken,
                isAuthenticated: true,
                isLoading: false
            };
        case "USER_NOT_AUTHENTICATED":
            return {
                ...state,
                userToken: null,
                isAuthenticated: false,
                isLoading: false
            };
        case "SIGN_IN_SUCCESS":
            return {
                ...state,
                userToken: action.body,
                isLoading: false
            };
        case "SIGN_IN_PASSWORD_ERROR":
            return {
                ...state,
                userToken: null,
                isLoading: false
            };
        default:
            return { ...state };
    }
};
