import React from "react";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import "./styles/LoadingButton.css";

export default ({
    isLoading,
    text,
    loadingText,
    disabled = false,
    variant = "text",
    ...props
}) => (
    <Button
        type="submit"
        variant={variant}
        fullWidth
        className="LoadingButton"
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading && !disabled && <AutorenewIcon className="loading" />}
        {!isLoading ? text : loadingText}
    </Button>
);
