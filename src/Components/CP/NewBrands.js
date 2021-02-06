import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, Table, ListGroup, FormGroup} from 'react-bootstrap';
import fireDb from '../../firebase';

function NewBrands () {
    const brands = {
      name: '',
      image: ''
    };

    const _kind = [
        {label: 'Smartphone', isChecked: false},
        {label: 'Tablet', isChecked: false },
        {label: 'Laptop', isChecked: false },
        {label: 'TV', isChecked: false },
        {label: 'Accessories', isChecked: false },
    ];

    const [kind, setKind] = useState({});

    const [state, setState] = useState(brands);

    const [brandOf, setBrandOf] = useState([]);

    function handleChangeState (e) {
        setState({...state, [e.target.name]: e.target.value})
    }

    const checkbox = [];
    _kind.forEach((item, index)=>{
      checkbox.push(
        <Form.Check
          key={index} type="checkbox" inline label={item.label}
          value={item.label} checked={kind[item.label]}
          onChange={(e)=>{handleCheckbox(e)}}
        />
      );
    });

    function handleCheckbox (e) {
        setKind({...kind, [e.target.value]: e.target.checked});
    }
    console.log();

    return (
        <Container style={{padding: 0, marginBottom: '100px'}}>
          <Row>
            <Col md="8">
              <Form style={{padding: '15px',marginBottom: '10px', borderRadius: '5px', border: '1px solid rgba(0,0,0,.098)'}}>
                <Form.Group>
                  <Form.Label>
                    Brand
                  </Form.Label>
                  <Form.Control
                    type='text' name='name' placeholder='Enter name'
                    value={state.name} onChange={(e)=>{handleChangeState(e)}}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Logo
                  </Form.Label>
                  <Form.Control
                    type='text' name='image' placeholder='Image link...'
                    value={state.image} onChange={(e)=>{handleChangeState(e)}}
                  />
                </Form.Group>

                <Form.Group>
                  <h1 className="display-4">Brand of</h1>
                  {checkbox}
                </Form.Group>

                <Button variant="primary" type="button" style={{marginLeft: '89%'}}>
                      Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
    )
}

export default NewBrands;