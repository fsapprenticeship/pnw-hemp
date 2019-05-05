import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;

// We have created this component so that we can apply the childProps
// we created in the Login component to the child components that App
// component is going to render.
// This creates a component where the child component that it renders contains
// the passed in props. To use this component, we are going to include it in the routes where we
// need to have the childProps passed in
