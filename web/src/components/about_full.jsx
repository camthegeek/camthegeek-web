import React, { Component } from "react";
import { Row, Col, Card, Container } from 'react-bootstrap';

class AboutBox extends Component {
    render() {
        return (
            <Container fixed>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Cameron "camthegeek" Chadwell is a web developer from a small town in Tennessee. Currently, he
                                is employed as a Web Developer / Program Manager for <a href="https://mrscorp.com" rel="noreferrer" target="_blank">Mission Ready Solutions, Inc.</a>
                                His biggest project to date is developing a personal protective equipment store for Lyft which was aptly
                                named <a href="https://lyft-store.com" rel="noreferrer" target="_blank">Lyft Store</a>. He also enjoys developing for cryptocurrency projects such as the privacy-oriented
                                project, <a href="https://getmasari.org" rel="noreferrer" target="_blank">Masari</a>, as well as the file storage project, <a rel="noreferrer" href="https://scpri.me" target="_blank">ScPrime</a>.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AboutBox;