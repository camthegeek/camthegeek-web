import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import config from '../config.json';
import Loading from './loading';
import parse from 'html-react-parser';
// import BlogPosts from './blog_posts'; // to be replaced with project list at bottom of pages

class SingleProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: this.props.project_id,
            project: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('//' + config.api.url + ':' + config.api.port + '/api/project/' + this.state.project_id)
            .then((project) => {
                this.setState({
                    project: project.data[0],
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
                    {!this.state.project &&
                        <Redirect to="/404" />
                    }
                    {this.state.project &&
                        <>
                            <Helmet>
                                <meta charSet="utf-8" />
                                <title>camthegeek - {this.state.project.title}</title>
                                <meta name="description" content="camthegeek.net" />
                            </Helmet>
                            <Row className="mb-2 mt-2">
                                <Col md={12}>
                                    <Card className="border-0">
                                        <Card.Body>
                                            <h2>{this.state.project.title}</h2>
                                            <Card.Img variant="top" src={`/images/${this.state.project.featured_img}`} />
                                            <Card.Text>
                                                {this.state.project.body ? parse(this.state.project.body) : ''}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-2 mt-2">
                                <Col md={12}>

                                </Col>
                            </Row>
                        </>
                    }
                </>
            )
        }
    }
}

export default SingleProject;