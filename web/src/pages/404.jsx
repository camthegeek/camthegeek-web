import React, {Component} from "react";
import {Row, Col } from 'react-bootstrap';

class NotFound extends Component {
    render() {
        return(
            <Row>
                <Col md={12}>
                    <h4>Oops! Page not found!</h4>
                </Col>
            </Row>
               

        )
    }
}

export default NotFound;