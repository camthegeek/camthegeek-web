import React, { Component } from 'react';

class Loading extends Component {
    render() {
    return (
    <div className="row">
        <div className="col-12">
            <h1>Loading . . .</h1>
            <img alt="loading cat" src="/images/nyancat.gif"/>
        </div>
    </div>
    )
    }
}

export default Loading;