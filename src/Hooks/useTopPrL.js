import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

function useTopPr (type) {
  const [phone,setPhone] = useState(null);

  useEffect(()=>{
    fireDb.ref(type).orderByChild('public').equalTo(true).limitToLast(5).once('value', getPhone);
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

  /*if (phone !== null) {
    let tmp;
    for (let i = 0; i < phone.length - 1; i++) {
      for (let j = i + 1; j <= phone.length; j++) {
        if (phone[i] < phone[j]) {
          tmp = phone[j];
          phone[j] = phone[i];
          phone[i] = tmp;
        }
      }
    }
  }*/

  return phone;
}

export default useTopPr;