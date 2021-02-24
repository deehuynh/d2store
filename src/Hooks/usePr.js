import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

function usePr (type) {
    const [limit, setLimit] = useState(0);
    const [allPr, setAllPr] = useState([]);
    const [cloneAllPr, setCloneAllPr] = useState([]);
    const [currentPr, setCurrentPr] = useState(null);

    useEffect(()=>{
      fireDb.ref(type).orderByChild('public').equalTo(true).once('value', getPr);
    },[]);
    function getPr (snapshot) {
      const data = [];
      snapshot.forEach((item)=>{
        let key = item.key;
        let val = item.val();
        data.push({...val, key: key });
      });
      setAllPr(data);
      setCloneAllPr(data.reverse());
      setLimit(6);
    }
  
    function getCurrentPr (pr) {
      setCurrentPr(pr);
    }
  
    const [pr, setPr] = useState([]);
    const [unlock, setUnlock] = useState(false);
    useEffect(()=>{
      setPr(cloneAllPr.slice(0,limit));
    },[limit]);

    useEffect (()=>{
      setPr(cloneAllPr.slice(0, limit));
    }, [cloneAllPr]);
  
    function handleSeeMore () {
      setLimit(limit + 6);
    }

    function setPrConditional (data, totalP) {

      let id1 = document.getElementById('sort-item-1');
      let id2 = document.getElementById('sort-item-2');
      id1.style.color = '#404040';
      id2.style.color = '#404040';
      for (let i = 0; i <= totalP; i++) {
        let j = i.toString();
        if (data.key === j) {
          document.getElementById("filter-prices-a-active" + j).style.fontWeight = '700';
        } else {
          document.getElementById("filter-prices-a-active" + j).style.fontWeight = '400';
        }
      }
      
      let price = data.value;
      let type = data.type;
      if (price.length === 1 && type === 'under') {
        const output = [];
        allPr.forEach((item)=>{
          let num = Number(item.price);
          if (num <= price[0]) {
            output.push(item);
          }
        });
        if (output.length === [].length) {
          setCloneAllPr(output);
          setUnlock(true);
        } else {
          setCloneAllPr(output);
          setUnlock(false);
          setLimit(6);
        }
      }

      if (price.length === 1 && type === 'over') {
        const output = [];
        allPr.forEach((item)=>{
          let num = Number(item.price);
          if (num >= price[0]) {
            output.push(item);
          }
        });
        if (output.length === [].length) {
          setCloneAllPr(output);
          setUnlock(true);
        } else {
          setCloneAllPr(output);
          setUnlock(false);
          setLimit(6);
        }
      }

      if (price.length === 2 && type === 'limit') {
        const star = price[0];
        const end = price[1];
        const output = [];
        allPr.forEach((item)=>{
          let num = Number(item.price);
          if (num >= star && num <= end) {
            output.push(item);
          }
        });
        if (output.length === [].length) {
          setCloneAllPr(output);
          setUnlock(true);
        } else {
          setCloneAllPr(output);
          setUnlock(false);
          setLimit(6);
        }
      }
    }

    function lowToHigh () {
      let id1 = document.getElementById('sort-item-1');
      let id2 = document.getElementById('sort-item-2');
      id1.style.color = '#0077ff';
      id2.style.color = '#404040';

      let tmp;
      for (let i = 0; i < cloneAllPr.length - 1; i++) {
        for (let j = i + 1; j < cloneAllPr.length; j++) {
          if (Number(cloneAllPr[i].price) > Number(cloneAllPr[j].price)) {
            tmp = cloneAllPr[i];
            cloneAllPr[i] = cloneAllPr[j]
            cloneAllPr[j] = tmp;
          }
        }
      }
      const newArr = [...cloneAllPr];
      setCloneAllPr(newArr);
      
    }

    function highToLow () {
      let id1 = document.getElementById('sort-item-1');
      let id2 = document.getElementById('sort-item-2');
      id1.style.color = '#404040';
      id2.style.color = '#0077ff';
      let tmp;
      for (let i = 0; i < cloneAllPr.length - 1; i++) {
        for (let j = i + 1; j < cloneAllPr.length; j++) {
          if (Number(cloneAllPr[i].price) < Number(cloneAllPr[j].price)) {
            tmp = cloneAllPr[i];
            cloneAllPr[i] = cloneAllPr[j]
            cloneAllPr[j] = tmp;
          }
        }
      }
      const newArr = [...cloneAllPr];
      setCloneAllPr(newArr);
      
    }

    function selectBrand (id, name, total) {

      const output = [];

      allPr.forEach((item)=>{
        if (item.brand === name) {
          output.push(item);
        }
      });

      setCloneAllPr(output);
    }

    return [
      allPr, pr, handleSeeMore, limit, currentPr , getCurrentPr,
      setPrConditional, unlock, cloneAllPr, lowToHigh, highToLow,
      selectBrand
    ];
}

export default usePr;