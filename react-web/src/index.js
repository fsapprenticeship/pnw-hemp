import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./store/configureStore";

import App from "./App";
import "./index.css";

// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
