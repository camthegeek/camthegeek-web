import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import SinglePost from '../components/blog_single';

class Blog extends Component {
    state = {
        blog_id: this.props.match.params.id,
    }
    render() {
        return(
            <section className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - About</title>
                    <meta name="description" content="camthegeek.net" />
                </Helmet>
         
            <SinglePost blog_id={this.state.blog_id}/>

           </section>
        )
    }
}

export default Blog;