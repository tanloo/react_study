import React from 'react';
import {connect} from "react-redux";
import styles from "app.css";

class App extends React.Component {
    render() {
        const {
            children
        } = this.props;

        return (
            <div className={styles.app}>
                {children}
            </div>
        )
    }
}

export default connect(App);