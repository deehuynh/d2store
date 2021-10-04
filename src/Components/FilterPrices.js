import React from 'react';

export default function FilterPrices (props) {
    const priceRow = [];
    props.prices.forEach((data, index)=>{
      
      priceRow.push(
        // <NavLink key={index} to={`${this.props.type}/price=${data.value[0]}`} className="filter-prices-a" activeStyle={{fontWeight: "bold", color: "#0099ff"}}>{data.price}</NavLink>
        <span 
          key={index} id={`filter-prices-a-active${index}`} onClick={()=>{props.handlePrice({value: data.value, type: data.type, id: index})}}
          className="filter-prices-a"
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