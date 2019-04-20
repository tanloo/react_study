import React from 'react';
import {Route,Switch} from "react-router";
import App from './component/app/app';
import Movies from './component/movies/movies';
import Movie from './component/movie/movie';

export default (
    <Switch>
        <Route path="/" exact component={App}/>;
        <Route path="/movies" component={Movies}/>
        <Route path="/movies/:id" component={Movie}/>
    </Switch>
)