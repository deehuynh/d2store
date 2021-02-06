import React, {useState, useEffect} from 'react';
import FireDb from '../../../firebase';
import useCurrency from '../../../Hooks/useCurrency';
import {
    Row, Col, Card, DropdownButton, ButtonGroup, Dropdown, Badge, Modal, Button, Tab,
    Nav,
    Form
} from 'react-bootstrap';
import {
    StarFill, ThreeDots, Pencil, Trash, FileLock, Globe, PencilSquare, GraphUp,
    EmojiSmile, InfoCircle
} from 'react-bootstrap-icons';

function ProductsList (props) {
    const [modalShow, setModalShow] = useState(false);
    const [state, setState] = useState(null);
    const [prState,setPrState] = useState(null);
    const brands = [];
    const [brand, setBrand] = useState(brands);
    const [listOfAcsrType, setListOfAcsrType] = useState([]);

    let primaryKey = props.type;
    let type = props.type;
    function getPrList (snapshot) {
        const prList = [];
        snapshot.forEach((childSnapshot)=>{
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            prList.push({...data, key: key});
        });
        setState(prList);
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

    function getBrands (snapshot) {
        const temporaryData = [];
        snapshot.forEach((childSnapshot)=>{
            let val = childSnapshot.val();
            temporaryData.push({name: val.name, brandOf: val.brandOf});
        });
        setBrand(temporaryData);
    }

    function handleChangeState (e) {
        setPrState({...prState, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        FireDb.ref().child(primaryKey).on('value',getPrList);
        return () => {
            FireDb.ref().child(primaryKey).off('value',getPrList);
        }
    });

    useEffect(()=>{
        FireDb.ref().child('brands').once('value',getBrands)
    }, []);

    useEffect(()=>{
        FireDb.ref().child('accessorytype').once('value',getAcsrType);
    },[]);

    function removePr (key) {
        FireDb.ref(primaryKey).child(key).remove();
    }

    function handleMode (key, isPublic) {
        FireDb.ref(primaryKey).child(key).update({public: !isPublic});
    }

    let classImg = "cp-card-sm-img-c ";
    let classImg2 = '';
    switch (primaryKey) {
        case 'laptop': 
            classImg2 = 'card-lt';
            break;
    
        default:
            classImg2 = 'card-sm'
            break;
    }

    switch (type) {
        case 'laptop': 
            type = 'Laptop';
            break;
        case 'tablet':
            type = 'Tablet'
            break;
        case 'tv':
            type = 'TV'
            break;
        case 'accessories':
            type = 'Accessories'
            break;
        default:
            type = 'Smartphone'
            break;
    }

    function handleUpdate (data) {
        setModalShow(true);
        setPrState(data);
    }

    function handleUpdateSubmit (key) {
        FireDb.ref(primaryKey).child(key).update(prState);
        setModalShow(false);
    }

    const data = [];
    let i = 0;
    if (state !== null) {
        state.forEach((item, index)=>{
            i = i + 1;
            data.push(
              <Col key={index} xs='12' md="3" style={{marginBottom: '15px'}}>
                <Card className="cp-card-sm">
                    <Card.Header style={{backgroundColor: 'white', color: '#3399FF', cursor: 'pointer'}}>
                    <span>#{i}</span>
                    <div style={{display: 'inline-block', float: 'right'}}>4.5 <StarFill style={{color: 'gold', marginBottom: '6px'}} /></div>
                    </Card.Header>
                    <div onClick={()=>{handleUpdate(item)}} className="cp-card-sm-img-p">
                    <Card.Img className={classImg + classImg2} style={{
                        width: '60%',
                        textAlign: 'center'
                        }} variant="top" src={item.image} />
                    </div>
                    <Card.Body onClick={()=>{handleUpdate(item)}}>
                    <Card.Title className="cp-card-sm-title" >{item.name}</Card.Title>
                    <Card.Text style={{color: '#dd0000', fontWeight: 'bold'}}>
                        ${item.price}
                    </Card.Text>
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
                        <Dropdown.Item onClick={()=>{handleUpdate(item)}}><Pencil /> Update</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={(e) => {removePr(item.key)}}><Trash /> Delete</Dropdown.Item>
                    </DropdownButton>
                    
                    <div className="clear-fix"></div>
                    </Card.Footer>
                    
                </Card>
              </Col>
            );
        });
    }

    return (
        <Row>
            {data}
            <DetailModal
                show={modalShow} state={prState} onHide={() => setModalShow(false)}
                brands={brand} handleChangeState={handleChangeState}
                handleUpdateSubmit={handleUpdateSubmit}
                type={type}
                listOfAcsrType={listOfAcsrType}
            />
        </Row>
    );
}

function DetailModal (props) {
    return (
        <Modal
          {...props}
          size='xl'
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
              <h5>Information</h5>
          </Modal.Header>

          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first"><PencilSquare /> Edit</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second"><GraphUp /> Analytics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third"><EmojiSmile /> Review & Rate</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <DetailPr
                                state={props.state} brands={props.brands}
                                handleChangeState={props.handleChangeState}
                                type={props.type} listOfAcsrType={props.listOfAcsrType}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            ---
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            ---
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={()=>{props.handleUpdateSubmit(props.state.key)}}>Update</Button>
          </Modal.Footer>
        </Modal>
    );
}

function DetailPr (props) {
    const type = props.type;
    const state = props.state;
    const options = [];
    props.brands && props.brands.forEach((brand, index) => {
        brand.brandOf.forEach((item) => {
            if (item === type) {
                if (brand.name === state.brand) {
                    options.push(
                        <option key={index} value={brand.name} selected>{brand.name}</option>
                    );
                } else {
                    options.push(
                        <option key={index} value={brand.name}>{brand.name}</option>
                    );
                }
            }
        });
    });

    const options2 = [];
    props.listOfAcsrType && props.listOfAcsrType.forEach((acsr, index)=>{
        if (acsr.name === state.type) {
            options2.push(
                <option key={index} value={acsr.name} selected>{acsr.name}</option>
            );
        } else {
            options2.push(
                <option key={index} value={acsr.name}>{acsr.name}</option>
            );
        }
    });

    let detail;
    if (type === 'Smartphone' || type === 'Tablet') {
        detail = <SmDetailPr state={state} options={options}  handleChangeState={props.handleChangeState}/>
    }   
    if (type === 'Laptop') {
        detail = <LaptopDetailPr state={state} options={options}  handleChangeState={props.handleChangeState}/>
    }
    if (type === 'TV') {
        detail = <TVDetailPr state={state} options={options}  handleChangeState={props.handleChangeState}/>
    }
    if (type === 'Accessories') {
        detail = <AcsrDetailPr state={state} options2={options2} handleChangeState={props.handleChangeState} />
    }

    return (
        <div>
        <Row>
            <Col xs='12' md='5'>
                <div style={{textAlign: 'center'}}>
                    <img style={{width: '90.5%', padding: '30px'}} src={state.image} />
                </div>
                <Form.Group>
                    <Form.Control
                        type='text' name='image' value={state.image}
                        placeholder="Image url..."
                        onChange={(e)=>{props.handleChangeState(e)}}
                     />
                </Form.Group>
            </Col>
            <Col xs='12' md='7'>
                <Form.Group>
                    <Form.Control
                        type='text' name='name' value={state.name}
                        placeholder="Product's name"
                        onChange={(e)=>{props.handleChangeState(e)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type='text' name='price' value={state.price}
                        placeholder="Price"
                        onChange={(e)=>{props.handleChangeState(e)}}
                    />
                </Form.Group>

            </Col>
        </Row>

        {detail}
        
        </div>
    );
}

function SmDetailPr (props) {
    const state = props.state;
    const options = props.options;
    return (
        <Row><Col xs='12'>
            <Form.Group>
                    <Form.Control
                        as='select' name='brand' custom
                        onChange={(e)=>{props.handleChangeState(e)}}
                    >
                        {options}
                    </Form.Control>
                    
                </Form.Group>
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
                    type='text' name='rearCamera' placeholder='Rear camera'
                    value={state.rearCamera}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    type='text' name='frontCamera' placeholder='Front camera'
                    value={state.frontCamera}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type='text' name='cpu' placeholder='CPU'
                    value={state.cpu}
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
                    type='text' name='internalMemory' placeholder='Internal memory'
                    value={state.internalMemory}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type='text' name='memoryStick' placeholder='Memory stick'
                    value={state.memoryStick}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type='text' name='sim' placeholder='Sim'
                    value={state.sim}
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
        </Col></Row>
    );
}

function TVDetailPr (props) {
    const state = props.state;
    const options = props.options;
    return (
        <Row><Col xs='12'>
            <Form.Group>
                    <Form.Control
                        as='select' name='brand' custom
                        onChange={(e)=>{props.handleChangeState(e)}}
                    >
                        {options}
                    </Form.Control>
                    
                </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text' name='displaySize' placeholder='Display size'
                    value={state.displaySize}
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
                    type='text' name='displayResolution' placeholder='Display resolution'
                    value={state.displayResolution}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    type='text' name='responseTime' placeholder='Response time'
                    value={state.responseTime}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type='text' name='hertz' placeholder='The hertz of a monitor'
                    value={state.hertz}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

        </Col></Row>
    );
}

function LaptopDetailPr (props) {
    const state = props.state;
    const options = props.options;
    return (
        <Row><Col xs='12'>
           <Form.Group>
                    <Form.Control
                        as='select' name='brand' custom
                        onChange={(e)=>{props.handleChangeState(e)}}
                    >
                        {options}
                    </Form.Control>
                    
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
                        type='text' name='ram' placeholder='RAM'
                        value={state.ram}
                        onChange={(e)=>{props.handleChangeState(e)}}
                    />
                </Form.Group>

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
                    type='text' name='processor' placeholder='Processor'
                    value={state.processor}
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
        </Col></Row>
    );
}

function AcsrDetailPr (props) {
    const state = props.state;
    const options = props.options2;
    return (
        <Row><Col xs='12'>
            <Form.Group>
                    <Form.Control
                        as='select' name='type' custom
                        onChange={(e)=>{props.handleChangeState(e)}}
                    >
                        {options}
                    </Form.Control>
                    
                </Form.Group>

            <Form.Group>
                <Form.Control
                    style={{height: '200px'}}
                    type='text' as='textarea' name='description' placeholder='Description...'
                    value={state.description}
                    onChange={(e)=>{props.handleChangeState(e)}}
                />
            </Form.Group>

        </Col></Row>
    );
}

export default ProductsList;