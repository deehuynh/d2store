import React from 'react';
import {
    Link
  } from 'react-router-dom';

function BrandBox (props) {
      return (
        <span className="brand-box" onClick={()=>{props.handleBrand({name: props.name, id: props.id}); props.handleSetPOB(props.name)}}>
          <img src={props.img} />
        </span>
      );
}
  
  class BrandBar extends React.Component {
    render () {
      const category = this.props.categoryDefault;
      const brandData = [];
      let i = 0;
  
      this.props.brands.forEach((brand, index) => {
        brand.brandOf.map((brandOf)=>{
          if (brandOf === category) {
            brandData.push(
              <BrandBox
                img={brand.image} name={brand.name} key={index}
                handleBrand={this.props.handleBrand}
                handleSetPOB={this.props.handleSetPOB}
                id={i}
              />
            );
            i = i + 1;
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

export default BrandBar;