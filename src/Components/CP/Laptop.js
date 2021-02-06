import React, {useState, useEffect, Suspense} from 'react';
import {
    Container,
    Row, Col, Form, Tabs, Tab, Button
} from 'react-bootstrap';
import {FilterBar, Preview} from "./Smartphone";
import fireDb from '../../firebase';
import useCurrency from '../../Hooks/useCurrency';

const PrList = React.lazy(() => import('./SPComponents/ProductsList'));

function Laptop () {

    const basicInformation = {
        name: '',
        price: '',
        brand: '',
        image: '',
        public: true,
        screen: '',
        operatingSystem: '',
        graphicCard: '',
        storage: '',
        processor: '',
        ram: '',
        panelPorts: '',
        design: '',
        dimensions: '',
        pin: ''
    };

    const [state, setState] = useState(basicInformation);

    function handleChangeState (e) {
        setState({...state, [e.target.name]: e.target.value});
    }

    function isPublic () {
        setState({...state, public: !state.public});
    }

    const brands = [];

    const [brand, setBrand] = useState(brands);

    function getBrands (snapshot) {
        const temporaryData = [];
        snapshot.forEach((childSnapshot)=>{
            let val = childSnapshot.val();
            temporaryData.push({name: val.name, brandOf: val.brandOf});
        });
        setBrand(temporaryData);
    }

    function handleSelectBrand (e) {
        setState({...state, brand: e.target.value});
    }

    useEffect(()=>{
        fireDb.ref().child('brands').once('value',getBrands);
    },[]);

    function handleSubmit (e) {
        e.preventDefault();
        fireDb.ref().child('laptop').push(state, error => {
            if (error) {
                console.log(error);
            } else {
                setState(basicInformation);
            }
        });
    }
    
    return (
        <Container fluid style={{padding: 0}}>
            <Row>
                <Col xs="12">
                    <FilterBar type='laptop' />
                </Col>
            </Row>

            <ProductAddonForm 
                state={state}
                handleChangeState={handleChangeState}
                brands={brand}
                handleSelectBrand={handleSelectBrand}
                isPublic={isPublic}
                handleSubmit={handleSubmit}
            />
            <Suspense fallback={
                <p>Loading...</p>
            }>
                <PrList type='laptop' />
            </Suspense>
            
        </Container>
    );
}

function ProductAddonForm (props) {
    return (
        <Form id="add-smartphone-form" onSubmit={(e)=>{props.handleSubmit(e)}}>
            <Tabs style={{border: 'none'}} defaultActiveKey='main'>
                <Tab eventKey='main'  title='Basic Information'>
                    <Row>
                        <Col xs='12' md='8'>
                            <BasicInformation
                                state={props.state}
                                handleChangeState={props.handleChangeState}
                                brands={props.brands}
                                handleSelectBrand={props.handleSelectBrand}
                                isPublic={props.isPublic}
                            />
                        </Col>

                        <Col xs='12' md='4'>
                            <Preview states={props.state} type='laptop' />
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey='detail' title='Detail Information'>
                    <Row>
                        <Col xs='12' md='8'>
                            <DetailInformation
                                state={props.state}
                                handleChangeState={props.handleChangeState}
                            />
                        </Col>

                        <Col xs='12' md='8'>

                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Form>
    );
}

function BasicInformation (props) {
    const state = props.state;
    const options = [];
    props.brands && props.brands.forEach((brand, index) => {
        brand.brandOf.forEach((item) => {
            if (item === 'Laptop') {
                options.push(
                    <option key={index} value={brand.name}>{brand.name}</option>
                );
            }
        });
    });

    return (
        <div style={{
            padding: '15px', border: '1px solid rgba(0,0,0,0.095)',
            borderRadius: '0 5px 5px 5px', marginBottom: '20px'
        }}>
            <Form.Group>
                <Form.Label>Laptop's name</Form.Label>
                <Form.Control 
                    type='text' name='name'
                    placeholder='Enter name...'
                    value={state.name}
                    onChange={(e) => {props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control name='brand' as='select' custom onChange={(e)=>{props.handleSelectBrand(e)}} >
                    {state.brand === '' ?
                        <option selected>Please select brand of laptop</option> :
                        <option>Please select brand of laptop</option>}
                    {options}
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type='text' name='price'
                    placeholder='Enter price...'
                    value={state.price}
                    onChange={(e) => {props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                    type='text' name='image'
                    placeholder='Enter url...'
                    value={state.image}
                    onChange={(e) => {props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Mode</Form.Label>
                <Form.Check
                    type='checkbox' label='Public' checked={state.public}
                    onChange={props.isPublic}
                />
            </Form.Group>

            <Button variant='primary' type='submit' style={{float: 'right'}}>Submit</Button>
            <div className='clear-fix'></div>
        </div>
    );
}

function DetailInformation (props) {
    const state = props.state;
    return (
        <div style={{padding: '15px',marginBottom: '20px', borderRadius: '5px', border: '1px solid rgba(0,0,0,.098)'}}>
        <Form.Group>
            <Form.Control
                type='text' name='screen' placeholder='Screen' value={state.screen}
                onChange={(e)=>{props.handleChangeState(e)}}
            />
        </Form.Group>

        <Form.Group>
            <Form.Control
                type='text' name='operatingSystem' placeholder='Operating system'
                value={state.operatingSystem}
                onChange={(e)=>{props.handleChangeState(e)}}
            />
        </Form.Group>

        <Form.Group>
          <Form.Control 
            type='text' name='graphicCard' placeholder='Graphic Card'
            value={state.graphicCard}
            onChange={(e)=>{props.handleChangeState(e)}}
        />
        </Form.Group>

        <Form.Group>
          <Form.Control 
            type='text' name='storage' placeholder='Storage'
            value={state.storage}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control 
            type='text' name='processor' placeholder='Processor'
            value={state.processor}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control 
            type='text' name='ram' placeholder='RAM'
            value={state.ram}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='text' name='panelPorts' placeholder='Panel Ports'
            value={state.panelPorts}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='text' name='design' placeholder='Design'
            value={state.design}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='text' name='dimensions' placeholder='Dimensions'
            value={state.dimensions}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='text' name='pin' placeholder='Pin'
            value={state.pin}
            onChange={(e)=>{props.handleChangeState(e)}}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{float: 'right'}}>Submit</Button>
        <div className="clear-fix"></div>
      </div>
    );
}

export {Laptop};