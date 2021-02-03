import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import { Row, Col, Container } from 'react-bootstrap';
import AboutBox from '../components/about_full';

class About extends Component {
    render() {
        return (
            <Container fixed>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - About</title>
                    <meta name="description" content="camthegeek.net" />
                </Helmet>
                <Row className="mt-4">
                    <Col md={12}>
                        <AboutBox />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default About;