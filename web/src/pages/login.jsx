import React, {Component} from "react";
import { Helmet } from 'react-helmet';
import Login from '../components/login';

class LoginPage extends Component {
    render() {
        return(
            <section className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - Login</title>
                    <meta name="description" content="Log in to camthegeek" />
                </Helmet>
                <div className="row">
                    <div className="col-12">
                        <Login/>
                    </div>
                </div>
            </section>
        )
    }
}

export default LoginPage;