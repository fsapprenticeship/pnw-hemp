import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// import { thunkSignOut } from "../thunks/auth";

const styles = {
    grow: {
        flexGrow: 1
    }
};
class TopNavbar extends React.Component {
    render() {
        const {
            classes,
            routeHome,
            routeSignup,
            userToken,
            handleSignOut,
            suggest
        } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h6" color="inherit">
                        <Button color="inherit" onClick={() => routeHome()}>
                            #fsahub
                        </Button>
                    </Typography>
                    <div className={classes.grow} />
                    {userToken
                        ? [
                            //   <Button
                            //       key={0}
                            //       onClick={() => routeTyping()}
                            //       color="inherit"
                            //   >
                            //       Knowledge Base
                            //   </Button>,
                              <Button
                                  key={1}
                                  color="inherit"
                                  onClick={() => handleSignOut()}
                              >
                                  Logout
                              </Button>
                          ]
                        : [
                            //    <Button
                            //        key={1}
                            //        color="inherit"
                            //        onClick={() => routeSignup()}
                            //    >
                            //        Register/Login
                            //    </Button>,
                            //   <Button
                            //       key={2}
                            //       color="inherit"
                            //       onClick={() => routePayment()}
                            //   >
                            //       Payments
                            //   </Button>,
                            //   IconButton for the account circle
                              <Button
                                  key={3}
                                  color="inherit"
                                  onClick={() => suggest()}
                              >
                                  {/* <AccountCircleIcon /> */}
                                  + Resource
                              </Button>
                          ]}
                </Toolbar>
            </AppBar>
        );
    }
}

TopNavbar.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            routeHome: () => push("/"),
            routeSignup: () => push("/authsignup"),
            routePayment: () => push("/payments"),
            handleSignOut: () => push('/'),
            suggest: () => push("/resource/new")
        },
        dispatch
    );
};

const mapStateToProps = state => ({
    userToken: state.auth.userToken
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopNavbar));
