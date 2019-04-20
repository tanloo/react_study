import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import routes from "./routes";


ReactDOM.render(
    <Provider store={createStore()}>
        {routes}
    </Provider>,
    document.getElementById("root")
);