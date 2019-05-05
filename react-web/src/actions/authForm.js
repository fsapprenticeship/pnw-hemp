export const signInForm = () => ({
    type: "SIGN_IN"
});
export const setConfirmationCode = (confirmationCode = "") => {
    return {
        type: "SET_CONFIRMATION_CODE",
        confirmationCode
    };
};

export const signUpForm = () => ({
    type: "SIGN_UP"
});
export const confirmSignUpForm = () => ({
    type: "CONFIRM_SIGN_UP"
});
export const signInPasswordErrorForm = () => ({
    type: "SIGN_IN_PASSWORD_ERROR"
});
export const forgotPasswordForm = () => ({
    type: "FORGOT_PASSWORD"
});
export const userNotFoundForm = () => ({
    type: "USER_NOT_FOUND"
});
