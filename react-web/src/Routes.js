import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/configureStore";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
// import Home from "./containers/Home";
import LinkTabs from "./containers/LinkTabs";
import LinkComponent from "./components/LinkComponent";
import ToolsContainer from "./components/ToolsContainer";
import NewResource from "./containers/NewResource";
import ProcessResource from "./containers/ProcessResource";

export default ({ childProps }) => (
    <ConnectedRouter history={history}>
        <Switch>
            <AppliedRoute path="/" exact component={LinkTabs}/>
            <AppliedRoute path="/link/:id" component={LinkComponent} />
            <AppliedRoute path="/tool/:schema" component={ToolsContainer} />
            <AppliedRoute path='/review' exact component={ProcessResource} />
            <AppliedRoute path='/resource/new' exact component={NewResource} props={childProps} /> 
        </Switch>
    </ConnectedRouter>
);
