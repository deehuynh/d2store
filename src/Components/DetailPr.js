import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import {Slide} from 'react-slideshow-image';
import StarRating from 'react-star-rating-component';
import {Link} from 'react-router-dom';
import {useParams, useRouteMatch} from 'react-router-dom';
import useRating from '../Hooks/useRating';
import fireDb from '../firebase';
import moment from 'moment';  
import SeeMoreBTN from '../Components/SeeMoreBTN';
import useDetailPr from '../Hooks/useDetailPr';

/*function DetailPr (props) {
  const baseInfor = {
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
  const [allPr, setAllPr] = useState([]);
  const baseUrl = props.baseUrl;
  const [pr, setPr] = useState(baseInfor);
  const [key, setKey] = useState(pr.key);
  const {prId} = useParams();

  useEffect (()=>{
    fireDb.ref(baseUrl).once('value', getPr);
  }, []);
  function getPr (snapshot) {
    let data = [];
    snapshot.forEach((item)=>{
      let key = item.key;
      let val = item.val();
      data.push({...val, key: key });
    });
    setAllPr(data);
  }
  function FormatUrl (props) {
    props = props.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    props = props.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    props = props.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    props = props.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    props = props.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    props = props.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    props = props.replace(/đ/g,"d");
    props = props.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    props = props.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    props = props.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    props = props.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    props = props.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    props = props.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    props = props.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    props = props.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣ 
    props = props.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    props = props.replace(/ + /g,"-");
    props = props.trim();
    // Remove punctuations
    props = props.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g,"");
    props = props.replace(/ /g,"-");
    props = props.toLowerCase();
    return props;
  }

  let data = null;

  allPr.forEach((item)=>{
    let url = FormatUrl(item.name);
    console.log(item.name);
    if (prId === url) {
      data = item;
    }
  });

  useEffect (()=>{
    if (data !== null) {
      setPr(data);
      setKey(data.key);
    }
  });
  const primaryKey = props.baseUrl;
  const {review, star, overallReview, width, overallRating} = useRating(primaryKey,key);
  console.log(key);
  console.log(pr);
  return (
    <>
      <div className="headings">
          <Link to={`/${props.baseUrl}`}>Smartphone</Link>
          <span><i className="fas fa-chevron-right"></i></span>
          <Link to={`/${props.baseUrl}/${prId}`}>{pr.name}</Link>
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
        <button type="button">Add to Cart</button>
      </div>

      <div className="aside-box">
        <p>What's in the box</p>
        <pre>{pr.box}</pre>
      </div>

      <div className="clear-fix"></div>

      <div style={{marginBottom: '40px'}}>

      <div className="specs m">
        <p>Specifications</p>
        <span><strong>Screen:</strong> {pr.screen}</span>
        <span><strong>Operating system:</strong> {pr.operatingSystem}</span>
        <span><strong>Rear facing camera:</strong> {pr.rearCamera}</span>
        <span><strong>Front facing camera:</strong> {pr.frontCamera}</span>
        <span><strong>Processor:</strong> {pr.cpu}</span>
        <span><strong>RAM:</strong> {pr.ram}</span>
        <span><strong>Internal memory:</strong> {pr.internalMemory}</span>
        <span><strong>Memory stick:</strong> {pr.memoryStick}</span>
        <span><strong>SIM:</strong> {pr.sim}</span>
        <span><strong>Battery:</strong> {pr.pin}</span>
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

        <RatingAndReview id={pr.key} baseUrl={props.baseUrl} />
      </div>

      <div className="specs l">
        <p>Specifications</p>
        <span><strong>Screen:</strong> {pr.screen}</span>
        <span><strong>Operating system:</strong> {pr.operatingSystem}</span>
        <span><strong>Rear facing camera:</strong> {pr.rearCamera}</span>
        <span><strong>Front facing camera:</strong> {pr.frontCamera}</span>
        <span><strong>Processor:</strong> {pr.cpu}</span>
        <span><strong>RAM:</strong> {pr.ram}</span>
        <span><strong>Internal memory:</strong> {pr.internalMemory}</span>
        <span><strong>Memory stick:</strong> {pr.memoryStick}</span>
        <span><strong>SIM:</strong> {pr.sim}</span>
        <span><strong>Battery:</strong> {pr.pin}</span>
      </div>
      <div className="clear-fix"></div>
      </div>

      <Reviews listRating={review} />
      
    </>
  );
}*/

function DetailPr (props) {
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
  useEffect (()=>{
    fireDb.ref(baseUrl).once('value', getPr);
  }, []);
  function getPr (snapshot) {
    let data = [];
    snapshot.forEach((item)=>{
      let val = item.val();
      if (key === item.key) {
        data.push({...val, key: item.key });
      }
    });
    setPr(data[0]);
  }

  const {review, star, overallReview, width, overallRating} = useRating(primaryKey,key);
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
        <button type="button">Add to Cart</button>
      </div>

      <div className="aside-box">
        <p>What's in the box</p>
        <pre>{pr.box}</pre>
      </div>

      <div className="clear-fix"></div>

      <div style={{marginBottom: '40px'}}>

      <div className="specs m">
        <p>Specifications</p>
        <span><strong>Screen:</strong> {pr.screen}</span>
        <span><strong>Operating system:</strong> {pr.operatingSystem}</span>
        <span><strong>Rear facing camera:</strong> {pr.rearCamera}</span>
        <span><strong>Front facing camera:</strong> {pr.frontCamera}</span>
        <span><strong>Processor:</strong> {pr.cpu}</span>
        <span><strong>RAM:</strong> {pr.ram}</span>
        <span><strong>Internal memory:</strong> {pr.internalMemory}</span>
        <span><strong>Memory stick:</strong> {pr.memoryStick}</span>
        <span><strong>SIM:</strong> {pr.sim}</span>
        <span><strong>Battery:</strong> {pr.pin}</span>
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
        <p>Specifications</p>
        <span><strong>Screen:</strong> {pr.screen}</span>
        <span><strong>Operating system:</strong> {pr.operatingSystem}</span>
        <span><strong>Rear facing camera:</strong> {pr.rearCamera}</span>
        <span><strong>Front facing camera:</strong> {pr.frontCamera}</span>
        <span><strong>Processor:</strong> {pr.cpu}</span>
        <span><strong>RAM:</strong> {pr.ram}</span>
        <span><strong>Internal memory:</strong> {pr.internalMemory}</span>
        <span><strong>Memory stick:</strong> {pr.memoryStick}</span>
        <span><strong>SIM:</strong> {pr.sim}</span>
        <span><strong>Battery:</strong> {pr.pin}</span>
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