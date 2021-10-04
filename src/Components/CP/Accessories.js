import React, {useState, useEffect} from 'react';
import {
    Container,
    Row, Col, Form, Tabs, Tab, Button, Alert, Spinner, Card, Modal,Badge,DropdownButton,
    ButtonGroup,Dropdown
} from 'react-bootstrap';
import {
  StarFill, ThreeDots, Pencil, Trash, FileLock, Globe, PencilSquare, GraphUp,
  EmojiSmile, InfoCircle
} from 'react-bootstrap-icons';
import {FilterBar, Preview} from "./Smartphone";
import PrList from './SPComponents/ProductsList';
import fireDb from '../../firebase';

function Accessories () {
    const accessoryType = {
        name: '',
        image: '',
        public: true
    };

    const accessories = {
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      public: true,
      box: '',
      image1: '',
      image2: '',
      image3: '',
    };

    const [type, setType] = useState(accessoryType);

    const [acsr, setAcsr] = useState(accessories);

    const [listOfAcsrType, setListOfAcsrType] = useState([]);

    

    function handleChangeType (e) {
        setType({...type, [e.target.name]: e.target.value});
    }

    function handleChangeAcsr (e) {
      setAcsr({...acsr, [e.target.name]: e.target.value});
    }

    function isPublic (e) {
        setType({...type, public: !type.public});
    }

    function isPublicAcsr (e) {
      setAcsr({...acsr, public: !acsr.public});
    }

    function handleAddTypePr (e) {
      e.preventDefault();
      fireDb.ref().child('accessorytype').push(type, error => {
        if (error) {
          console.log(error);
        } else {
          setType(accessoryType);
        }
      });
    }

    function handleAddAcsr (e) {
      e.preventDefault();
      fireDb.ref().child('accessories').push(acsr, error => {
        if (error) {
          console.log(error);
        } else {
          setAcsr(accessories);
        }
      });
    }

    function getAcsrType (snapshot) {
      const acsrType = [];
      snapshot.forEach((item)=>{
        let data = item.val();
        let key = item.key;
        acsrType.push({...data, key: key});
      });
      setListOfAcsrType(acsrType);
    }

    useEffect(()=>{
      fireDb.ref().child('accessorytype').on('value', getAcsrType);
      return ()=>{
        fireDb.ref().child('accessorytype').off('value', getAcsrType);
      }
    }, []);

    return (
        <Container fluid style={{padding: 0}}>
            <Row>
                <Col xs="12">
                    <FilterBar type='accessories' />
                </Col>
            </Row>

            <ProductAddonForm acsType={type} handleChangeType={handleChangeType} 
              isPublic={isPublic} handleAddTypePr={handleAddTypePr}
              isPublicAcsr={isPublicAcsr} handleChangeAcsr={handleChangeAcsr}
              handleAddAcsr={handleAddAcsr}
              acsr={acsr} listOfAcsrType={listOfAcsrType}
            />
            <AcsrType listOfAcsrType={listOfAcsrType} />

            <PrList type='accessories' />
        </Container>
    );
}

function AcsrType (props) {
  const [showModal, setModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [currentType, setCurrentType] = useState([]);

  function removePr (key) {
    fireDb.ref('accessorytype').child(key).remove();
  }

  function handleMode (key, isPublic) {
    fireDb.ref('accessorytype').child(key).update({public: !isPublic});
  }

  function removeAll () {
    fireDb.ref().child('accessorytype').remove().then(()=>{setShowModalRemove(false)});
  }

  function handleChangeCurrentType (e) {
    setCurrentType({...currentType, [e.target.name]: e.target.value});
  }

  function handleUpdate (item) {
    setModal(true);
    setCurrentType(item);
  }

  function handleUpdateSubmit (key) {
    fireDb.ref('accessorytype').child(key).update(currentType);
    setModal(false);
  } 

  function show () {
    let acsrType = document.getElementById('acsr-type');
    let btnS = document.getElementById('acsr-show');
    let btnC = document.getElementById('acsr-close');
    if (acsrType.style.display === 'flex') {
      acsrType.style.display = 'none';
      btnC.style.display = 'none';
      btnS.style.display = 'block';
    } else {
      acsrType.style.display = 'flex';
      btnC.style.display = 'block';
      btnS.style.display = 'none';
    }
  }
  const data = [];
  props.listOfAcsrType.forEach((item, index)=>{
    data.push(
      <Col key={index} xs='6' md='2'>
          <Card>
            <div onClick={()=>{handleUpdate(item)}} style={{textAlign: 'center', marginTop: '20px'}}>
              <Card.Img  style={{
                width: '50%'
              }} variant='top' src={item.image} />
            </div>
            <Card.Body onClick={()=>{handleUpdate(item)}}>
              <Card.Text style={{textAlign: 'center'}}>{item.name}</Card.Text>
            </Card.Body>
            <Card.Footer style={{background: 'white', borderTop: 'none', paddingTop: '0'}}>
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
                <Dropdown.Item onClick={(e) => {handleMode(item.key,item.public)}}><FileLock /> Private</Dropdown.Item> :
                <Dropdown.Item onClick={(e) => {handleMode(item.key,item.public)}}><Globe /> Public</Dropdown.Item>
              }
                <Dropdown.Divider />
                <Dropdown.Item onClick={(e) => {removePr(item.key)}}><Trash /> Delete</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setShowModalRemove(true)}}><Trash /> Remove All</Dropdown.Item>
            </DropdownButton>
            </Card.Footer>
          </Card>
        </Col>
    );
  });

  return (
    <>
      <Row style={{marginBottom: '20px'}}>
        <Col>
          <Button id='acsr-show' variant='primary' type='button' onClick={show}>Accessory Type</Button>
          <Button id='acsr-close' variant='danger' type='button' onClick={show}>Close</Button>
        </Col>
      </Row>

      <Row id='acsr-type'>
        {data.length === [].length ? <p style={{
          padding: '0 20px',
          fontWeight: 'bold'
        }}>Data not availble</p> : data}
      </Row>

      <Modal
        show={showModal}
        onHide={()=>{setModal(false)}}
        size='md'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5>Accessory Type</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
              <Col xs='12' md='5'>
                  <div style={{textAlign: 'center'}}>
                      <img style={{width: '90.5%', padding: '30px'}} src={currentType.image} />
                  </div>
                  
              </Col>
              <Col xs='12' md='7'>
                  <Form.Group>
                      <Form.Control
                          type='text' name='name' value={currentType.name}
                          placeholder="Product's name"
                          onChange={(e)=>{handleChangeCurrentType(e)}}
                      />
                  </Form.Group>

                  <Form.Group>
                      <Form.Control
                          type='text' name='image' value={currentType.image}
                          placeholder="Image url..."
                          onChange={(e)=>{handleChangeCurrentType(e)}}
                      />
                  </Form.Group>

              </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='success' onClick={()=>{handleUpdateSubmit(currentType.key)}}>Update</Button>
          <div className='clear-fix'></div>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalRemove} onHide={()=>{setShowModalRemove(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Remove all accessory type</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={removeAll}>
            Remove All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ProductAddonForm (props) {
    const state = props.acsType;
    const acsr = props.acsr;
    const option = [];
    props.listOfAcsrType.forEach((item, key)=>{
      option.push(
        <option key={key} value={item.name}>{item.name}</option>
      );
    });

    return (
        <div id="add-smartphone-form">
          <Tabs style={{border: 'none'}} defaultActiveKey='second'>
            <Tab eventKey='second' title='Accessory type'>
              <Row>
                <Col xs='12' md='8'>
                  <Form style={{
                    padding: '15px', border: '1px solid rgba(0,0,0,0.095)',
                    borderRadius: '0 5px 5px 5px', marginBottom: '20px'
                  }}
                    onSubmit={(e)=>{props.handleAddTypePr(e)}}
                  >
                    <Form.Group>
                        <Form.Label>
                            Type of accessories
                        </Form.Label>
                        <Form.Control
                          type='text' name='name' placeholder="Enter name"
                          value={state.name} onChange={(e)=>{props.handleChangeType(e)}}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Avatar
                        </Form.Label>
                        <Form.Control
                          type='text' name='image' placeholder="Enter url..."
                          value={state.image} onChange={(e)=>{props.handleChangeType(e)}}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mode</Form.Label>
                        <Form.Check
                            type='checkbox' label='Public' checked={state.public}
                            onChange={(e)=>{props.isPublic(e)}}
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit' style={{float: 'right'}}>Submit</Button>
                    <div className='clear-fix'></div>
                  </Form>
                </Col>

                <Col className="cp-preview-col" xs='12' md='4'>
                  <div className="preview-product-box">
                    <Alert variant='primary'>
                      -- PREVIEW --
                    </Alert>

                    <Container style={{padding: 0, textAlign: 'center'}}>
                      <div className="cp-accessory">
                        {
                          state.image !== '' ?
                          <div className='cp-load-img'><img src={state.image} /></div> :
                          <div className="cp-product-image-load">
                            <div className="cp-spinner-load">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          </div>
                        }
                        
                        <span>{state.name}</span>
                      </div>
                    </Container>
                  </div>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey='first' title='Add accessory'>
            <Row>
                <Col xs='12' md='8'>
                  <Form style={{
                    padding: '15px', border: '1px solid rgba(0,0,0,0.095)',
                    borderRadius: '5px', marginBottom: '20px'
                  }}
                    onSubmit={(e)=>{props.handleAddAcsr(e)}}
                  >
                    <Form.Group>
                        <Form.Label>
                            Accessory's name
                        </Form.Label>
                        <Form.Control
                          type='text' name='name' placeholder="Enter name"
                          value={acsr.name} onChange={(e)=>{props.handleChangeAcsr(e)}}
                        />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>
                        Type of accessory
                      </Form.Label>
                      <Form.Control as='select' name='type'
                        onChange={(e)=>{props.handleChangeAcsr(e)}}>
                        {acsr.type === '' ?
                          <option selected>Please select brand of accessory</option> :
                          <option>Please select brand of accessory</option>}
                        {option}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control
                          type='text' name='price' placeholder="Enter price"
                          value={acsr.price} onChange={(e)=>{props.handleChangeAcsr(e)}}
                        />
                    </Form.Group>

                    

                    <Form.Group>
                        <Form.Label>
                            Thumbnail
                        </Form.Label>
                        <Form.Control
                          type='text' name='image' placeholder="Enter url..."
                          value={acsr.image} onChange={(e)=>{props.handleChangeAcsr(e)}}
                        />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        style={{height: '200px'}}
                        name='description' as='textarea' value={acsr.description}
                        placeholder='Description...'
                        onChange={(e)=>{props.handleChangeAcsr(e)}}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Control as='textarea' name='box' value={acsr.box} placeholder="what's in the box?" onChange={(e) => {props.handleChangeAcsr(e)}} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Detailed pictures of the product</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Form.Control type='text' name='image1' placeholder='Enter link image...' value={acsr.image1} onChange={(e) => {props.handleChangeAcsr(e)}} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Control type='text' name='image2' placeholder='Enter link image...' value={acsr.image2} onChange={(e) => {props.handleChangeAcsr(e)}} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Control type='text' name='image3' placeholder='Enter link image...' value={acsr.image3} onChange={(e) => {props.handleChangeAcsr(e)}} />
                    </Form.Group>

                    <Form.Group>
                      <div className="pr-pictures">
                        <img src={acsr.image1} alt="Not found image link" />
                      </div>

                      <div className="pr-pictures">
                        <img src={acsr.image2} alt="Not found image link" />
                      </div>

                      <div className="pr-pictures">
                        <img src={acsr.image3} alt="Not found image link" />
                      </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mode</Form.Label>
                        <Form.Check
                            type='checkbox' label='Public' checked={acsr.public}
                            onChange={(e)=>{props.isPublicAcsr(e)}}
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit' style={{float: 'right'}}>Submit</Button>
                    <div className='clear-fix'></div>
                  </Form>
                </Col>

                <Col className="cp-preview-col" xs='12' md='4'>
                  <Preview states={acsr}/>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
    );
}

export default Accessories;