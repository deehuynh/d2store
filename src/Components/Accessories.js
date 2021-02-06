import React from 'react';
import {NavLink} from 'react-router-dom';

class AccessoryList extends React.Component {
  render () {
    const list = [];
    let i = 1;
    this.props.accessories.forEach((acsr, index)=>{
      list.push(
        <NavLink key={index} to={"/phu-kien/"+ i } className="accessory" activeStyle={{border: "1px solid orange"}}>
            <div><img src={acsr.image} /></div>
            <span>{acsr.name}</span>
        </NavLink>
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

class Accessories extends React.Component {
  render () {
    return this.props.children;
  }
}

export {Accessories,AccessoryList};