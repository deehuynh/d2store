import React, {useState, useEffect, useRef} from 'react';
import fireDb from '../firebase';
import {Link} from 'react-router-dom';
import useFormatUrl from '../Hooks/useFormatUrl';

function ListData (props) {
  const data = [];
  const cData = props.data;
  let display = null;

  if (cData.length !== 0) {
    display = {display: 'block'}
    cData.forEach((item, index)=>{
      data.push(
        <DataC turnOff={props.turnOff} key={index} state={item} />
      );
    });
  }

  return (
    <div style={display} className='search-data'>
      {data}
    </div>
  );
}

function DataC (props) {
  let formatUrl = useFormatUrl(props.state.name);
  const item = props.state;
  return (
    <Link onClick={props.turnOff} to={`/${item.key}/${formatUrl}?prid=${item.id}`} className='search-data-item'>
          <p className='search-item-img'><img src={item.image} /></p>
          <p className='search-item-info'>
            <span style={{color: '#303030'}}>{item.name}</span>
            <span style={{color: '#dd0000'}}>${item.price}</span>
          </p>
    </Link>
  );
}

function SearchBar (props) {

  const listData = [];

  const [searchKey, setSearchKey] = useState('');
  const [value, setValue] = useState('');
  const [allPr, setAllPr] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(()=>{
    fireDb.ref().once('value', getAllPr);
  }, []);

  function getAllPr (snapshot) {
    let data = [];
    snapshot.forEach((item)=>{
      let key = item.key;
      let val = item.val();
      data.push({...val, key: key});
    });
    setAllPr(data);
  }

  let keyLength = searchKey.length;

  allPr.forEach((item)=>{
    if (item.key !== 'brands' && item.key !== 'help' && item.key !== 'accessorytype') {
      for (const sndItem in item) {
        if (item[sndItem].name !== undefined) {
          if (keyLength > 0) {
            if (item[sndItem].name.slice(0, keyLength).toLowerCase() === searchKey.toLowerCase()) {
              listData.push({...item[sndItem], key: item.key, id: sndItem});
            }
          }
        }
      }
    }
  });

  function turnOff () {
    setValue('');
    setSearchKey('');
    timeoutRef.current = null;
  }

  function handleChangeInput (e) {
    const cValue = e.target.value;
    setValue(e.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(()=>{
      setSearchKey(cValue);
    }, 800);

  }

  return (
    <>
      <div className="search-box">
        <input type="text" autoComplete='off' name="search-bar" placeholder="Search" onChange={(e)=>{handleChangeInput(e)}} value={value} />
        {
          searchKey !== '' ? <button type="button" name="btn-search" onClick={turnOff} ><i className="fas fa-times"></i></button> : <button type="button" name="btn-search" ><i className="fas fa-search"></i></button>
        }
      </div>

      <ListData turnOff={turnOff} data={listData} />
    </>
  );
}

export default SearchBar;