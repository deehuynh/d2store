import React from 'react';
import {
  Container, Row, Col, Form, Button,
  Table, ListGroup, FormGroup, Modal
}
from 'react-bootstrap';
import fireDb from '../../firebase';

class Brands extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      brandOf: [
        {id: 0, label: 'Smartphone', isChecked: false},
        {id: 1,label: 'Tablet', isChecked: false },
        {id: 2,label: 'Laptop', isChecked: false },
        {id: 3,label: 'TV', isChecked: false },
        {id: 4,label: 'Accessories', isChecked: false },
      ],
      data: [],
      currentBrand: null,
      currentIndex: -1,
      show: false
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.setActiveBrand = this.setActiveBrand.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal (brand,index) {
    this.setState({
      currentBrand: brand,
      currentIndex: index,
      show: true
    });
  }

  refreshList() {
    this.setState({
      currentBrand: null,
      currentIndex: -1,
      show: false
    });
  }

  onDataChange (snapshot) {
    const listData = [];
    snapshot.forEach(childSnapshot => {
      let key = childSnapshot.key;
      let data = childSnapshot.val();
      listData.push({key: key, name: data.name, image: data.image, brandOf: data.brandOf});
    });
    this.setState({
      data: listData,
    });
  }

  onCheckBoxChange (evt) {
    let brands = this.state.brandOf;
    brands.forEach((item) => {
      if (item.label === evt.target.value) {
        item.isChecked = evt.target.checked
      }
    });
    this.setState({
      brandOf: brands
    });
  }

  componentDidMount () {
    fireDb.ref().child('brands').on('value', this.onDataChange);
  }

  componentWillUnmount () {
    fireDb.ref().child('brands').off('value', this.onDataChange);
  }

  removeData = (key) => {
    fireDb.ref('brands').child(key).remove();
  }

  handleSubmit () {
    const brandOf = [];

    this.state.brandOf.map((item) => {
      if (item.isChecked === true) {
        brandOf.push(item.label);
      }
    });

    fireDb.ref().child('brands').push({
      name: this.state.name,
      image: this.state.image,
      brandOf: brandOf
    }, error => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
          name: '',
          image: '',
          brandOf: [
            {id: 0, label: 'Smartphone', isChecked: false},
            {id: 1,label: 'Tablet', isChecked: false },
            {id: 2,label: 'Laptop', isChecked: false },
            {id: 3,label: 'TV', isChecked: false },
            {id: 4,label: 'Accessories', isChecked: false },
          ],
        });
      }
    });
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setActiveBrand(brand, index) {
    this.setState({
      currentBrand: brand,
      currentIndex: index,
      show: true
    });
  }

  render () {
    return (
      <Container style={{padding: 0, marginBottom: '100px'}}>
        
          <Row>
            <Col xs="12" md="8">
              <Form style={{padding: '15px',marginBottom: '10px', borderRadius: '5px', border: '1px solid rgba(0,0,0,.098)'}}>
                  <Form.Group controlId="formBasicName">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control name="name" type="text" placeholder="Enter name" value={this.state.name}
                        onChange={this.onChangeHandle}
                      />
                  </Form.Group>

                  <Form.Group controlId="formBasicThumbnail">
                      <Form.Label>Logo</Form.Label>
                      <Form.Control name="image" type="text" placeholder="Link image..."  value={this.state.image}
                        onChange={this.onChangeHandle}
                      />
                  </Form.Group>

                  {<CheckBoxF onCheckBoxChange={this.onCheckBoxChange} brandOf={this.state.brandOf} />}

                  <Button variant="primary" type="button" style={{float: 'right'}} onClick={this.handleSubmit}>
                      Submit
                  </Button>
                  <div className='clear-fix'></div>
              </Form>
          </Col>

          <Col xs="12" md="4">
            <p className="cp-preview-title">PREVIEW</p>
            {this.state.image !== '' ? <PreviewBrand img={this.state.image} /> : ''}
          </Col>
      </Row>
         {/* <DetailForm brand={this.state.currentBrand} refreshList={this.refreshList} /> */}
      
         <Modal
          onHide={()=>{this.setState({show: false})}}
          size='xl'
          show={this.state.show}
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <h5>Update</h5>
        </Modal.Header>
        <Modal.Body>
          <DetailForm brand={this.state.currentBrand} refreshList={this.refreshList} />
        </Modal.Body>
      </Modal>

      <Row>
        <ListBrands handleModal={this.handleModal} setActiveBrand={this.setActiveBrand} listBr={this.state.data} refreshList={this.refreshList} />
      </Row>

      </Container>
    );
  }
}

class CheckBoxF extends React.Component {
  
  render() {

    return (
      <Form.Group>
        <h1 className="display-4">Brand of</h1>
        { 
          this.props.brandOf.map((item)=>{
          return <Form.Check key={item.id} type="checkbox" inline label={item.label} value={item.label} checked={item.isChecked} onChange={(evt) => {this.props.onCheckBoxChange(evt)}} />
        })
        }
      </Form.Group>
    );
  }
}

class DetailForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      image: '',
      brandOfForm: [
        {id: 0,label: 'Smartphone', isChecked: false},
        {id: 1,label: 'Tablet', isChecked: false },
        {id: 2,label: 'Laptop', isChecked: false },
        {id: 3,label: 'TV', isChecked: false },
        {id: 4,label: 'Accessories', isChecked: false },
      ],
    };
    this.removeBrand = this.removeBrand.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.updateBrand = this.updateBrand.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
  }

  onCheckBoxChange (evt) {
    let brands = this.state.brandOfForm;
    brands.forEach((item) => {
      if (item.label === evt.target.value) {
        item.isChecked = evt.target.checked
      }
    });
    this.setState({
      brandOfForm: brands
    });
  }

  updateBrand () {
    const brandOf = [];

    this.state.brandOfForm.map((item) => {
      if (item.isChecked === true) {
        brandOf.push(item.label);
      }
    });

    fireDb.ref('brands').child(this.state.key).update({
      name: this.state.name,
      image: this.state.image,
      brandOf: brandOf,
    }).then(()=>{
      this.props.refreshList()
    }).catch((err) => {console.log(err)});
  }

  onChangeInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  componentDidMount () {
    let brands = this.state.brandOfForm;
    this.props.brand.brandOf && this.props.brand.brandOf.map((item)=>{
      brands.map((childItem)=>{
        if (item === childItem.label) {
          childItem.isChecked = true;
        }
      });
    });
    this.setState({
      key: this.props.brand.key,
      name: this.props.brand.name,
      image: this.props.brand.image,
      brandOfForm: brands,
    });
    console.log(this.props.brand.name);
  }

  removeBrand (key) {
    fireDb.ref('brands').child(key).remove().then(() => {
      this.props.refreshList()
    }).catch((e) => {
      console.log(e)
    });
  }

  render () {
    return (
      <Row>
        <Col md="8">
          <Form style={{padding: '15px',
           borderRadius: '5px',
            border: '1px solid rgba(0,0,0,.098)', marginBottom: '15px'}}>
            <FormGroup controlId="formBasicName">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter brand" value={this.state.name}
              onChange={this.onChangeInput} />
            </FormGroup>

            <FormGroup controlId="formBasicImage">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="text" name="image" placeholder="Link image..." value={this.state.image}
              onChange={this.onChangeInput} />
            </FormGroup>

            {<CheckBoxF onCheckBoxChange={this.onCheckBoxChange} brandOf={this.state.brandOfForm} isRealBrandOf={this.state.brandOf} />}

            <Button variant="danger" type="button" onClick={()=>{this.removeBrand(this.state.key)}}>Remove</Button>

            <Button variant="success" type="button" style={{float: 'right'}} onClick={this.updateBrand} >
              Update
            </Button>
          </Form>
        </Col>

        <Col md='4'>
          <p className="cp-preview-title">PREVIEW</p>
          {
            this.state.image ? <PreviewBrand img={this.state.image} /> : ''
          }
        </Col>
      </Row>
    );
  }
}

class ListBrands extends React.Component {

  render () {
    return (
      <Container style={{marginTop: '25px', padding: '0px'}}>
        <Table>
          <thead>
            <tr>
              <td style={{textTransform: 'uppercase'}}>List of brands</td>
            </tr>
          </thead>

          <tbody>
          <tr> 
            <td style={{padding: '10px 0', textAlign: 'center'}}>
              {
                this.props.listBr && this.props.listBr.map((brand, index) => (
                  <ChildBrand handleModal={this.props.handleModal} key={brand.key} index={index} brand={brand} setActiveBrand={this.props.setActiveBrand} refreshList={this.props.refreshList} />
                ))  
              }
              
            </td>
          </tr>
          </tbody>
          
        </Table>
        <Button variant="danger" type="button" onClick={()=>{fireDb.ref().child('brands').remove()}}>Remove All</Button>
      </Container>
    );
  }
}

function PreviewBrand (props) {
  return (
      <div className="preview-brand-box">
        <img src={props.img} />
      </div>
  );
}

class ChildBrand extends React.Component {

  render () {
    return (
        <div className="preview-brand-box" onClick={()=>{this.props.setActiveBrand(this.props.brand,this.props.index)}}>
          <img src={this.props.brand.image} />
        </div>
    );
  }
}

export default Brands;