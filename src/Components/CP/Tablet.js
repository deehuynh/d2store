import React, {useState, useEffect} from 'react';
import {
    Container,
    Row, Col, Form, Tabs, Tab, Button
} from 'react-bootstrap';
import {FilterBar, Preview} from "./Smartphone";
import PrList from './SPComponents/ProductsList';
import fireDb from '../../firebase';

function Tablet () {
  const basicInformation = {
    name: '',
    price: '',
    image: '',
    brand: '',
    public: true,
    screen: '',
    operatingSystem: '',
    rearCamera: '',
    frontCamera: '',
    cpu: '',
    ram: '',
    internalMemory: '',
    memoryStick: '',
    sim: '',
    pin: '',
    box: '',
    image1: '',
    image2: '',
    image3: '',
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
      fireDb.ref().child('tablet').push(state, error => {
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
                  <FilterBar type='tablet' />
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

          <PrList type='tablet' />
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
                          <Preview states={props.state} type='tablet' />
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
          if (item === 'Tablet') {
              options.push(
                  <option key={index} value={brand.name}>{brand.name}</option>
              );
          }
      });
  });

  console.log(state);

  return (
      <div style={{
          padding: '15px', border: '1px solid rgba(0,0,0,0.095)',
          borderRadius: '0 5px 5px 5px', marginBottom: '20px'
      }}>
          <Form.Group>
              <Form.Label>Tablet's name</Form.Label>
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
                        <option selected>Please select brand of tablet</option> :
                        <option>Please select brand of tablet</option>}
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
  const data = props.state;
  return (
      <div style={{padding: '15px',marginBottom: '20px', borderRadius: '5px', border: '1px solid rgba(0,0,0,.098)'}}>
      <Form.Group controlId="formBasicScreen">
          <Form.Control type='text' name='screen' placeholder='Screen' value={data.screen} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicOS">
          <Form.Control type='text' name='operatingSystem' placeholder='Operating system' value={data.operatingSystem} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicRCamera">
          <Form.Control type='text' name='rearCamera' placeholder='Rear Camera' value={data.rearCamera} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicFCamera">
          <Form.Control type='text' name='frontCamera' placeholder='Front Camera' value={data.frontCamera} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicCpu">
          <Form.Control type='text' name='cpu' placeholder='CPU' value={data.cpu} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicRam">
          <Form.Control type='text' name='ram' placeholder='RAM' value={data.ram} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicMemory">
          <Form.Control type='text' name='internalMemory' placeholder='Internal Memory' value={data.internalMemory} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicMemoryStick">
          <Form.Control type='text' name='memoryStick' placeholder='Memory Stick' value={data.memoryStick} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicSim">
          <Form.Control type='text' name='sim' placeholder='Sim' value={data.sim} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicPin">
          <Form.Control type='text' name='pin' placeholder='Pin' value={data.pin} onChange={(e)=>{props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control as='textarea' name='box' value={data.box} placeholder="what's in the box?" onChange={(e) => {props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Detailed pictures of the product</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image1' placeholder='Enter link image...' value={data.image1} onChange={(e) => {props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image2' placeholder='Enter link image...' value={data.image2} onChange={(e) => {props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image3' placeholder='Enter link image...' value={data.image3} onChange={(e) => {props.handleChangeState(e)}} />
        </Form.Group>

        <Form.Group>
          <div className="pr-pictures">
            <img src={data.image1} alt="Not found image link" />
          </div>

          <div className="pr-pictures">
            <img src={data.image2} alt="Not found image link" />
          </div>

          <div className="pr-pictures">
            <img src={data.image3} alt="Not found image link" />
          </div>
        </Form.Group>

      <Button variant="primary" type="submit" style={{float: 'right'}}>Submit</Button>
      <div className="clear-fix"></div>
    </div>
  );
}

export default Tablet;