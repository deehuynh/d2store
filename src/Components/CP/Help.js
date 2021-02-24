import React, {useState, useEffect, Suspense} from 'react';
import {
    Container,
    Row, Col, Form, Tabs, Tab, Button
} from 'react-bootstrap';
import {FilterBar, Preview} from "./Smartphone";
import fireDb from '../../firebase';
import useCurrency from '../../Hooks/useCurrency';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PrList = React.lazy(() => import('./SPComponents/ProductsList'));

function Help () {

    const basicInformation = {
        title: '',
        image: '',
        public: true,
        content: '',
    };

    const [state, setState] = useState(basicInformation);

    function handleChangeState (e) {
        setState({...state, [e.target.name]: e.target.value});
    }

    function getContent (data) {
        setState({...state, content: data});
    }

    function isPublic () {
        setState({...state, public: !state.public});
    }

    function handleSubmit (e) {
        e.preventDefault();
        fireDb.ref().child('help').push(state, error => {
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
                    <FilterBar type='help' />
                </Col>
            </Row>

            <ProductAddonForm 
                state={state}
                handleChangeState={handleChangeState}
                isPublic={isPublic}
                handleSubmit={handleSubmit}
                getContent={getContent}
            />
            <Suspense fallback={
                <p>Loading...</p>
            }>
                <PrList type='help' />
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
                                getContent={props.getContent}
                            />
                        </Col>

                        <Col xs='12' md='4'>
                            <Preview states={props.state} type='laptop' />
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
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type='text' name='title'
                    placeholder='Enter title...'
                    value={state.title}
                    onChange={(e) => {props.handleChangeState(e)}}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Content</Form.Label>
                <CKEditor
                    name='content'
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        props.getContent(data);
                        
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
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


export default Help;