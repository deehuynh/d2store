import React, { useState, useEffect, useReducer } from 'react';
import { Router } from 'react-router-dom';
import {Slide} from 'react-slideshow-image';
import StarRating from 'react-star-rating-component';
import {Link} from 'react-router-dom';
import {useParams, useRouteMatch, Redirect} from 'react-router-dom';
import useRating from '../Hooks/useRating';
import fireDb from '../firebase';
import moment from 'moment';  
import SeeMoreBTN from '../Components/SeeMoreBTN';
import {useStateValue} from './StateProvider';

function DetailPr (props) {
  const [cart, dispatch] = useStateValue();
  function handleCart (product) {
    dispatch({type: 'ADD', payload: {
      id: product.key,
      name: product.name,
      price: product.price,
      image: product.image,
      quantily: 1,
    }});
  };

  let baseInfor = {
    name: '',
    key: '',
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
  const baseUrl = props.baseUrl;
  const {prId} = useParams();
  const key = props.prid;
  const primaryKey = props.baseUrl;
  const [pr, setPr] = useState(baseInfor);
  const [pageNF, setPageNF] = useState(false);
  useEffect (()=>{
    fireDb.ref(baseUrl).once('value', getPr);
  }, [prId]);
  function getPr (snapshot) {
    let data = [];
    snapshot.forEach((item)=>{
      let val = item.val();
      if (key === item.key) {
        data.push({...val, key: item.key });
      }
    });
    if (data.length !== 0) {
      setPr(data[0]);
    }
    if (data.length === 0) {
      setPageNF(true);
    }
  }

  const {review, star, overallReview, width, overallRating} = useRating(primaryKey,key);

  const specs = [];
  if (baseUrl === 'accessories') {
    specs.push(<><p>Description</p><div className='specs-description'>{pr.description}</div></>);
  } else if (baseUrl === 'laptop') {
    specs.push(
      <>
        <p>Specifications</p>
        <span><strong>Screen</strong> <div>{pr.screen}</div></span>
        <span><strong>Operating system</strong> <div>{pr.operatingSystem}</div></span>
        <span><strong>Graphic card</strong> <div>{pr.graphicCard}</div></span>
        <span><strong>Processor</strong> <div>{pr.processor}</div></span>
        <span><strong>Storage</strong> <div>{pr.storage}</div></span>
        <span><strong>RAM</strong> <div>{pr.ram}</div></span>
        <span><strong>Panel ports</strong> <div>{pr.panelPorts}</div></span>
        <span><strong>Design</strong> <div>{pr.design}</div></span>
        <span><strong>Dimensions</strong> <div>{pr.dimensions}</div></span>
        <span><strong>Battery</strong> <div>{pr.pin}</div></span>
      </>
    );
  } else if (baseUrl === 'tv') {
    specs.push(<>
      <p>Specifications</p>
      <span><strong>Display size</strong> <div>{pr.displaySize}</div></span>
      <span><strong>Display resolution</strong> <div>{pr.displayResolution}</div></span>
      <span><strong>Operating system</strong> <div>{pr.operatingSystem}</div></span>
      <span><strong>Hertz</strong> <div>{pr.hertz}</div></span>
      <span><strong>Response time</strong> <div>{pr.responseTime}</div></span>
    </>);
  } else {
    specs.push(
      <>
      <p>Specifications</p>
      <span><strong>Screen</strong> <div>{pr.screen}</div></span>
      <span><strong>Operating system</strong> <div>{pr.operatingSystem}</div></span>
      <span><strong>Rear facing camera</strong> <div>{pr.rearCamera}</div></span>
      <span><strong>Front facing camera</strong> <div>{pr.frontCamera}</div></span>
      <span><strong>Processor</strong> <div>{pr.cpu}</div></span>
      <span><strong>RAM</strong> <div>{pr.ram}</div></span>
      <span><strong>Internal memory</strong> <div>{pr.internalMemory}</div></span>
      <span><strong>Memory stick</strong> <div>{pr.memoryStick}</div></span>
      <span><strong>SIM</strong> <div>{pr.sim}</div></span>
      <span><strong>Battery</strong> <div>{pr.pin}</div></span>
    </>
    );
  }
  
  if (pageNF === true) {
    return <Redirect to='/404' />
  }

  return (
    <>
      <div className="headings">
          <Link to={`/${props.baseUrl}`}>{props.baseName}</Link>
          <span><i className="fas fa-chevron-right"></i></span>
          <Link to={`/${props.baseUrl}/${prId}?prid=${props.prid}`}>{pr.name}</Link>
      </div>

      <div className="pr-photos">
        <Slide easing='ease'>
          <div className='each-slide'>
            <img src={pr.image1} />
          </div>

          <div className='each-slide'>
            <img src={pr.image2} />
          </div>

          <div className='each-slide'>
            <img src={pr.image3} />
          </div>
        </Slide>
      </div>

      <div className="aside-content">
        <p className="a-c-brand">{pr.brand}</p>
        <p className="a-c-name">{pr.name}</p>
        <div className="a-c-rate"><i className="fas fa-star"></i> <span>{overallRating.toString()}</span> <p className="review">({overallReview} reviews)</p></div>
        <p className="a-c-price">${pr.price}</p>
        <p className="a-c-order">
          <span><i className="fas fa-truck"></i> Get it shipped</span>
          <span><i className="fas fa-store-alt"></i> Reserve & pick up</span>
        </p>
        <button type="button" onClick={()=>{handleCart(pr)}}>Add to Cart</button>
      </div>

      <div className="aside-box">
        <p>What's in the box</p>
        <pre>{pr.box}</pre>
      </div>

      <div className="clear-fix"></div>

      <div style={{marginBottom: '40px'}}>

      <div className='specs m'>
        {specs}
      </div>

      <div className="reviews">
        <p>Ratings & reviews</p>
        <div className="rating-box">
          <div className="overall">
            <i className="fas fa-star"></i> <span>{overallRating.toString()}</span>
          </div>

          <div className="detail-rating">
            <Rating width={width[5]} star='5' rating={star[5]} />
            <Rating width={width[4]} star='4' rating={star[4]} />
            <Rating width={width[3]} star='3' rating={star[3]} />
            <Rating width={width[2]} star='2' rating={star[2]} />
            <Rating width={width[1]} star='1' rating={star[1]} />
          </div>
        </div>

        <RatingAndReview id={key} baseUrl={props.baseUrl} />
      </div>

      <div className="specs l">
        {specs}
      </div>

      <div className="clear-fix"></div>
      </div>

      <Reviews listRating={review} />
      
    </>
  );
}

function Rating (props) {
  let rating = props.rating;
  return (
            <p>
              {props.star}
              <i className="fas fa-star"></i>
              <span className="process-rating-bar">
                <span
                  className="processing-rating-bar"
                  style={{width: `${props.width}%`}}
                ></span>
              </span> 
              {rating.length}
            </p>
  );
}

function RatingAndReview (props) {
  const [rating, setRating] = useState(0);
  const [key, setKey] = useState(props.id);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [date, setDate] = useState(new Date());

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeReview (e) {
    setReview(e.target.value);
  }

  function onStarClick (nextValue, prevValue, name) {
    setRating(nextValue);
  }

  function sendRating () {
    fireDb.ref(`${props.baseUrl}/${key}`).child('rating').push({name: name, rating: rating, review: review, time: date.toString()}).then(()=>{
      setName('');
      setRating(0);
      setReview('');
      setDate(new Date());
    });
  }

  return (
        <div className="rating-review">
          <span>Your rating</span>
          <input type='text' name='name' placeholder='Your name' value={name} onChange={(e)=>{handleChangeName(e)}} />
          <StarRating 
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
          />
          <div className="your-review">
            <textarea name="review" placeholder='Write your review...' value={review} onChange={(e)=>{handleChangeReview(e)}}></textarea>
          </div>

          <button type='button'onClick={sendRating} >Send</button>
        </div>
  );
}

function Reviews (props) {
  const listRating = props.listRating;
  const [limit, setLimit] = useState(8);
  const [rating, setRating] = useState([]);
  const data = [];
  listRating.forEach((item, index)=>{
    data.push(
      <DetailReview key={index} name={item.name} star={item.rating} review={item.review} time={item.time} />
    )
  });

  useEffect (()=>{
    setRating(data.slice(0, limit));
  },[limit]);

  function handleSeeMore () {
    setLimit(limit + 8);
  }

  return (
    <>
    <div className="reviews-box">
      {rating.length === [].length ? data.slice(0,8) : rating}
    </div>
    {
      listRating.length > limit ? <SeeMoreBTN handleSeeMore={handleSeeMore} /> : ''
    }
    </>
  );
}

function DetailReview (props) {

  const name = props.name === '' ? 'No name' : props.name;
  const star = props.star;
  const storeStar = [];

  for (let i = 1; i <= 5; i++) {
    if (star === i) {
      for (let j = 1; j <= i; j++) {
        storeStar.push(<i key={j} className="fas fa-star"></i>);
      }
    }
  }

  return (
    <div className="detail-review">
        <p className="detail-review-name">{name}</p>
        <p className="detail-review-star">
          {storeStar}
        </p>
        <p className="detail-review-review">{props.review}</p>
        <p className="detail-review-time-ago">{moment(props.time).fromNow()}</p>
    </div>
  );
}

export default DetailPr;