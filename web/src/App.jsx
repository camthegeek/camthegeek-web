import React, {Component} from 'react';
import './styles/App.css';
import Container from './components/container';
import { Helmet } from 'react-helmet';

class App extends Component {
  render() { 
      return (
      <div className="App flex-fill d-flex flex-column min-vh-100">
        <Helmet>
          <meta charSet="utf-8" />
          <title>camthegeek</title>
        </Helmet>

        <Container/>
    </div>
  );
}
}
export default App;
