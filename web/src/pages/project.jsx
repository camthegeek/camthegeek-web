import React, { Component } from "react";
import SingleProject from '../components/project_single';

class Project extends Component {
    state = {
        project_id: this.props.match.params.id,
    }
    render() {
        return(
            <section className="container">        
                <SingleProject project_id={this.state.project_id}/>
           </section>
        )
    }
}

export default Project;