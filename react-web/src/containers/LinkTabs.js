import React, { Component } from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Add from '../components/NewResourceButton';
import FolderContainers from "../components/FolderContainers";
import { Authenticator }  from "aws-amplify-react";
import NewResource from "../containers/NewResource";
import { Link } from "react-router-dom";


import {TAB_FSA, TAB_CITY_GUIDE, TAB_GETTING_PAID} from "../common/constants"
import store from '../store/configureStore';
import {changeTab} from "../actions/tab"

import {
    fullStackApprenticeship,
    cityByCity,
    findingWork
} from "../directories";
// import AuthSignup from './AuthSignup';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

const mapStateToProps = state => ({
    authState: state.authState.authState
})

class LinkTabs extends Component {

    constructor(props) {
        super(props);
        
        this.handleTabChange = this.handleTabChange.bind(this);

        this.state = {
          activeTab: store.getState().tab.activeTab,
          fsaFolders: [],
          cityFolders: [],
          workFolders: [],
          // authState : ''
        };
    }

    handleTabChange = (event, activeTab) => {
      store.dispatch(changeTab(activeTab))
      this.setState({ activeTab });
    };

    reduceFolder = folder =>
        folder.reduce(
            (acc, next) => acc.concat({ name: next.name, type: next.type }),
            []
        );

    // changeAuthState = nextAuthState => {
    //     this.setState({ authState: nextAuthState })
    // }

    render() {
        const signUpConfig = {
            signUpFields: [
                {
                    label: 'First Name',
                    key: 'name',
                    required: true,
                    placeholder: 'Mikhael',
                    type: 'email',
                    displayOrder: 2
                  },
                  {
                    label: 'Family Name',
                    key: 'family_name',
                    required: true,
                    placeholder: 'Ben David',
                    type: 'email',
                    displayOrder: 3
                  },
                {
                    label: 'Email',
                    key: 'email',
                    required: true,
                    placeholder: 'Email',
                    type: 'email',
                    displayOrder: 4
                  },
                  {
                    label: 'Password',
                    key: 'password',
                    required: true,
                    placeholder: 'Password',
                    type: 'password',
                    displayOrder: 5
                  },
                  
            ],
            hiddenDefaults: [ "phone_number"]
        }
        const { classes, authState } = this.props;
        const activeTab = this.state.activeTab;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={activeTab} onChange={this.handleTabChange}>
                    <Tab label="Hemp Guide" />
                    <Tab label="Bulletin Board" />
                    <Tab label="Make Bulletin Post" />
                    </Tabs>
                </AppBar>
                {/* <AuthSignup changeAuthState={this.props.changeAuthState} /> */}
                {activeTab === TAB_FSA && (
                    <React.Fragment>
                        <FolderContainers
                            folders={fullStackApprenticeship.reduce(
                                (acc, next) =>
                                    acc.concat({
                                        name: next.name,
                                        type: next.type
                                    }),
                                []
                            )}
                        />
                    </React.Fragment>
                )}
                {activeTab === TAB_CITY_GUIDE && (
                    <React.Fragment>
                        <Authenticator signUpConfig={signUpConfig} />
                        <Link to="/new">
                            <button>New Post</button>
                        </Link>
                    </React.Fragment>
                )
                }
                {activeTab === TAB_GETTING_PAID && (
                    <React.Fragment>
                        <Authenticator signUpConfig={signUpConfig} />
                            <NewResource />
                </React.Fragment>
                )}
               {/* <Add /> */}

                {/* { authState === 'signedIn' ? <Add /> : null } */}
           </div>
        );
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(LinkTabs));
