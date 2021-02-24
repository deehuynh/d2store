import { getDefaultNormalizer } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

function useRating (primaryKey,key) {
    const [review, setReview] = useState([]);
  
    useEffect(()=>{
      fireDb.ref(`${primaryKey}/${key}`).child('rating').on('value', getRating);
      return () => {
        fireDb.ref(`${primaryKey}/${key}`).child('rating').off('value', getRating);
      }
    },[]);
  
    function getRating (snapshot) {
      const data = [];
      snapshot.forEach((item) => {
        let id = item.key;
        let val = item.val();
        data.push({...val, key: id});
      });
      setReview(data);
    }
  
    const star = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    const width = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
    }
  
    review.forEach((item)=>{
      let i;
      for (i = 1; i <= 5; i++) {
        if (item.rating === i) {
          star[i].push(item.rating);
        }
      }
    });
  
    let a = 0;
    let b = 0;
    for (let i = 1; i <= 5; i++) {
      b += star[i].length;
      a += i * star[i].length;
    }
    let c = a/b;

    for (let i = 1; i <= 5; i++) {
        width[i] = (star[i].length / b) * 100;
    }

    return {review: review, star: star, overallReview: b, width: width, overallRating: Math.round((c + Number.EPSILON) * 10 ) / 10};
}

export default useRating;