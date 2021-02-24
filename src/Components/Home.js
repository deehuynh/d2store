import React, {useState, useEffect} from 'react';
import useFormatUrl from '../Hooks/useFormatUrl';
import {useMediaQuery} from 'react-responsive';
import HContentBar from './HContentBar';
import firstStore from '../images/store.png';
import secondStore from '../images/store2.png';
import Bn1 from '../images/bn3.jpg';
import Bn2 from '../images/bn5.jpg';
import Bn3 from '../images/bn4.jpg';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import fireDb from '../firebase';
import useTopPr from '../Hooks/useTopPr';
import useTopPrL from '../Hooks/useTopPrL';
import DetailPr from './DetailPr';
import useRating from '../Hooks/useRating';
import {
  BrowserRouter as Router, Link, Route, Switch, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom';
import useQuery from '../Hooks/useQuery';

function HighlightProductFrame (props) {

    const column = [];
    props.products && props.products.forEach((product, index) => {
      column.push(
        <HighlightProduct
          key={index} type={props.type}
          product={product} detail={props.detail}
          baseUrl={props.baseUrl}
         />
      );
    });

    return (
      <div className="highlight-product-frame">
        {column}
        <div className='clear-fix'></div>
        {
          props.hide === 'hide' ? '' : <Link to={`/${props.category}`} className='see-more'>See more</Link>
        }
      </div>
    );

}

function HighlightProduct (props) {
    let attribute = null;
    if (props.type === 1) {
      attribute = {height: '290px'};
    }

    if (props.detail === true) {
      attribute = {height: '500px'}
    }

    let formatUrl = useFormatUrl(props.product.name);
    const {review, star, overallReview, width, overallRating} = useRating(props.baseUrl,props.product.key);

    return (
      <Link
        to={`${props.baseUrl}/${formatUrl}?prid=${props.product.key}`} className="highlight-products"
        style={attribute}
      >
        
        <div className="product-image">
          <img src={props.product.image} />
        </div>

        <div className="product-info">
          <p className="product-name">{props.product.name}</p>
          <p className="product-price">${props.product.price}</p>
        </div>
        <div className='product-rate'>
          <i className="fas fa-star"></i>
          <span className='product-rate-point'> {overallRating}</span>
          <span className='product-rate-evaluation'> ({overallReview} reviews)</span>
        </div>

        {
          props.detail === true ? 
          <>
            <div className="ram-memory">
            <span>RAM {props.product.ram}</span>
            <span>{props.product.internalMemory}</span>
          </div>
          <div className='product-info-detail'>
            <p>Screen {props.product.screen}</p>
            <p>Processor {props.product.cpu}</p>
            <p>Rear camera {props.product.rearCamera}</p>
            <p>Front camera {props.product.frontCamera}</p>
            <p>{props.product.pin} battery</p>
          </div>
          </> :
          ''
        }
      </Link>
    );
}

class AddressBanner extends React.Component {
  render () {
    const properties = {
      duration: 6000,
      indicators: true,
      arrows: false
    }

    return (
      <div className="addressbanner">
        <Slide easing='ease' {...properties}>
          <div className='each-slide'>
            <div style={{backgroundImage: `url(${firstStore})`, position: 'relative'}}>
              <span>First store: 21756 California Street San Francisco</span>
            </div>
          </div>

          <div className='each-slide'>
            <div style={{backgroundImage: `url(${secondStore})`, position: 'relative'}}>
              <span>Second store: 84244 Corte Madera Town Center, Corte Madera, California</span>
            </div>
          </div>
        </Slide>
      </div>
    );
  }
}

class HomeBanner extends React.Component {
  render () {
    return (
      <div className="homebanner">
        <Slide easing='ease'>
          <div className='each-slide'>
            <div style={{backgroundImage: `url(${Bn1})`}}></div>
          </div>

          <div className='each-slide'>
            <div style={{backgroundImage: `url(${Bn2})`}}></div>
          </div>

          <div className='each-slide'>
            <div style={{backgroundImage: `url(${Bn3})`}}></div>
          </div>
        </Slide>
      </div>
    );
  }
}

function HomeL () {

  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const phone = useTopPrL('smartphone');
  const laptop = useTopPrL('laptop');
  const tablet = useTopPrL('tablet');
  
  return (
    <Switch>
      <Route exact path={path}>
        <HomeBanner />
        <AddressBanner />
        <div className='clear-fix'></div>

        <HContentBar title="The top smartphones rated" category='smartphone' />
        <HighlightProductFrame products={phone} category='smartphone' baseUrl='smartphone' />
        <HContentBar title="The top laptop rated" category='laptop' />
        <HighlightProductFrame products={laptop} type={1} category='laptop' baseUrl='laptop' />
        <HContentBar title="The top tablet rated" category='tablet' />
        <HighlightProductFrame products={tablet} category='tablet' baseUrl='tablet' />
      </Route>

      <Route>
        <DetailPr baseUrl='smartphone' prid={query.get("prid")} />
      </Route>
    </Switch>
  );
}

function HomeM () {

  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const phone = useTopPr('smartphone');
  const laptop = useTopPr('laptop');
  const tablet = useTopPr('tablet');
  
  return (
    <Switch>
      <Route exact path={path}>
        <HomeBanner />
        <AddressBanner />
        <div className='clear-fix'></div>

        <HContentBar title="The top smartphones rated" category='smartphone' />
        <HighlightProductFrame products={phone} category='smartphone' baseUrl='smartphone' />
        <HContentBar title="The top laptop rated" category='laptop' />
        <HighlightProductFrame products={laptop} type={1} category='laptop' baseUrl='laptop' />
        <HContentBar title="The top tablet rated" category='tablet' />
        <HighlightProductFrame products={tablet} category='tablet' baseUrl='tablet' />
      </Route>

      <Route>
        <DetailPr baseUrl='smartphone' prid={query.get("prid")} />
      </Route>
    </Switch>
  );
}

function Home () {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  if (isTabletOrMobile) {
    return <HomeM />;
  }
  
  return <HomeL />;
}

export {Home, HomeBanner, AddressBanner, HighlightProduct, HighlightProductFrame};