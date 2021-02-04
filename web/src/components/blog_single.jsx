import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import config from '../config.json';
import Loading from './loading';
import parse from 'html-react-parser'; // TO BE USED ON INDIVIDUAL BLOG POST PAGE
import BlogPosts from './blog_posts';

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog_id: this.props.blog_id,
            post: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('//' + config.api.url + ':' + config.api.port + '/api/blog/' + this.state.blog_id)
            .then((blog) => {
                console.log(blog.data[0])
                this.setState({
                    post: blog.data[0],
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
                    {!this.state.post &&
                        <Redirect to="/404" />
                    }
                    {this.state.post &&
                        <>
                            <Helmet>
                                <meta charSet="utf-8" />
                                <title>camthegeek - {this.state.post.title}</title>
                                <meta name="description" content="camthegeek.net" />
                            </Helmet>
                            <Row className="mb-2 mt-2">
                                <Col md={12}>
                                    <Card className="text-white border-0">
                                        <Card.Img className="featured_img_large" variant="top" src={`/images/${this.state.post.featured_img}`} />
                                        <Card.ImgOverlay className="overlay-dark d-flex flex-column">
                                            <Card.Body>
                                                <h2>{this.state.post.title}</h2>
                                                <h6>Written: {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(`${this.state.post.timestamp}`)}</h6>
                                            </Card.Body>
                                        </Card.ImgOverlay>
                                    </Card>
                                    <Card className="shadow">
                                        <Card.Body>
                                            <Card.Text>
                                                {parse(this.state.post.body)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-2 mt-2">
                                <Col md={12}>
                                    <BlogPosts title="Latest posts" />
                                </Col>
                            </Row>
                        </>
                    }
                </>
            )
        }
    }
}

export default SinglePost;