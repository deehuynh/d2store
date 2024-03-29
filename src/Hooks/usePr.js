import React, {useState, useEffect, useReducer} from 'react';
import fireDb from '../firebase';
import handleAction from '../Hooks/useRd';

function usePr (key) {
  const initState = [];
  const [allPr, dispatch] = useReducer(handleAction, initState);
  const [cloneAllPr, setCloneAllPr] = useState([]);
  const [limit, setLimit] = useState(0);
  const [pr, setPr] = useState([]);
  const [prOfBrand, setPrOfBrand] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  function handleSetPOB (state) {
    setPrOfBrand(state);
  }

  useEffect(()=>{
    fireDb.ref(key).orderByChild('public').equalTo(true).once('value', getPr);
  }, []);

  function getPr (snapshot) {
    const data = [];
    snapshot.forEach((item)=>{
      let key = item.key;
      let val = item.val();
      data.push({...val, key: key });
    });
    dispatch({type: 'INIT_DATA', payload: data.reverse()});
    setCloneAllPr(data);
    setLimit(10);
    setIsLoading(false);
  }

  useEffect(()=>{
    setPr(allPr.slice(0,limit));
  },[limit]);

  useEffect (()=>{
    setPr(allPr.slice(0, limit));
  }, [allPr]);

  function handleSeeMore () {
    setLimit(limit + 5);
  }

  return [
    allPr, cloneAllPr, pr, limit, prOfBrand, isLoading, handleSeeMore, dispatch, handleSetPOB
  ];
}

export default usePr;