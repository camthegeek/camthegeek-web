import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import AdminDashboard from './admin/admindashboard';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: '',
            phone: ''
        }
    }

    logIn = (e) => {
        e.preventDefault();
        if (e) e.preventDefault();
        let form = e.target;
        let username = form.elements.username.value;
        let password = form.elements.password.value
        axios.post('//' + config.api.url + ':' + config.api.port + '/api/login', {
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response);
                if (response.data.success === 1) {
                    this.setState((currentState) => ({
                        success: !currentState.success
                    }));
                    let userData = 'letsgooutwithabang:$:'+response.data.id;
                    Cookies.set('ctg_web', userData, { expires: 7 });
                } else {
                    this.setState({
                        error: response.data.error,
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    doLoginRefresh = () => {
        setTimeout(() => {
            window.location.reload(false);
          }, 5000)
    }

    render() {
        let loggedStatus = Cookies.get('ctg_web');
        return (
            <>
                {!loggedStatus &&
                    <div className="card-body">
                        {this.state.error &&
                            <div className="error">
                                <p className="text-danger">{this.state.error}</p>
                            </div>
                        }
                        {!this.state.success &&
                            <>
                            <h3 className="card-title">Log in</h3>
                            <Form onSubmit={this.logIn}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" />
                                </Form.Group>

                                <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            </>
                        }
                        {this.state.success && 
                         <>
                            <h2>You have logged in successfully</h2>
                            <p>Redirecting you in 5 seconds. . . </p>
                            {this.doLoginRefresh()}
                        </>
                        }
            
                </div>
                }
                {loggedStatus &&
                    // render home page here
                    <AdminDashboard/>
                }
            </>
        )
    }
}
export default Login;