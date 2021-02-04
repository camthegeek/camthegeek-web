import React, { Component } from "react";
import SinglePost from '../components/blog_single';

class Blog extends Component {
    state = {
        blog_id: this.props.match.params.id,
    }
    render() {
        return(
            <section className="container">       
            <SinglePost blog_id={this.state.blog_id}/>

           </section>
        )
    }
}

export default Blog;