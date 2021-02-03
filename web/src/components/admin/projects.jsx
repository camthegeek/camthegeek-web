// this module loads things for viewing.

import React, { Component } from "react";
import axios from 'axios';
import config from '../../config.json';
import AddProject from './project_add';
import { Link } from 'react-router-dom';
import Loading from '../loading'

class ViewProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
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
        axios.get('//' + config.api.url + ':' + config.api.port + '/api/projects')
            .then((projects) => {
                this.setState({
                    projects: projects.data,
                    loading: false
                })
            })

    }

    refreshprojects = () => {
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
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">projects list</h3>
                            <button onClick={() => this.showAdd()}>
                                Add projects
                            </button>
                            <button onClick={() => this.refreshprojects()}>
                                Refresh projects posts
                            </button>
                            {this.state.displayAdd &&
                                <div className="row addProject">
                                    <div className="col-12">
                                        <AddProject displayAdd={this.state.displayAdd} />
                                    </div>
                                </div>
                            }
                            <table>
                                <tbody>
                                    {this.state.projects.map((project, i) =>
                                        <tr key={i}>
                                            <td>{project.title}</td>
                                            <td>{project.featured_img}</td>
                                            <td><Link to={`/admin/project/${project.id}`}>Edit</Link></td>
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

export default ViewProjects;