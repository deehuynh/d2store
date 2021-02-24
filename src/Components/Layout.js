import React from 'react';
import Header from './Header';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import SecondNavigation from './SecondNavigation';
import Cart from './Cart';
import HContentBar from './HContentBar';
import {Footer, SupportFooter, AddressFooter, ContactFooter} from './Footer';
import {Home, HomeBanner, AddressBanner, HighlightProductFrame} from './Home';
import {Smartphone, BrandBar, FilterPrices, CustomBar} from './Smartphone';
import Tablet from './Tablet';
import Laptop from './Laptop';
import PC from './PC';
import Help from './Help';
import Brand from './Brand';
import {Accessories, AccessoryList} from './Accessories';
import {BrowserRouter as Router, Link, Route, Switch, NavLink} from 'react-router-dom';
import fireDb from '../firebase';

const COMPUTER = [
  {name: 'Acer Aspire XC-885 i5-8400', price: '9.790.000', image: 'https://cdn.tgdd.vn/Products/Images/5698/185050/may-tinh-bo-acer-aspire-xc-885-i5-8400-dtbaqsv010-600x600.jpg'},
  {name: 'HP ProDesk 400G4MT', price: '12.490.000', image: 'https://cdn.tgdd.vn/Products/Images/5698/154922/may-tinh-bo-hp-prodesk-400g4mt-i5-7500-4gb-1tb-2gb-1-org.jpg'}
];

const PRICESMARTPHONE = [
  {key:'0' ,price: "Under $100", type: 'under', value: [100]},
  {key:'1' ,price: "$100 - $200", type: 'limit', value: [100, 200]},
  {key:'2' ,price: "$200 - $500", type: 'limit', value: [200, 500]},
  {key:'3' ,price: "$500 - $1000", type: 'limit', value: [500, 1000]},
  {key:'4' ,price: "Over $1000", type: 'over', value: [1000]}
];

const PRICELAPTOP = [
  {key:'0', price: "Under $500", type: 'under', value: [500]},
  {key:'1' ,price: "$500 - $1000", type: 'limit', value: [500, 1000]},
  {key:'2' ,price: "$1000 - $2000", type: 'limit', value: [1000, 2000]},
  {key:'3' ,price: "Over $2000", type: 'over', value: [2000]}
];

class Layout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      brands: []
    };
    this.onBrandsHandle = this.onBrandsHandle.bind(this);
  }

  onBrandsHandle (snapshot) {
    const brands = [];
    snapshot.forEach((item)=>{
      var key = item.key;
      var data = item.val();
      brands.push({key: key, name: data.name, image: data.image, brandOf: data.brandOf});
    });
    this.setState({
      brands: brands
    });
  }

  componentDidMount () {
    fireDb.ref().child('brands').on('value', this.onBrandsHandle);
  }

  componentWillUnmount () {
    fireDb.ref().child('brands').off('value', this.onBrandsHandle);
  }

  render () {
    return (
      <div className="container">
        <Header>
        <Logo />
        <SearchBar />
        <Navigation>
          <NavLink to="/smartphone" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-mobile-alt"></i><span className="tab-name">Smartphone</span></NavLink>
          <NavLink to="/tablet" className="tabs" activeStyle={{color: "#00ccff"}}><i style={{transform: "rotate(90deg)"}} className="fas fa-tablet-alt"></i><span className="tab-name">Tablet</span></NavLink>
          <NavLink to="/laptop" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-laptop"></i><span className="tab-name">Laptop</span></NavLink>
          <NavLink to="/tv" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-tv" ></i><span className="tab-name">TV</span></NavLink>
          <NavLink to="/accessories" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-headphones-alt"></i><span className="tab-name">Accessories</span></NavLink>
          <NavLink to="/help" className="tabs" activeStyle={{color: "#00ccff"}}><i className="far fa-question-circle"></i><span className="tab-name">Help</span></NavLink>
        </Navigation>
        <Cart />
        </Header>
        <SecondNavigation>
                <NavLink to="/smartphone" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-mobile-alt"></i><span className="tab-name">Phone</span></NavLink>
                <NavLink to="/tablet" className="tabs" activeStyle={{color: "#00ccff"}}><i style={{transform: "rotate(90deg)"}} className="fas fa-tablet-alt"></i><span className="tab-name">Tablet</span></NavLink>
                <NavLink to="/laptop" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-laptop"></i><span className="tab-name">Laptop</span></NavLink>
                <NavLink to="/tv" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-tv" ></i><span className="tab-name">TV</span></NavLink>
                <NavLink to="/accessories" className="tabs" activeStyle={{color: "#00ccff"}}><i className="fas fa-headphones-alt"></i><span className="tab-name">Accessories</span></NavLink>
                <NavLink to="/help" className="tabs" activeStyle={{color: "#00ccff"}}><i className="far fa-question-circle"></i><span className="tab-name">Help</span></NavLink>
              </SecondNavigation>
              <div className='clear-fix'></div>
        <div id="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/smartphone">
            <Smartphone
              brands={this.state.brands}
              price={PRICESMARTPHONE} />
          </Route>

          <Route path="/tablet">
            <Tablet 
              brands={this.state.brands}
              price={PRICESMARTPHONE}
            />
          </Route>

          <Route path="/laptop">
            <Laptop
              brands={this.state.brands}
              price={PRICELAPTOP}
            />
          </Route>

          <Route path="/tv">
            <PC>
              <BrandBar brands={this.state.brands} categoryDefault="PC" />
              <FilterPrices prices={PRICELAPTOP} />
              <CustomBar />
              <HighlightProductFrame products={COMPUTER} />
            </PC>
          </Route>

          <Route path="/accessories">
            <Accessories />
          </Route>

          <Route path="/help">
            <Help />
          </Route>

          <Route path="/brand/:name">
            <Brand
              brands={this.state.brands}
              price={PRICESMARTPHONE}
            />
          </Route>
      
        </Switch>
        </div>
      <Footer>
          <SupportFooter />
          <AddressFooter />
          <ContactFooter />
        <div className="clear-fix"></div>
        
      </Footer>
      <div className="footer-copyright">&copy; 2021 - D2shop.com. All right reserved.</div>
      </div>
    );
  }
}

export default Layout;