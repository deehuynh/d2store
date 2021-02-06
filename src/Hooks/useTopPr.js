import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

function useTopPr (type) {
  const [phone,setPhone] = useState(null);

  useEffect(()=>{
    fireDb.ref(type).orderByChild('public').equalTo(true).limitToLast(6).once('value', getPhone);
  },[]);

  function getPhone (snapshot) {
    let data = [];
    snapshot.forEach((item)=>{
      let key = item.key;
      let val = item.val();
      data.push({...val, key: key});
    });
    setPhone(data);
  }

  return phone;
}

export default useTopPr;