import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import ViewBlogPosts from './blog_posts';
import ViewProjects from './projects';

class AdminDashboard extends Component {
    render() {
        return (
            <Container fixed>
            <Row>
                <Col md={12}>
                    <ViewBlogPosts/>
                    
                </Col>
            </Row>
             <Row>
             <Col md={12}>
                <ViewProjects/>
            </Col>
            </Row>
            </Container>
        )
    }
}

export default AdminDashboard;