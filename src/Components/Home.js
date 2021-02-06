import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import HContentBar from './HContentBar';
import firstStore from '../images/store.png';
import secondStore from '../images/store2.png';
import Bn1 from '../images/bn3.jpg';
import Bn2 from '../images/bn5.jpg';
import Bn3 from '../images/bn4.jpg';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Link} from 'react-router-dom';
import fireDb from '../firebase';
import useTopPr from '../Hooks/useTopPr';
import useTopPrL from '../Hooks/useTopPrL';

function HighlightProductFrame (props) {

    const column = [];
    props.products && props.products.forEach((product, index) => {
      column.push(
        <HighlightProduct
          key={index} name={product.name} price={product.price}
          image={product.image} type={props.type}
         />
      );
    });

    return (
      <div className="highlight-product-frame">
        {column}
        <div className='clear-fix'></div>
        <div className='see-more'>See more</div>
      </div>
    );

}

function HighlightProduct (props) {
    let attribute = null;
    if (props.type === 1) {
      attribute = {height: '290px'};
    }

    return (
      <Link to='/dien-thoai/name-product' className="highlight-products" style={attribute}>
        
        <div className="product-image">
          <img src={props.image} />
        </div>
        <div className="product-info">
          <p className="product-name">{props.name}</p>
          <p className="product-price">${props.price}</p>
        </div>
        <div className='product-rate'>
          <i className="fas fa-star"></i>
          <span className='product-rate-point'> 4.5</span>
          <span className='product-rate-evaluation'> (103 evaluations)</span>
        </div>
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
  
  const phone = useTopPrL('smartphone');
  const laptop = useTopPrL('laptop');
  const tablet = useTopPrL('tablet');
  
  return (
    <>
      <HomeBanner />
      <AddressBanner />
      <div className='clear-fix'></div>

      <HContentBar title="The top smartphones rated" />
      <HighlightProductFrame products={phone} />
      <HContentBar title="The top laptop rated" />
      <HighlightProductFrame products={laptop} type={1} />
      <HContentBar title="The top tablet rated" />
      <HighlightProductFrame products={tablet} />
    </>
  );
}

function HomeM () {
  
  const phone = useTopPr('smartphone');
  const laptop = useTopPr('laptop');
  const tablet = useTopPr('tablet');
  
  return (
    <>
      <HomeBanner />
      <AddressBanner />
      <div className='clear-fix'></div>

      <HContentBar title="The top smartphones rated" />
      <HighlightProductFrame products={phone} />
      <HContentBar title="The top laptop rated" />
      <HighlightProductFrame products={laptop} type={1} />
      <HContentBar title="The top tablet rated" />
      <HighlightProductFrame products={tablet} />
    </>
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