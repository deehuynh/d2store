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
import {Accessories, AccessoryList} from './Accessories';
import {BrowserRouter as Router, Link, Route, Switch, NavLink} from 'react-router-dom';
import fireDb from '../firebase';


const SMARTPHONE = [
  {name: 'OPPO Reno3',price: '8.990.000',image: 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-red-400x400.jpg'},
  {name: 'iPhone 11 64GB',price: '21.990.000',image: 'https://cdn.tgdd.vn/Products/Images/42/213591/oppo-reno3-trang-600x600-400x400.jpg'},
  {name: 'Vsmart Live 4 6GB',price: '4.490.000',image: 'https://cdn.tgdd.vn/Products/Images/42/227529/vsmart-live-4-6gb-245420-075418-600x600.jpg'},
  {name: 'OPPO Reno4 Pro',price: '11.990.000',image: 'https://cdn.tgdd.vn/Products/Images/42/223497/oppo-reno4-pro-274720-034747-600x600.jpg'},
  {name: 'Xiaomi Redmi Note 8',price: '4.490.000',image: 'https://cdn.tgdd.vn/Products/Images/42/209535/xiaomi-redmi-note-8-white-600x600.jpg'},
  {name: 'Xiaomi Redmi Note 8',price: '4.490.000',image: 'https://cdn.tgdd.vn/Products/Images/42/209535/xiaomi-redmi-note-8-white-600x600.jpg'}
];

const TABLET = [
  {name: 'Samsung Galaxy Tab S6',price: '18.490.000',image: 'https://cdn.tgdd.vn/Products/Images/522/208870/samsung-galaxy-tab-s6-400x400.jpg'},
  {name: 'Masstel Tab 10 Pro',price: '2.590.000',image: 'https://cdn.tgdd.vn/Products/Images/522/211155/masstel-tab10-pro-gold-2-400x400.jpg'},
  {name: 'Lenovo Tab M8',price: '3.490.000',image: 'https://cdn.tgdd.vn/Products/Images/522/222806/lenovo-tab-m8-tb-8505x400x400-400x400.jpg'},
  {name: 'iPad Pro 12.9 inch (2020)',price: '27.990.000',image: 'https://cdn.tgdd.vn/Products/Images/522/221775/ipad-pro-12-9-inch-wifi-128gb-2020-xam-600x600-1-200x200.jpg'},
  {name: 'iPad Pro 12.9 inch (2020)',price: '27.990.000',image: 'https://cdn.tgdd.vn/Products/Images/522/221775/ipad-pro-12-9-inch-wifi-128gb-2020-xam-600x600-1-200x200.jpg'},
  {name: 'Mobell Tab 10',price: '3.290.000',image: 'https://cdn.tgdd.vn/Products/Images/522/187172/mobell-tab-10-33397-1-thumb1-400x400.jpg'}
];

const LAPTOP = [
  {name: 'HP 15s du2050TX i3 1005G1',price: '12.390.000',image: 'https://cdn.tgdd.vn/Products/Images/44/224065/hp-15s-du2050tx-i3-1m8w2pa-usb-224065-400x400.jpg'},
  {name: 'Asus VivoBook X509JA i3',price: '10.890.000',image: 'https://cdn.tgdd.vn/Products/Images/44/225608/asus-vivobook-x509ja-i3-ej480t-225608-400x400.jpg'},
  {name: 'Lenovo IdeaPad Slim 3 15IIL05',price: '12.990.000',image: 'https://cdn.tgdd.vn/Products/Images/44/223534/lenovo-ideapad-3-15iil05-i3-81we003rvn-013920-053901-400x400.jpg'},
  {name: 'Lenovo IdeaPad S145 15IIL i3',price: '11.490.000',image: 'https://cdn.tgdd.vn/Products/Images/44/216292/lenovo-ideapad-s145-81w8001xvn-a4-216292-400x400.jpg'},
  {name: 'Lenovo IdeaPad S145 15IIL i3',price: '11.490.000',image: 'https://cdn.tgdd.vn/Products/Images/44/216292/lenovo-ideapad-s145-81w8001xvn-a4-216292-400x400.jpg'},
  {name: 'Acer Aspire 3 A315 54K 37B0',price: '10.990.000',image: 'https://cdn.tgdd.vn/Products/Images/44/221251/acer-aspire-3-a315-nx-heesv-00d-221251-1-600x600.jpg'}
];

const COMPUTER = [
  {name: 'Acer Aspire XC-885 i5-8400', price: '9.790.000', image: 'https://cdn.tgdd.vn/Products/Images/5698/185050/may-tinh-bo-acer-aspire-xc-885-i5-8400-dtbaqsv010-600x600.jpg'},
  {name: 'HP ProDesk 400G4MT', price: '12.490.000', image: 'https://cdn.tgdd.vn/Products/Images/5698/154922/may-tinh-bo-hp-prodesk-400g4mt-i5-7500-4gb-1tb-2gb-1-org.jpg'}
];

// API Brand
const BRANDS = [
  // Smartphone
  {name: 'iphone', img: 'https://cdn.tgdd.vn/Brand/1/iPhone-(Apple)42-b_16.jpg', category: 'smartphone'},
  {name: 'oppo', img: 'https://cdn.tgdd.vn/Brand/1/OPPO42-b_27.png', category: 'smartphone'},
  {name: 'realme', img: 'https://cdn.tgdd.vn/Brand/1/Realme42-b_37.png', category: 'smartphone'},
  {name: 'xiaomi', img: 'https://cdn.tgdd.vn/Brand/1/Xiaomi42-b_45.jpg', category: 'smartphone'},
  {name: 'vsmart', img: 'https://cdn.tgdd.vn/Brand/1/Vsmart42-b_40.png', category: 'smartphone'},
  {name: 'samsung', img: 'https://cdn.tgdd.vn/Brand/1/Samsung42-b_25.jpg', category: 'smartphone'},
  {name: 'vivo', img: 'https://cdn.tgdd.vn/Brand/1/Vivo42-b_50.jpg', category: 'smartphone'},
  {name: 'nokia', img: 'https://cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg', category: 'smartphone'},
  // Tablet
  {name: 'ipad', img: 'https://cdn.tgdd.vn/Brand/1/iPad-(Apple)522-b_28.jpg', category: 'tablet'},
  {name: 'samsung', img: 'https://cdn.tgdd.vn/Brand/1/Samsung522-b_30.jpg', category: 'tablet'},
  {name: 'huawei', img: 'https://cdn.tgdd.vn/Brand/1/Huawei522-b_4.jpg', category: 'tablet'},
  {name: 'lenovo', img: 'https://cdn.tgdd.vn/Brand/1/Lenovo522-b_29.jpg', category: 'tablet'},
  {name: 'masstel', img: 'https://cdn.tgdd.vn/Brand/1/Masstel522-b_35.png', category: 'tablet'},
  {name: 'mobell', img: 'https://cdn.tgdd.vn/Brand/1/Mobell522-b_30.jpg', category: 'tablet'},
  //Laptop
  {name: 'macbook', img: 'https://cdn.tgdd.vn/Brand/1/Macbook44-b_41.png', category: 'laptop'},
  {name: 'dell', img: 'https://cdn.tgdd.vn/Brand/1/Dell44-b_2.jpg', category: 'laptop'},
  {name: 'asus', img: 'https://cdn.tgdd.vn/Brand/1/Asus44-b_20.jpg', category: 'laptop'},
  {name: 'hp', img: 'https://cdn.tgdd.vn/Brand/1/HP-Compaq44-b_36.jpg', category: 'laptop'},
  {name: 'acer', img: 'https://cdn.tgdd.vn/Brand/1/Acer44-b_37.jpg', category: 'laptop'},
  {name: 'msi', img: 'https://cdn.tgdd.vn/Brand/1/MSI44-b_17.png', category: 'laptop'},
  {name: 'lenovo', img: 'https://cdn.tgdd.vn/Brand/1/Lenovo44-b_50.jpg', category: 'laptop'},
  //Macbook
  {name: 'hp', img: 'https://cdn.tgdd.vn/Brand/1/HP-Compaq44-b_36.jpg', category: 'pc'},
  {name: 'acer', img: 'https://cdn.tgdd.vn/Brand/1/Acer44-b_37.jpg', category: 'pc'}
];

const PRICESMARTPHONE = [
  {price: "Dưới 2 triệu"},
  {price: "2 - 4 triệu"},
  {price: "4 - 7 triệu"},
  {price: "7 - 10 triệu"},
  {price: "Trên 10 triệu"}
];

const PRICELAPTOP = [
  {price: "Dưới 10 triệu"},
  {price: "10 - 15 triệu"},
  {price: "15 - 25 triệu"},
  {price: "Trên 25 triệu"}
];

const PRICEACCESSORY = [
  {price: "Dưới 200K"},
  {price: "200K - 1 triệu"},
  {price: "1 triệu - 2 triệu"},
  {price: "Trên 2 triệu"}
];

const ACCESSORIESCATEGORY = [
  {name: 'Sạc', image: 'https://cdn.tgdd.vn/ValueIcons/1/logo-filter.png'},
  {name: 'Cáp', image: 'https://cdn.tgdd.vn/ValueIcons/1/type-c-lightning-2.jpg'},
  {name: 'Tai nghe', image: 'https://cdn.tgdd.vn/Category/54/Tai-nghe-l-21-10-2019.png'},
  {name: 'Ốp lưng', image: 'https://cdn.tgdd.vn/Category/60/Op-lung-dien-thoai-l-21-10-2019.png'},
  {name: 'Pin sạc dự phòng', image: 'https://cdn.tgdd.vn/Category/57/Pin-sac-du-phong-l-21-10-2019.png'},
  {name: 'USB', image: 'https://cdn.tgdd.vn/Category/75/USB-l-20-11-2019.png'},
  {name: 'Thẻ nhớ', image: 'https://cdn.tgdd.vn/Category/55/The-nho-l-21-10-2019.png'},
  {name: 'Chuột', image: 'https://cdn.tgdd.vn/Category/86/Chuot-may-tinh-l-09-12-2019.png'},
  {name: 'Móc điện thoại', image: 'https://cdn.tgdd.vn/Category/7924/de,-moc-dien-thoai-l-21-10-2019.png'},
  {name: 'Miếng dán màn hình', image: 'https://cdn.tgdd.vn/Category/1363/Mieng-dan-dien-thoai-l-21-10-2019.png'},
  {name: 'Loa', image: 'https://cdn.tgdd.vn/Category/2162/Loa-l-21-04-2020.png'}
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
            <Smartphone>
              <BrandBar brands={this.state.brands} categoryDefault="Smartphone" />
              <FilterPrices prices={PRICESMARTPHONE} />
              <CustomBar />
              <HighlightProductFrame products={SMARTPHONE} />
            </Smartphone>
          </Route>

          <Route path="/tablet">
            <Tablet>
              <BrandBar brands={this.state.brands} categoryDefault="Tablet" />
              <FilterPrices prices={PRICESMARTPHONE} />
              <CustomBar />
              <HighlightProductFrame products={TABLET} />
            </Tablet>
          </Route>

          <Route path="/laptop">
            <Laptop>
              <BrandBar brands={this.state.brands} categoryDefault="Laptop" />
              <FilterPrices prices={PRICELAPTOP} />
              <CustomBar />
              <HighlightProductFrame products={LAPTOP} type={1} />
            </Laptop>
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
            <Accessories>
              <AccessoryList accessories={ACCESSORIESCATEGORY} />
              <FilterPrices prices={PRICEACCESSORY} />
              <CustomBar />
            </Accessories>
          </Route>

          <Route path="/help">
            <Smartphone>
              <p>Ho tro</p>
            </Smartphone>
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