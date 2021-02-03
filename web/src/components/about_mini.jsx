import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap';

class AboutMini extends Component {
    render() {
        return (
            <Row>
                <Col md={12} className="mt-4 mb-2">
                    <Card className="bg-light border-light rounded">
                        <Card.Body>
                            <Card.Text>
                                Cameron "camthegeek" Chadwell is a web developer from a small town in Tennessee. Currently, he
                                is employed as a Web Developer / Program Manager for Mission Ready Solutions, Inc. His biggest
                                project to date is developing personal protective equipment store for Lyft which was aptly named
                                Lyft Store. He also enjoys developing for cryptocurrency projects such as the privacy-oriented
                                project, Masari, as well as the file storage project, ScPrime.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default AboutMini;