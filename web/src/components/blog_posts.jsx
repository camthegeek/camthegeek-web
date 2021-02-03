import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import config from '../config.json';
import Loading from './loading';
// import parse from 'html-react-parser'; TO BE USED ON INDIVIDUAL BLOG POST PAGE

class BlogPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            loading: true,
            title: this.props.title,
            limit: this.props.limit
        }
    }

    removeTags = (str) => {
        return str !== null || str !== '' ? str.replace(/&nbsp;/g, ' ').replace(/(<([^>]+)>)/ig, '') : '';
    }

    truncate = (str) => {
        return str.length > 36 ? str.substring(0, 33) + "..." : str;
    }

    componentDidMount() {
        axios.get('//' + config.api.url + ':' + config.api.port + '/api/blogs')
            .then((blogs) => {
                this.setState({
                    blogs: blogs.data,
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
                    {this.state.blogs.length < 1 &&
                        <h1>No blog posts are available.</h1>
                    }

                    {this.state.blogs.length >= 1 &&
                        <>
                            <Row className="mb-2 mt-2">
                                <Col md={12}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {this.state.title === '' || this.state.title === null ? "Thoughts" : this.state.title }
                                            </Card.Title>
                                            <Row className="blogs mb-2 mt-2">
                                                {this.state.blogs.slice(0, `${this.state.limit === '' || this.state.limit == null ? '3' : this.state.limit }`).map((blog, i) =>
                                                    <Col md={4} sm={12} className="mt-2">
                                                        <a href={`/blog/${blog.id}`}>
                                                        <Card className="text-white text-center">
                                                            <Card.Img className="featured_img_small" variant="top" src={`/images/${blog.featured_img}`} />
                                                            <Card.ImgOverlay className="overlay-dark d-flex flex-column">
                                                                <Card.Body>
                                                                    <Card.Title className="mb-0">
                                                                        {blog.title}
                                                                    </Card.Title>
                                                                    <Card.Text className="m-0" style={{ fontSize: '75%' }} >
                                                                        {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(`${blog.timestamp}`)}
                                                                    </Card.Text>
                                                                    <Card.Text>
                                                                        {this.truncate(this.removeTags(`${blog.body}`))}
                                                                    </Card.Text>
                                                                    <span class="badge badge-danger font-weight-normal mr-2">Read more</span>
                                                                </Card.Body>
                                                            </Card.ImgOverlay>
                                                        </Card>
                                                        </a>
                                                    </Col>
                                                )}
                                            </Row>
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

export default BlogPosts;