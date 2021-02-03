import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import BlogPosts from '../components/blog_posts';

class Blogs extends Component {
    render() {
        return (
            <Container fixed>
                <Row className="mt-4">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>camthegeek - Blog</title>
                        <meta name="description" content="camthegeek.net" />
                    </Helmet>
                    <Col md={12}>
                        <BlogPosts limit="99" />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Blogs;