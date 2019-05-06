import React from "react";
import Amplify from "aws-amplify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import Routes from "./Routes";
import awsmobile from "./aws-exports";
import Footer from "./components/Footer";
import TopNavbar from "./components/TopNavbar"

import "./App.css";
require("typeface-quicksand");

Amplify.configure(awsmobile);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontSize: 16,
        fontFamily: "'Quicksand', sans-serif;"
    },
    palette: {
        primary: {
            main: '#4caf50'
        }
    }
});

class App extends React.Component {
    componentDidMount() {
    //     this.props.dispatch(thunkCurrentAuthenticatedUser());
    }

    // componentDidMount() {
        // const { history } = this.props;
        // console.log('history', history);
    // }

    render() {
        const childProps = {
            authState: this.props.authState
        }
        
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    {/* <TopNavbar /> */}
                    <Routes childProps={childProps} />
                    {/* <Footer /> */}
                </CssBaseline>
            </MuiThemeProvider>
        );
    }

    handleLogout = () => {};
}

const mapStateToProps = state => ({
    authState: state.authState.authState
});

export default connect(mapStateToProps)(App);
// export default withRouter(App);