import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import AboutMini from '../components/about_mini';
import BlogPosts from '../components/blog_posts';
import Projects from '../components/projects';
import { Row, Col, Container } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (

            <Container fixed>
                <Row>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>camthegeek - Home</title>
                        <meta name="description" content="camthegeek.net" />
                    </Helmet>
                    <Col md={12}>
                        <AboutMini />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <BlogPosts />
                    </Col></Row>
                <Row>
                    <Col md={12}>
                        <Projects />
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Home;