import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {
  Eye, Fullscreen, Play, PlusSquareFill, XSquareFill,
  ThreeDots,Filter, Trash, BoxArrowInDown,
  BoxArrowUp, StarFill, Pencil, BarChart, FileLock, Globe
} from 'react-bootstrap-icons';
import {
  Container,Card,CardColumns,CardDeck,CardGroup,
   Alert, Breadcrumb, Col, Row, Table, Tabs, Tab, Spinner,
  ListGroup, DropdownButton, Dropdown, ButtonGroup, Modal,
  InputGroup, Badge
  } from 'react-bootstrap';
import fireDb from '../../firebase';
import { HighlightProduct } from '../Home';
import PrList from './SPComponents/ProductsList';
import useCurrency from '../../Hooks/useCurrency';

class Smartphone extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      image: '',
      image1: '',
      image2: '',
      image3: '',
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
      rating: {},
      brandList: [],
    };
    this.onHandleChangeAddForm = this.onHandleChangeAddForm.bind(this);
    this.getBrandListings = this.getBrandListings.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onHandleSelectBrand = this.onHandleSelectBrand.bind(this);
    this.isPublic = this.isPublic.bind(this);
  }

  componentDidMount () {
    fireDb.ref().child('brands').on('value',this.getBrandListings);
  }

  componentWillUnmount () {
    fireDb.ref().child('brands').off('value',this.getBrandListings);
  }

  onHandleSelectBrand (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  isPublic () {
    this.setState({
      public: !this.state.public,
    });
  } 

  getBrandListings (snapshot) {
    const brandList = [];
    snapshot.forEach((childSnapshot)=>{
      brandList.push({name: childSnapshot.val().name, brandOf: childSnapshot.val().brandOf});
    });
    this.setState({
      brandList: brandList
    });
  }

  onHandleChangeAddForm (evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  onSubmitHandle (evt) {
    evt.preventDefault();
    fireDb.ref().child("smartphone").push({
          name: this.state.name,
          price: this.state.price,
          image: this.state.image,
          brand: this.state.brand,
          public: this.state.public,
          screen: this.state.screen,
          operatingSystem: this.state.operatingSystem,
          rearCamera: this.state.rearCamera,
          frontCamera: this.state.frontCamera,
          cpu: this.state.cpu,
          ram: this.state.ram,
          internalMemory: this.state.internalMemory,
          memoryStick: this.state.memoryStick,
          sim: this.state.sim,
          pin: this.state.pin,
          box: this.state.box,
          image1: this.state.image1,
          image2: this.state.image2,
          image3: this.state.image3,
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
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
        });
      }
    });
  }

  render () {
    return (
      <Container fluid="true" style={{padding: 0}}>
        <Row>
          <Col xs='12'>
            <FilterBar type='smartphone' />
          </Col>
        </Row>

        <TabsProduct isPublic={this.isPublic} onHandleSelectBrand={this.onHandleSelectBrand} onSubmitHandle={this.onSubmitHandle} states={this.state} onHandleChangeAddForm={this.onHandleChangeAddForm} brandList={this.state.brandList} />
      
        {/* <ListProduct /> */}
        <PrList type='smartphone' />
      </Container>
    );
  }

}

class TabsProduct extends React.Component {
  render () {
    return (
    <Form id="add-smartphone-form" onSubmit={(e) => {this.props.onSubmitHandle(e)}}>
      <Tabs style={{border: 'none'}} defaultActiveKey='main' id='uncontrolled-tab'>
        <Tab eventKey='main' title='Basic Information'>
          <Row>
            <Col xs='12' md='8'>
              <AddProductForm
                isPublic={this.props.isPublic} 
                onHandleSelectBrand={this.props.onHandleSelectBrand}
                states={this.props.states}
                onHandleChangeAddForm={this.props.onHandleChangeAddForm}
                brandList={this.props.brandList}
              />
            </Col>

            <Col className="cp-preview-col" xs='12' md='4'>
              <Preview states={this.props.states} />
            </Col>
          </Row>
        </Tab>

        <Tab eventKey='detail' title='Detail Information'>
        <Row>
            <Col xs='12' md='8'>
              <AddDetailProductForm states={this.props.states} onHandleChangeAddForm={this.props.onHandleChangeAddForm} />
            </Col>

            <Col className="cp-preview-col" xs='12' md='4'>
              <Preview states={this.props.states} />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Form>
    );
  }
}

class AddDetailProductForm extends React.Component {
  constructor (props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue (e) {
    this.props.onHandleChangeAddForm(e);
  }

  render () {
    let states = this.props.states;
    const data = states && {
      screen: states.screen,
      operatingSystem: states.operatingSystem,
      rearCamera: states.rearCamera,
      frontCamera: states.frontCamera,
      cpu: states.cpu,
      ram: states.ram,
      internalMemory: states.internalMemory,
      memoryStick: states.memoryStick,
      sim: states.sim,
      pin: states.pin,
      box: states.box,
      image1: states.image1,
      image2: states.image2,
      image3: states.image3,
    };

    return (
      <div style={{padding: '15px',marginBottom: '20px', borderRadius: '5px', border: '1px solid rgba(0,0,0,.098)'}}>
        <Form.Group controlId="formBasicScreen">
          <Form.Control type='text' name='screen' placeholder='Screen' value={data.screen} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicOS">
          <Form.Control type='text' name='operatingSystem' placeholder='Operating system' value={data.operatingSystem} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicRCamera">
          <Form.Control type='text' name='rearCamera' placeholder='Rear Camera' value={data.rearCamera} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicFCamera">
          <Form.Control type='text' name='frontCamera' placeholder='Front Camera' value={data.frontCamera} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicCpu">
          <Form.Control type='text' name='cpu' placeholder='CPU' value={data.cpu} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicRam">
          <Form.Control type='text' name='ram' placeholder='RAM' value={data.ram} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicMemory">
          <Form.Control type='text' name='internalMemory' placeholder='Internal Memory' value={data.internalMemory} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicMemoryStick">
          <Form.Control type='text' name='memoryStick' placeholder='Memory Stick' value={data.memoryStick} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicSim">
          <Form.Control type='text' name='sim' placeholder='Sim' value={data.sim} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicPin">
          <Form.Control type='text' name='pin' placeholder='Pin' value={data.pin} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control as='textarea' name='box' value={data.box} placeholder="what's in the box?" onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Detailed pictures of the product</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image1' placeholder='Enter link image...' value={data.image1} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image2' placeholder='Enter link image...' value={data.image2} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group>
          <Form.Control type='text' name='image3' placeholder='Enter link image...' value={data.image3} onChange={(e) => {this.onChangeValue(e)}} />
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
}

class AddProductForm extends React.Component {

  constructor (props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue (e) {
    this.props.onHandleChangeAddForm(e);
  }

  onChangeOption (e) {
    this.props.onHandleSelectBrand(e);
  }

  render() {
    const data = this.props.states && {
                    name: this.props.states.name,
                    price: this.props.states.price,
                    image: this.props.states.image,
                    public: this.props.states.public,
                    brand: this.props.states.brand
                  };
    const options = [];
    this.props.brandList && this.props.brandList.forEach((brand,index)=>{
      brand.brandOf.forEach((item)=>{
        if (item === 'Smartphone') {
          options.push(<option key={index} value={brand.name}>{brand.name}</option>);
        }
      });
    });
    return (
      <div style={{padding: '15px',marginBottom: '20px', borderRadius: '0 5px 5px 5px', border: '1px solid rgba(0,0,0,.098)'}}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Smartphone's name</Form.Label>
          <Form.Control type='text' name='name' placeholder='Enter name...' value={data.name} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicOption">
          <Form.Label>Brand</Form.Label>
          <Form.Control onChange={(e) => {this.onChangeOption(e)}} name='brand' as="select" custom>
            {data.brand === '' ?
              <option selected>Please select brand of smartphone</option> :
              <option>Please select brand of smartphone</option>}
            {options}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type='text' name='price' placeholder='Enter price...' value={data.price} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicThumbnail">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type='text' name='image' placeholder='Enter link image...' value={data.image} onChange={(e) => {this.onChangeValue(e)}} />
        </Form.Group>

        <Form.Group controlId="formBasicMode">
          <Form.Label>
            Mode
          </Form.Label>
          <Form.Check type="checkbox" label="Public" checked={data.public} onChange={this.props.isPublic} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{float: 'right'}}>Submit</Button>
        <div className="clear-fix"></div>
      </div>
    );
  }
}

class ListProduct extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      listPr: [],
    }
    this.getListProduct = this.getListProduct.bind(this);
    this.removePr = this.removePr.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  getListProduct (snapshot) {
    const listPr = [];
    snapshot.forEach((item, index) => {
      let key = item.key;
      let data = item.val();
      listPr.push({
        key: key, name: data.name,
        price: data.price,
        image: data.image, public: data.public
      });
    });
    this.setState({
      listPr: listPr,
    });
  }

  removePr (key) {
    fireDb.ref('smartphone').child(key).remove();
  }

  handleMode (key,logic) {
    fireDb.ref('smartphone').child(key).update({
      public: !logic
    });
  }

  componentDidMount () {
    fireDb.ref('smartphone').on('value',this.getListProduct);
  }

  componentWillUnmount () {
    fireDb.ref('smartphone').off('value',this.getListProduct);
  }

  render () {
    const data = [];
    let i = 0;
    this.state.listPr.forEach((item,index) => {
      i = i + 1;
      data.push(
        <Col key={index} xs='12' md="3" style={{marginBottom: '15px'}}>
          <Card className="cp-card-sm">
            <Card.Header style={{backgroundColor: 'white', color: '#3399FF', cursor: 'pointer'}}>
              <span>#{i}</span>
              <div style={{display: 'inline-block', float: 'right'}}>4.5 <StarFill style={{color: 'gold', marginBottom: '6px'}} /></div>
            </Card.Header>
            <div className="cp-card-sm-img-p">
              <Card.Img className="cp-card-sm-img-c card-sm" style={{
                width: '60%',
                textAlign: 'center'
                }} variant="top" src={item.image} />
            </div>
            <Card.Body>
              <Card.Title className="cp-card-sm-title" >{item.name}</Card.Title>
              <Card.Text>
                {item.price}
              </Card.Text>
              {
                item.public === true ?
                <Badge pill variant="success">Public</Badge> :
                <Badge pill variant="danger">Private</Badge>
              }
              
              <DropdownButton
                className="cp-dr-dr"
                variant="light"
                style={{float: 'right',':hover' : {color: 'blue'}}}
                drop="up"
                as={ButtonGroup}
                title={<ThreeDots style={{fontSize: '26px'}} />}
                >
                {
                  item.public === true ? 
                  <Dropdown.Item onClick={(e) => {this.handleMode(item.key,item.public)}}><FileLock /> Private</Dropdown.Item> :
                  <Dropdown.Item onClick={(e) => {this.handleMode(item.key,item.public)}}><Globe /> Public</Dropdown.Item>
                }
                <Dropdown.Item><Pencil /> Update</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={(e) => {this.removePr(item.key)}}><Trash /> Delete</Dropdown.Item>
              </DropdownButton>
              
              <div className="clear-fix"></div>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <Row>
        {data}
      </Row>
    );
  }
}

class FilterBar extends React.Component {
  constructor (props) {
    super(props);
    this.removeAllPr = this.removeAllPr.bind(this);
    this.powerAddForm = this.powerAddForm.bind(this);
    this.state = {
      show: false,
      showAlert: false,
      disabled: true,
      check: ''
    }
  }
  showModal = () => {
    this.setState({show: !this.state.show});
  }

  showAlert = () => {
    this.setState({showAlert: !this.state.showAlert});
  }

  onDisabled = (e) => {
    if (e.target.value === 'Delete') {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true});
    }

    this.setState({
      check: e.target.value
    });
  }

  removeAllPr () {
    fireDb.ref(this.props.type).remove().then(this.showModal).then(
      this.showAlert
    );
    this.setState({check: ''});
  }

  powerAddForm () {
    var id = document.getElementById("add-smartphone-form");
    var idXBtn = document.getElementById("cp-btn-x-new-product");
    var idAddBtn = document.getElementById("cp-btn-add-new-product");
    if (id.style.display === 'block') {
      id.style.display = 'none';
      idXBtn.style.display = 'none';
      idAddBtn.style.display = 'block';
    } else {
      id.style.display = 'block';
      idXBtn.style.display = 'block';
      idAddBtn.style.display = 'none';
    }
  }
  render () {
    return (
      <Container fluid style={{marginBottom: '20px', padding: 0}} >
        <Button variant="light" style={{color: "#404040"}}><Filter style={{fontSize: '24px'}} /></Button>
        
        <DropdownButton 
          className="mx-2"
          as={ButtonGroup}
          title="Action" 
          variant="light" style={{color: "#606060"}} 
          drop="down"
        >
            <Dropdown.Item onClick={this.showModal}><Trash /> Remove All</Dropdown.Item>
            <Dropdown.Item><BoxArrowUp /> Export</Dropdown.Item>
            <Dropdown.Item><BoxArrowInDown /> Import</Dropdown.Item>
        </DropdownButton>

        <Button id="cp-btn-add-new-product" onClick={this.powerAddForm} variant="success" style={{float: 'right'}}><PlusSquareFill style={{marginBottom: '4%'}} /> New Product</Button>
        
        <Button id="cp-btn-x-new-product" onClick={this.powerAddForm} variant="danger" style={{float: 'right'}}><XSquareFill style={{marginBottom: '5%'}} /> Close</Button>
        <div className="clear-fix"></div>

        <Modal
          show={this.state.show}
          backdrop="static"
          onHide={this.showModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove all products?</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            Please enter "Delete" on the input below and click Confirm button to confirm
            <InputGroup className="mt-4">
              <Form.Control value={this.state.check} placeholder="Enter... " 
              onChange={(e) => {this.onDisabled(e)}} />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.showModal}>Close</Button>
            <Button variant="primary" disabled={this.state.disabled} 
              onClick={this.removeAllPr}
            >Confirm</Button>
          </Modal.Footer>
        </Modal>

        <Alert style={{zIndex: '1000' ,position: 'absolute', bottom: '-90px', right: 0,boxShadow: '0 2px 5px green'}} variant="success" onClose={this.showAlert} transition show={this.state.showAlert} dismissible>
          <Alert.Heading style={{fontSize: '16px'}}>All data was removed!</Alert.Heading>
        </Alert>
      </Container>
    );
  }
}

class Preview extends React.Component {
  render () {
    return (
      <div className="preview-product-box">
        <Alert variant='primary'>
          -- PREVIEW --
        </Alert>

        <Container style={{padding: 0}}>
          <SmartphonePr states={this.props.states} type={this.props.type} />
        </Container>
      </div>
    );
  }
}

function SmartphonePr (props) {
  const data = props.states && {
    name: props.states.name,
    price: props.states.price,
    image: props.states.image
  };
  const type = {
    classImage: "cp-product-image"
  };
  if (props.type === 'laptop' || props.type === 'tv') {
    type.classImage = "cp-product-image-laptop"
  }

  return (
    <div className="cp-highlight-products">
      {
        data.image !== '' ? 
          <div className={type.classImage}>
            <img src={data.image} />
          </div> : 

          <div className="cp-product-image-load">
            <div className="cp-spinner-load">
              <Spinner animation="border" variant="primary" />
            </div>
          </div>
      }
      <div className="cp-product-info">
        <div className="cp-product-name">{data.name === '' ? '---' : data.name}</div>
        {props.states.title ? <div className="cp-product-name">{props.states.title === '' ? '---' : props.states.title}</div> : null}
        <div className="cp-product-price">{data.price === '' ? '$0.00' : data.price}</div>
      </div>
    </div>
  );

}

class SmartphonePrOld extends React.Component {
  render () {
    const data = this.props.states && {
      name: this.props.states.name,
      price: this.props.states.price,
      image: this.props.states.image
    };
    const type = {
      classImage: "cp-product-image"
    };
    if (this.props.type === 'laptop' || this.props.type === 'tv') {
      type.classImage = "cp-product-image-laptop"
    }
    
    return (
      <div className="cp-highlight-products">
        {
          data.image !== '' ? 
            <div className={type.classImage}>
              <img src={data.image} />
            </div> : 

            <div className="cp-product-image-load">
              <div className="cp-spinner-load">
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
        }
        <div className="cp-product-info">
          <div className="cp-product-name">{data.name === '' ? '---' : data.name}</div>
          <div className="cp-product-price">{data.price === '' ? '0' : data.price}</div>
        </div>
      </div>
    );
  }
}

export {Smartphone, FilterBar, Preview};