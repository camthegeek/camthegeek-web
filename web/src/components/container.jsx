import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Blogs from '../pages/blogs';
import Blog from '../pages/blog';
import ProjectPage from '../pages/projects';
import Project from '../pages/project';
import LoginPage from '../pages/login';
import NotFound from '../pages/404';
import Admin from '../pages/admin';
import Cookies from 'js-cookie';

const RequireAuth = ({ children }) => {
    let userCookie = Cookies.get('ctg_web');
    if (userCookie) {
        return (children);
    } else {
       return (<Redirect to={'/login'} />);
    }
};

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: 0,
        }
    }
    
    render() {
        return (
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/blog' component={Blogs} />
                <Route exact path='/blog/:id' component={Blog} />
                <Route exact path='/projects' component={ProjectPage} />
                <Route exact path='/project/:id' component={Project} />
                <Route exact path='/login' component={LoginPage} />

                <Route exact path='/404' component={NotFound} />
                
                {window.location.pathname!=='/admin' &&  <Route component={NotFound} />}

                <RequireAuth>
                    <Route exact path='/admin' component={Admin} />
                </RequireAuth>   
            </Switch>
        );
    }
}

export default Content;