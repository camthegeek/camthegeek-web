import React, {Component} from "react";
import { Helmet } from 'react-helmet';
import Login from '../components/login';

class Admin extends Component {
    render() {
        return(
            <section className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>camthegeek - Admin Dashboard</title>
                    <meta name="description" content="REwards portal" />
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

export default Admin;