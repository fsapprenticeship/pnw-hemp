const userReducerDefaultState = {
    username: "",
    password: "",
    email: ""
};

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                username: action.username
            };
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.password
            };
        case "SET_CONFIRM_PASSWORD":
            return {
                ...state,
                confirmPassword: action.password
            };
        case "SET_EMAIL":
            return {
                ...state,
                email: action.email
            };
        default:
            return state;
    }
};
