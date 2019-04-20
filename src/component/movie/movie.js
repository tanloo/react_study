import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import styles from 'movie.css';

const {fetchMovieActionCreator} = require('../../modules/movies');
class Movie extends React.Component {
    componentWillMount() {
        this.props.fetchMovie(this.props.params.id);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.fetchMovie(nextProps.param.id);
        }
    }
    render() {
        const {movie = {starring: []}} = this.props;
        return (
            <div className={styles.movie}
                 style={{backgroundImage: `linear-gradient(90deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0.625) 100%),url(${movie.cover})`}}>
                <div className={styles.cover} style={{backgroundImage: `url(${movie.title})`}}/>
                <div className={styles.description}>
                    <div className={styles.title}>{movie.title}</div>
                    <div className={styles.year}>{movie.year}</div>
                    <div className={styles.starring}>
                        {movie.starring.map((actor = {}, index) => (
                            <div
                                key={index}
                                className={styles.actor}>
                                {actor.name}
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/movies" className={styles.closeButton}>后退</Link>
            </div>
        );
    }

}

export default connect(({movies}) => ({
    movie: movies.current
}), {
    fetchMovie: fetchMovieActionCreator
})(Movie);