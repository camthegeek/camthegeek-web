import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/container';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Container fluid>
      <Row className="bg-light">
        <Container fixed>
          <Col md={12} id="header">
            <Header />
          </Col>
        </Container>
      </Row>
      <Row>
        <Col md={12} id="page-content-wrapper" className="min-vh-100">
          <Content />
        </Col>
      </Row>
    </Container>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);