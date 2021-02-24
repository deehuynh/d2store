import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';

export default function useGetDataKey (primaryKey) {
    const [state, setState] = useState([]);
    useEffect (()=>{
        fireDb.ref(primaryKey).once('value', getData);
    }, []);

    function getData (snapshot) {
        let data = [];
        snapshot.forEach((item)=>{
          let key = item.key;
          let val = item.val();
          data.push({...val, key: key});
        });
        setState(data);
    }

    return state;
}