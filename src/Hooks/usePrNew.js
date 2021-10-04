import React, {useState, useEffect, useReducer} from 'react';
import fireDb from '../firebase';
import handleAction from './useRd';

function usePrNew (key) {
  const initState = [];
  const [allPr, dispatch] = useReducer(handleAction, initState);
  const [cloneAllPr, setCloneAllPr] = useState([]);
  const [limit, setLimit] = useState(0);
  const [pr, setPr] = useState([]);

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
    dispatch({type: 'INIT_DATA', payload: data});
    setCloneAllPr(data);
    setLimit(10);
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
    allPr, cloneAllPr, pr, limit, handleSeeMore, dispatch
  ];
}

export default usePrNew;