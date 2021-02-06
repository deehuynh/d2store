import React from 'react';
import {
  Row, Col, Card, DropdownButton, ButtonGroup, Dropdown, Badge, Modal, Button, Tab,
  Nav,
  Form,
  Container, Jumbotron
} from 'react-bootstrap';
import BG from '../../images/bg1.gif';
import {
  PhoneFill
} from 'react-bootstrap-icons';

function Dashboard () {
  return (
    <Container fluid style={{padding: 0}}>
      <Row>
        <Col xs='12' md='5'>
            <div className='cp-bg'>
              <h5>
                <span style={{color: '#606060'}}>Welcome to</span> ADMIN CONTROL PANEL
              </h5>
              <h6>
                Have a beautiful day!
              </h6>
            </div>
        </Col>

        <Col xs='12' md='7'>
          <div>
            <img src={BG} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function DBTitle (props) {
  return (
    <div style={{
      fontSize: '18px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
    }}>
      {props.children}
    </div>
  );
}

export default Dashboard;