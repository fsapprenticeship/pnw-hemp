import React from "react";
import DirectoryCard from "../components/DirectoryCard";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import SearchComponent from './SearchComponent';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default ({ folders }) => {
    return (
        <TabContainer>
            <Grid container spacing={24}>
                <DirectoryCard folders={folders} />
            </Grid>
        </TabContainer>
    );
};
