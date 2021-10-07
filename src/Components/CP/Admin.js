import React from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import NewBrands from './NewBrands';
import Brands from './Brands';
import {Smartphone} from "./Smartphone";
import Dashboard from './Dashboard';
import Tablet from "./Tablet";
import {Laptop} from "./Laptop";
import Help from './Help';
import Analytics from './Analytics';
import TV from './TV';
import Accessories from './Accessories';
import {BrowserRouter as Router, Route, Switch, NavLink, Link, Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import FormControl from 'react-bootstrap/FormControl';
import {Container, Breadcrumb, Col, Row, InputGroup} from 'react-bootstrap';
import firebaseDb from '../../firebase';
import {getAnalytics} from "../../firebase-analytics";
import '../../Style/cp.css';
import PageNotFound from '../404';


class Admin extends React.Component {

  componentDidMount () {
    getAnalytics.logEvent('notification_received');
  }

  render () {
    return (
        <div className='cp-admin-wrapper'>
            <HelmetProvider>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossorigin="anonymous"
                    />
                </Helmet>
                <Router basename="/admin">
                    <Navbar style={{borderBottom: '3px solid lightblue'}} expand='lg'>
                        <Navbar.Brand href='/admin'>AdminCP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={NavLink} exact to='/'>Dashboard</Nav.Link>
                                <Nav.Link as={NavLink} to='/brands'>Brands</Nav.Link>
                                <NavDropdown title="Products" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to='/smartphone'>Smartphone</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/tablet'>Tablet</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/laptop'>Laptop</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/tv'>TV</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/accessories'>Accessories</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/help'>Help</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={NavLink} to='/analytics'>Analytics</Nav.Link>
                            </Nav>
                            <Form inline>
                                <Form.Control type="text" value='' name="search-bar" placeholder="Search..." />
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>

                    <Container fluid style={{marginTop: '20px'}}>
                        
                            <Switch>

                                <Route exact path="/">
                                    <Dashboard />
                                </Route>

                                <Route exact path="/brands">

                                    <Brands />
                                </Route>

                                <Route path="/smartphone">
                                    
                                    <Smartphone />
                                </Route>

                                <Route path="/tablet">
                                    
                                    <Tablet />
                                </Route>

                                <Route path="/laptop">
                                    
                                    <Laptop />
                                </Route>

                                <Route path="/tv">
                                    
                                    <TV />
                                </Route>

                                <Route path="/accessories">
                                    
                                    <Accessories />
                                </Route>

                                <Route path="/help">
                                    
                                    <Help />
                                </Route>

                                <Route path='/analytics'>
                                  <Analytics />
                                </Route>

                                <Route path="*">
                                    <PageNotFound />
                                </Route>

                            </Switch>
                        
                    </Container>
                </Router>
            </HelmetProvider>
        </div>
    ); 
  }
}

export default Admin;