import React from 'react';
import Header from './Header';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import SecondNavigation from './SecondNavigation';
import {Cart, CartBtn} from './Cart';
import {Footer, SupportFooter, AddressFooter, ContactFooter} from './Footer';
import {Home} from './Home';
import {Smartphone} from './Smartphone';
import Tablet from './Tablet';
import Laptop from './Laptop';
import TV from './TV';
import Help from './Help';
import PageNotFound from './404';
import Brand from './Brand';
import {Accessories} from './Accessories';
import {BrowserRouter as Router, Link, Route, Switch, NavLink} from 'react-router-dom';
import fireDb from '../firebase';

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
          <CartBtn />
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
            <Smartphone brands={this.state.brands} />
          </Route>

          <Route path="/tablet">
            <Tablet brands={this.state.brands} />
          </Route>

          <Route path="/laptop">
            <Laptop
              brands={this.state.brands}
            />
          </Route>

          <Route path="/tv">
            <TV brands={this.state.brands} />
          </Route>

          <Route path="/accessories">
            <Accessories />
          </Route>

          <Route path="/help">
            <Help />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>
      
        </Switch>
        </div>
      <Footer>
          <SupportFooter />
          <AddressFooter />
          <ContactFooter />
        <div className="clear-fix"></div>
        
      </Footer>
      <div className="footer-copyright">&copy; 2021 - D2store.com. Github: <a target='blank' href='https://github.com/deehuynh'>DeeHuynh</a></div>
      </div>
    );
  }
}

export default Layout;