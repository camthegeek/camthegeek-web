import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import SingleProject from '../components/project_single';

class Project extends Component {
    state = {
        project_id: this.props.match.params.id,
    }
    render() {
        return(
            <section className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - About</title>
                    <meta name="description" content="camthegeek.net" />
                </Helmet>
         
            <SingleProject project_id={this.state.project_id}/>

           </section>
        )
    }
}

export default Project;