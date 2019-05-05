import React, { Component } from 'react';
import sanity from '../lib/sanity'
import ToolCard from './ToolCard'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchComponent from './SearchComponent';
import Add from '../components/NewResourceButton';
import { fullStackApprenticeship } from "../directories.js"

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import store from '../store/configureStore';
import {changeTab} from "../actions/tab"
import { Redirect } from 'react-router'


const styles = {
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function TabContainer(props) {

    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


export default class ToolsContainer extends Component {
    constructor() {
        super()
        this.state = {
          activeTab: store.getState().tab.activeTab,
          redirect: false,
          links: [],
          filteredLinks : [], 
          schema: {}
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    async componentDidMount() {
        const query = `*[_type == '${this.props.match.params.schema}']{type, _type, text, title, priority, url, _id}`
        const links = await sanity.fetch(query);
        this.setState({ links })
    }

    handleTabChange = (event, activeTab) => {
      store.dispatch(changeTab(activeTab))
      this.setState({redirect: true});
    };

    handleSearch =  event => {
            const searchedLinks = this.state.links.filter(item => {
                const normalizedSearch = event.target.value.replace(/[^A-Za-z0-9]+/gi, '')
                const regex = new RegExp(normalizedSearch, 'i');
                return item.title.match(regex) || false
            });
            this.setState({
                filteredLinks: searchedLinks
            })
        };

    render() {
        let linksToDisplay;
        this.state.filteredLinks.length < 1 ? linksToDisplay = this.state.links : linksToDisplay = this.state.filteredLinks;
        const schema = window.location.pathname.split('/')[2];
        const activeTab = this.state.activeTab;
        // const description = fullStackApprenticeship.find(o => o.type === schema);

        if( this.state.redirect ) 
          return <Redirect to='/'/>;
        

        return (
          <React.Fragment>
            <AppBar position="static">
                <Tabs value={activeTab} onChange={this.handleTabChange}>
                    <Tab label="Hemp Guide" />
                    {/* <Tab label="City Guide" /> */}
                    <Tab label="Bulletin Board" />
                </Tabs>
              </AppBar>
            <TabContainer>
                <SearchComponent handleSearch={this.handleSearch} />
                {/* <h3>{description.description}</h3> */}
                <Grid container className={styles.root} spacing={16}>
                    <ToolCard links={linksToDisplay} />
                </Grid>
                {/* <Add /> */}
            </TabContainer>
          </React.Fragment>
        );

    }

}