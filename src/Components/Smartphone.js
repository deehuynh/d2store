import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';
import {HighlightProductFrame} from './Home';
import SeeMore from '../Components/SeeMoreBTN';
import {
  BrowserRouter as Router, Link, Route, Switch, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom';
import DetailPr from './DetailPr';
import usePr from '../Hooks/usePr';
import usePrL from '../Hooks/usePrL';
import {useMediaQuery} from 'react-responsive';
import useQuery from '../Hooks/useQuery';
import CustomBar from './Custombar';
import FilterPrices from './FilterPrices';
import BrandBar from './BrandBar';
import Loader from './Loader';
import NoDataFound from './NoDataFound';

const prices = [
  {key:'0' ,price: "Under $100", type: 'under', value: [100]},
  {key:'1' ,price: "$100 - $200", type: 'limit', value: [100, 200]},
  {key:'2' ,price: "$200 - $500", type: 'limit', value: [200, 500]},
  {key:'3' ,price: "$500 - $1000", type: 'limit', value: [500, 1000]},
  {key:'4' ,price: "Over $1000", type: 'over', value: [1000]}
];

function Smartphone (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();

  const [allPr, cloneAllPr, pr, limit, prOfBrand, isLoading, handleSeeMore, dispatch, handleSetPOB] = usePr('smartphone');
  
  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar handleSetPOB={handleSetPOB} brands={props.brands} categoryDefault="Smartphone" handleBrand={(obj)=>{dispatch({type: 'BRAND', brand: obj, cloneState: cloneAllPr})}} />
        <FilterPrices prices={prices} handlePrice={(price)=>{dispatch({type: 'PRICE', price: price, prOfBrand: prOfBrand, cloneState: cloneAllPr})}}/>
        <CustomBar lowToHigh={()=>{dispatch({type: 'LOWTOHIGH'})}} highToLow={()=>{dispatch({type: 'HIGHTOLOW'})}} />
        {isLoading === true ? <Loader /> : <HighlightProductFrame detail={true} products={pr} hide='hide' baseUrl='smartphone' />}
        {allPr.length === 0 && isLoading === false ? <NoDataFound /> : null}
        {
          allPr.length > limit ?
          <SeeMore handleSeeMore={handleSeeMore} /> :
          null
        }
      </Route>

      <Route path={`${path}/:prId`}>
        <DetailPr baseUrl='smartphone' baseName='Smartphone' prid={query.get("prid")} />
      </Route> 
    </Switch>
  );
}

export {Smartphone, BrandBar, FilterPrices, CustomBar, NoDataFound};