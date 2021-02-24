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
  BrandBar, CustomBar, FilterPrices, NoDataFound
} from '../Components/Smartphone';
import useQuery from '../Hooks/useQuery';

function LaptopL (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const [
    allPr, pr, handleSeeMore, limit, currentPr, getCurrentPr,
    setPrConditional, unlock, cloneAllPr, lowToHigh, highToLow, selectBrand
  ] = usePrL('laptop');

  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar selectBrand={selectBrand} brands={props.brands} categoryDefault="Laptop" />
        <FilterPrices
          prices={props.price} type='laptop'
          setPrConditional={setPrConditional}
          totalP={3}
        />
        <CustomBar lowToHigh={lowToHigh} highToLow={highToLow} />
        <NoDataFound unlock={unlock} />
        <HighlightProductFrame detail={true} products={pr} hide='hide' baseUrl='laptop' />
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

function LaptopM (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const [
    allPr, pr, handleSeeMore, limit, currentPr, getCurrentPr,
    setPrConditional, unlock, cloneAllPr, lowToHigh, highToLow, selectBrand
  ] = usePr('laptop');

  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar selectBrand={selectBrand} brands={props.brands} categoryDefault="Laptop" />
        <FilterPrices
          prices={props.price} type='laptop'
          setPrConditional={setPrConditional}
          totalP={3}
        />
        <CustomBar lowToHigh={lowToHigh} highToLow={highToLow} />
        <NoDataFound unlock={unlock} />
        <HighlightProductFrame detail={true} products={pr} hide='hide' baseUrl='laptop' />
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

function Laptop (props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  if (isTabletOrMobile) {
    return <LaptopM brands={props.brands} price={props.price} />;
  }

  return <LaptopL brands={props.brands} price={props.price} />;
}

export default Laptop;