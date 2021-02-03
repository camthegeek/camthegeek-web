import React, { Component } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config.json';
import Loading from './loading';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true,
            limit: this.props.limit
        }
    }

    removeTags = (str) => {
        return str !== null || str !== '' ? str.replace(/(<([^>]+)>)/ig, '') : '';
    }

    componentDidMount() {
        axios.get('//' + config.api.url + ':' + config.api.port + '/api/projects')
            .then((projects) => {
                this.setState({
                    projects: projects.data,
                    loading: false
                })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <>
                    {this.state.projects.length < 1 &&
                        <h1>No projects available for viewing</h1>
                    }

                    {this.state.projects.length >= 1 &&
                        <>
                            <Row className="mt-2 mb-2">
                                <Col md={12}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Recent projects</Card.Title>
                                            <Row className="projects mt-2 mb-2">
                                                {this.state.projects.slice(0, `${this.state.limit === '' || this.state.limit == null ? '3' : this.state.limit }`).map((project, i) =>
                                                    <Col md={4}>
                                                        <a href={`/project/${project.id}`}>
                                                        <Card className="border-0 p-1">
                                                            <Card.Img className="featured_img_med shadow" variant="top" src={`/images/${project.featured_img}`} />
                                                                <span class="badge badge-view-project font-weight-normal">View project</span>
                                                        </Card>
                                                        </a>
                                                    </Col>
                                                )}
                                            </Row>
                                            {this.state.limit === '' || this.state.limit == null &&
                                            <Row>
                                                <Col md={12} className="text-center">
                                                    <a href='/projects'>
                                                        <span className="badge badge-success pl-3 pt-2 pr-3 pb-2">
                                                            View all projects
                                                        </span>
                                                    </a>
                                                </Col>
                                            </Row>
                                            }
                                            
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    }
                </>
            )
        }
    }
}

export default Projects;