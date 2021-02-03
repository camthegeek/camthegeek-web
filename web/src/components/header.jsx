import React, { Component } from 'react';
//import Cookies from 'js-cookie';

class Header extends Component {

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
          <img  src="/images/ctg_2021.png" width="59" height="59" className="d-inline-block align-top" alt="" />
            <h1>camthegeek</h1>
          </a>
        </nav>
      </>
    )
  }
}


export default Header;