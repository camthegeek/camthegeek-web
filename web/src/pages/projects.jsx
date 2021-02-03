import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import Projects from '../components/projects';

class ProjectPage extends Component {
    render() {
        return(
            <section className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - Projects</title>
                    <meta name="description" content="camthegeek.net" />
                </Helmet>
         
            <Projects limit="99"/>

           </section>
        )
    }
}

export default ProjectPage;