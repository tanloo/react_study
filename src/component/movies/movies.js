import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import movies from "../../movies";
import styles from 'movies.css';

const {fetchMoviesActionCreator} = require('../../modules/movies');
class Movies extends React.Component {
  /*  componentWillMount() {
        this.props.fetchMovies(movies);
    }*/

    componentDidMount() {
        fetch('/src/movies.json', {method: 'GET'}).then((response) => {
            return response.json()
        }).then((movies) => {
            this.props.fetchMovies(movies);
        })
    }

    render() {
        const {children, movies, params} = this.props;
        return (
            <div className={styles.movies}>
                <div className={params.id ? styles.listHidden : styles.list}>
                    {movies.map((movie, index) => (
                        <Link to={`/movies/${index + 1}`} key={index}>
                            <div className={styles.movie} style={{backgroundImage: `url(${movie.cover})`}}/>
                        </Link>
                    ))}
                </div>
                {children}
            </div>
        )
    }
}

export default connect(({movies}) => ({
    movies: movies.all
}), {fetchMovies: fetchMoviesActionCreator})(Movies);