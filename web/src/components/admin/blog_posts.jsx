// this module loads things for viewing.

import React, { Component } from "react";
import axios from 'axios';
import config from '../../config.json';
import AddBlog from './blog_add';
import { Link } from 'react-router-dom';
import Loading from '../loading'

class ViewBlogPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            displayAdd: false,
            loading: true
        }
    }

    showAdd = () => {
        this.setState((currentState) => ({
            displayAdd: !currentState.displayAdd,
        }));
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

    refreshblogs = () => {
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
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">blogs list</h3>
                            <button onClick={() => this.showAdd()}>
                                Add blog post
                            </button>
                            <button onClick={() => this.refreshblogs()}>
                                Refresh BLog posts
                            </button>
                            {this.state.displayAdd &&
                                <div className="row addBlogPost">
                                    <div className="col-12">
                                        <AddBlog displayAdd={this.state.displayAdd} />
                                    </div>
                                </div>
                            }
                            <table>
                                <tbody>
                                    {this.state.blogs.map((blog, i) =>
                                        <tr key={i}>
                                            <td>{blog.title}</td>
                                            <td>{blog.body}</td>
                                            <td>{blog.img}</td>
                                            <td><Link to={`/admin/blog/${blog.id}`}>Edit</Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default ViewBlogPosts;