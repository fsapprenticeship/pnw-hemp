import React, { Component } from "react";

import sanity from "../lib/sanity";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default class LinkComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            type: "",
            url: "",
            fetching: true
        };
    }

    async componentDidMount() {
        const contentId = this.props.match.params.id;
        const query = `*[_id == '${contentId}']{type, _type, text, title, url}[0]`;
        const data = await sanity.fetch(query);
        this.setState({
            title: data.title,
            type: data.type,
            url: data.url,
            fetching: false
        });
        console.log(data);
    }

    renderData() {
        return (
            <Paper className={styles.root} elevation={1}>
                <Typography component="h2">{this.state.title}</Typography>
                <Button href={this.state.url} target="_blank" size="small">
                    View {this.state.type}
                </Button>
            </Paper>
        );
    }

    render() {
        return (
            <TabContainer>
                {!this.state.fetching ? this.renderData() : "Loading"}
            </TabContainer>
        );
    }
}
