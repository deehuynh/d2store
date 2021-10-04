import React, {useState, useEffect, useReducer, useRef} from 'react';
import fireDb from '../firebase';
import {HighlightProductFrame} from './Home';
import SeeMore from '../Components/SeeMoreBTN';
import {
  BrowserRouter as Router, Link, Route, Switch, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom';
import NoDataFound from './NoDataFound';
import useQuery from '../Hooks/useQuery';
import DetailPr from './DetailPr';
import useGetData from '../Hooks/useGetData';
import handleAction from '../Hooks/useRd2';
import FilterPrices from './FilterPrices';
import CustomBar from './Custombar';
import Loader from './Loader';

class AccessoryList extends React.Component {
  render () {
    const list = [];
    let i = 1;
    this.props.accessories.forEach((acsr, index)=>{
      list.push(
        <span key={index} className="accessory" onClick={()=>{this.props.handleAcsrTpye({name: acsr.name, id: index}); this.props.handleSetCAP(acsr.name)}}>
            <div><img src={acsr.image} /></div>
            <span>{acsr.name}</span>
        </span>
      );
      i += 1;
    });
    return (
      <div className="accessory-list">
          {list}
      </div>
    );
  }
}

const prices = [
  {key:'0' ,price: "Under $25", type: 'under', value: [25]},
  {key:'1' ,price: "$25 - $50", type: 'limit', value: [25, 50]},
  {key:'2' ,price: "$50 - $100", type: 'limit', value: [50, 100]},
  {key:'3' ,price: "Over $100", type: 'over', value: [100]}
];

function Accessories (props) {
  let query = useQuery();
  let {path, url} = useRouteMatch();
  const initState = [];
  const [pr, setPr] = useState([]);
  const [limit, setLimit] = useState(0);
  const [allPr, dispatch] = useReducer(handleAction, initState);
  const [cloneAllPr, setCloneAllPr] = useState([]);
  const [acsrType, setAcsrType] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  function handleSetCAP (state) {
    setAcsrType(state);
  }

  const acsrT = useGetData("accessorytype");

  useEffect(()=>{
    fireDb.ref("accessories").orderByChild('public').equalTo(true).once('value', getPr);
  },[]);

  function getPr (snapshot) {
    const data = [];
    snapshot.forEach((item)=>{
      let key = item.key;
      let val = item.val();
      data.push({...val, key: key });
    });
    dispatch({type: 'INIT_DATA', payload: data});
    setCloneAllPr(data);
    setIsLoading(false);
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

  return (
    <Switch>
      <Route exact path={path}>
        {
        isLoading ? <Loader /> :
        <>
          <AccessoryList handleSetCAP={handleSetCAP} accessories={acsrT} handleAcsrTpye={(obj)=>{dispatch({type: 'ACSRT', acsrt: obj, cloneState: cloneAllPr})}} />
          <FilterPrices prices={prices} handlePrice={(price)=>{dispatch({type: 'PRICE', price: price, acsrType: acsrType, cloneState: cloneAllPr})}} />
          <CustomBar lowToHigh={()=>{dispatch({type: 'LOWTOHIGH'})}} highToLow={()=>{dispatch({type: 'HIGHTOLOW'})}} /> 
          <HighlightProductFrame detail={false} hide='hide' products={pr} baseUrl='accessories' />
        </>
        }
        {allPr.length === 0 && isLoading === false ? <NoDataFound /> : null}
        {
          allPr.length > limit ?
          <SeeMore handleSeeMore={handleSeeMore} /> :
          null
        }
      </Route>

      <Route path={`${path}/:prId`}>
        <DetailPr baseUrl='accessories' baseName='Accessories' prid={query.get("prid")} />
      </Route> 
    </Switch>
  );
}

export {Accessories, AccessoryList, FilterPrices, CustomBar};