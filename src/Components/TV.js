import React, {useState, useEffect, useReducer} from 'react';
import {
  BrowserRouter as Router, Link, Route, Switch, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom';
import fireDb from '../firebase';
/* OTHER COMPONENT */
import FilterPrices from './FilterPrices';
import BrandBar from './BrandBar';
import {HighlightProductFrame} from './Home';
import CustomBar from './Custombar';
import SeeMore from './SeeMoreBTN';
import DetailPr from './DetailPr';
import NoDataFound from './NoDataFound';
/* HOOKS */
import useQuery from '../Hooks/useQuery';
import usePr from '../Hooks/usePr';
import Loader from './Loader';


const prices = [
  {key:'0' ,price: "Under $200", type: 'under', value: [200]},
  {key:'1' ,price: "$200 - $500", type: 'limit', value: [200, 500]},
  {key:'2' ,price: "$500 - $1000", type: 'limit', value: [500, 1000]},
  {key:'3' ,price: "Over $1000", type: 'over', value: [1000]}
];

function TV (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  const [allPr, cloneAllPr, pr, limit, prOfBrand, isLoading, handleSeeMore, dispatch, handleSetPOB] = usePr('tv');

  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar brands={props.brands} categoryDefault="TV" handleSetPOB={handleSetPOB} handleBrand={(obj)=>{dispatch({type: 'BRAND', brand: obj, cloneState: cloneAllPr})}} />
        <FilterPrices prices={prices} handlePrice={(price)=>{dispatch({type: 'PRICE', price: price, prOfBrand: prOfBrand, cloneState: cloneAllPr})}}/>
        <CustomBar lowToHigh={()=>{dispatch({type: 'LOWTOHIGH'})}} highToLow={()=>{dispatch({type: 'HIGHTOLOW'})}} />
        { isLoading ? <Loader /> : <HighlightProductFrame detail={false} type='tv' hide='hide' products={pr} baseUrl='tv' />}
        {allPr.length === 0 && isLoading === false ? <NoDataFound /> : null}
        {
          allPr.length > limit ?
          <SeeMore handleSeeMore={handleSeeMore} /> :
          null
        }
      </Route>

      <Route path={`${path}/:prId`}>
        <DetailPr baseUrl='tv' baseName='TV' prid={query.get("prid")} />
      </Route> 
    </Switch>
  );
}

export default TV;