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
import NoDataIMG from '../images/nodata2.png';

class BrandBox extends React.Component {
  
  render () {
    const type = this.props.type.toLowerCase();
    return (
      <Link to={`/brand/${this.props.name}?of=${type}`} id={`brand${this.props.id}`} className="brand-box">
        <img src={this.props.img} />
      </Link>
    );
  }
}

class BrandBar extends React.Component {
  render () {
    const category = this.props.categoryDefault;
    const brandData = [];
    let i = 0;
    
    this.props.brands.forEach((brand, index) => {
      brand.brandOf.map((brandOf)=>{
        if (brandOf === category) {
          i = i + 1;
        }
      });
    });

    this.props.brands.forEach((brand, index) => {
      brand.brandOf.map((brandOf)=>{
        if (brandOf === category) {
          brandData.push(
            <BrandBox
              total={i}
              img={brand.image} type={category} name={brand.name} key={index}
              selectBrand={this.props.selectBrand}
              id={index}
            />
          );
        }
      });
    });
    return (
      <div className="brand-bar">
        {brandData}
      </div>
    );
  }
}

class FilterPrices extends React.Component {
  render () {
    const priceRow = [];
    this.props.prices.forEach((data, index)=>{
      
      priceRow.push(
        // <NavLink key={index} to={`${this.props.type}/price=${data.value[0]}`} className="filter-prices-a" activeStyle={{fontWeight: "bold", color: "#0099ff"}}>{data.price}</NavLink>
        <span 
          key={index} id={`filter-prices-a-active${index}`}
          className="filter-prices-a" onClick={()=>{this.props.setPrConditional(data, this.props.totalP)}}
        >{data.price}</span>
      );
    });
    return (
      <div className="filter-prices">
        <p>Price: </p>
        {priceRow}
      </div>
    );
  }
}

class CustomBar extends React.Component {

  toggle () {
    const sortList = document.getElementById('sort-list');
    if (sortList.style.display !== "block") {
      sortList.style.display = "block";
    } else {
      sortList.style.display = "none";
    }
  }

  render () {
    return (
      <div id="custom-bar" onClick={()=>{this.toggle()}}>
        <span>Sort by</span>
        <div id="sort-list">
          <p id='sort-item-1' className="sort-item" onClick={this.props.lowToHigh}>Price low to high</p>
          <p id='sort-item-2' className="sort-item" onClick={this.props.highToLow}>Price high to low</p>
        </div>
      </div>
    );
  }
}

function NoDataFound (props) {
  if (props.unlock === true) {
    return (
      <div className="no-data-found">
        <img src={NoDataIMG} />
      </div>
    );
  }

  return null;
  
}

function SmartphoneL (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const [
    allPr, pr, handleSeeMore, limit, currentPr, getCurrentPr,
    setPrConditional, unlock, cloneAllPr, lowToHigh, highToLow, selectBrand
  ] = usePrL('smartphone');
  
  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar selectBrand={selectBrand} brands={props.brands} categoryDefault="Smartphone" />
        <FilterPrices
          prices={props.price} type='smartphone' setPrConditional={setPrConditional}
          totalP={4}
        />
        <CustomBar lowToHigh={lowToHigh} highToLow={highToLow} />
        <NoDataFound unlock={unlock} />
        <HighlightProductFrame detail={true} products={pr} hide='hide' baseUrl='smartphone' />
        {
          cloneAllPr.length > limit ?
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

function SmartphoneM (props) {
  let {path, url} = useRouteMatch();
  let query = useQuery();
  
  const [
    allPr, pr, handleSeeMore, limit, currentPr, getCurrentPr,
    setPrConditional, unlock, cloneAllPr, lowToHigh, highToLow, selectBrand
  ] = usePr('smartphone');

  return (
    <Switch>
      <Route exact path={path}>
        <BrandBar selectBrand={selectBrand} brands={props.brands} categoryDefault="Smartphone" />
        <FilterPrices
          prices={props.price} type='smartphone'
          setPrConditional={setPrConditional}
          totalP={4}
        />
        <CustomBar lowToHigh={lowToHigh} highToLow={highToLow} />
        <NoDataFound unlock={unlock} />
        <HighlightProductFrame
          detail={true} products={pr} hide='hide' baseUrl='smartphone'
        />
        {
          cloneAllPr.length > limit ?
          <SeeMore handleSeeMore={handleSeeMore} /> :
          null
        }
      </Route>

      <Route path={`${path}/:prId`}>
        <DetailPr 
          baseUrl='smartphone' baseName='Smartphone' prid={query.get("prid")} 
        />
      </Route> 
    </Switch>
  );
}

function Smartphone (props) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  if (isTabletOrMobile) {
    return <SmartphoneM brands={props.brands} price={props.price} />;
  }

  return <SmartphoneL brands={props.brands} price={props.price} />;
}

export {Smartphone, BrandBar, FilterPrices, CustomBar, NoDataFound};