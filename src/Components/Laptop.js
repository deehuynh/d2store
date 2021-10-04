import React from 'react';
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
import {
  BrandBar, CustomBar, FilterPrices
} from '../Components/Smartphone';
import NoDataFound from './NoDataFound';
import useQuery from '../Hooks/useQuery';
import Loader from './Loader';

const prices = [
  {key:'0', price: "Under $500", type: 'under', value: [500]},
  {key:'1' ,price: "$500 - $1000", type: 'limit', value: [500, 1000]},
  {key:'2' ,price: "$1000 - $2000", type: 'limit', value: [1000, 2000]},
  {key:'3' ,price: "Over $2000", type: 'over', value: [2000]}
];

function Laptop (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const [allPr, cloneAllPr, pr, limit, prOfBrand, isLoading, handleSeeMore, dispatch, handleSetPOB] = usePr('laptop');

  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar brands={props.brands} categoryDefault="Laptop" handleSetPOB={handleSetPOB} handleBrand={(obj)=>{dispatch({type: 'BRAND', brand: obj, cloneState: cloneAllPr})}} />
        <FilterPrices prices={prices} handlePrice={(price)=>{dispatch({type: 'PRICE', price: price, prOfBrand: prOfBrand, cloneState: cloneAllPr})}}/>
        <CustomBar lowToHigh={()=>{dispatch({type: 'LOWTOHIGH'})}} highToLow={()=>{dispatch({type: 'HIGHTOLOW'})}} />
        {isLoading ? <Loader /> : <HighlightProductFrame detail={false} products={pr} hideram='hide' hide='hide' baseUrl='laptop' type='laptop' />}
        {allPr.length === 0 && isLoading === false ? <NoDataFound /> : null}
        {
          cloneAllPr.length > limit ?
          <SeeMore handleSeeMore={handleSeeMore} /> :
          null
        } 
      </Route>

      <Route path={`${path}/:prId`}>
        <DetailPr baseUrl='laptop' baseName='Laptop' prid={query.get("prid")} />
      </Route> 
    </Switch>
  );
}

export default Laptop;