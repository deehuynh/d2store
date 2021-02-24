import React, {useState, useEffect, useReducer} from 'react';
import fireDb from '../firebase';
import {HighlightProductFrame} from './Home';
import SeeMore from '../Components/SeeMoreBTN';
import {
  BrowserRouter as Router, Link, Route, Switch, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom';
import useQuery from '../Hooks/useQuery';
import NoDataIMG from '../images/nodata2.png';
import DetailPr from './DetailPr';

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

function Accessories (props) {
  let {path, url} = useRouteMatch();
  const [acsrL, setAcsrL] = useState([]);

  useEffect (()=>{
    fireDb.ref("accessorytype").orderByChild('public').equalTo(true).once('value', getPr);
    function getPr (snapshot) {
      const data = [];
      snapshot.forEach((item)=>{
        let key = item.key;
        let val = item.val();
        data.push({...val, key: key });
      });
      setAcsrL(data);
    }
  }, []);

  return (
    <Switch>
      <Route path={path}>
        <AccessoryList accessories={acsrL} />
      </Route>
    </Switch>
  );
}

export {Accessories,AccessoryList};