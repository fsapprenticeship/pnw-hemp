//Gather User Data
export const setUsername = (username = "") => ({
    type: "SET_USERNAME",
    username
});

export const setPassword = (password = "") => ({
    type: "SET_PASSWORD",
    password
});

export const setConfirmPassword = (password = "") => ({
    type: "SET_CONFIRM_PASSWORD",
    password
});

export const setEmail = (email = "") => ({
    type: "SET_EMAIL",
    email
});
