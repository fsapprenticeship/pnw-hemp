import React from "react";

import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    }
});

export default ({ handleSearch }) => {
    return (
        <form className={styles.container} noValidate autoComplete="off">
            <TextField
                id="filtered"
                label="Search Directories"
                type="search"
                className={styles.textField}
                margin="normal"
                onChange={handleSearch}
            />
        </form>
    );
};
