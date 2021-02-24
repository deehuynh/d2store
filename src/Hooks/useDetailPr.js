import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

function useDetailPr (baseUrl) {
    const [allPr, setAllPr] = useState([]);
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
    return allPr;
}

export default useDetailPr;