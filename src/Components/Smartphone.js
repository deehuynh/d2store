import React from 'react';
import '../Style/products.css';
import {NavLink} from 'react-router-dom';
import FilterUrl from './FilterUrl';

class BrandBox extends React.Component {
  render () {
    return (
      <div className="brand-box">
        <img src={this.props.img} />
      </div>
    );
  }
}

class BrandBar extends React.Component {
  render () {
    const category = this.props.categoryDefault;
    const brandData = [];
    this.props.brands.forEach((brand, index) => {
      brand.brandOf.map((brandOf)=>{
        if (brandOf === category) {
          brandData.push(
            <BrandBox img={brand.image} key={index} />
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
        <NavLink key={index} to={'/dien-thoai/' + data.price} className="filter-prices-a" activeStyle={{fontWeight: "bold", color: "#0099ff"}}>{data.price}</NavLink>
      );
    });
    return (
      <div className="filter-prices">
        Chọn mức giá:
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
        <span>Sắp xếp</span>
        <div id="sort-list">
          <p className="sort-item">Nổi bật nhất</p>
          <p className="sort-item">Bán chạy nhất</p>
          <p className="sort-item">Giá thấp đến cao</p>
          <p className="sort-item">Giá cao đến thấp</p>
        </div>
      </div>
    );
  }
}

class Smartphone extends React.Component {
  render () {
    return this.props.children;
  }
}

export {Smartphone, BrandBar, FilterPrices, CustomBar};