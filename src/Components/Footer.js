import React from 'react';
import {Link} from 'react-router-dom';

class ContactFooter extends React.Component {
  render () {
    return (
      <div className="contact-footer">
        <p id="contact-title">Contact</p>
        <p className="contact-detail" style={{display: 'inline-block'}}><span id="f-fb"><i className="fab fa-facebook-square"></i></span></p>
        <p className="contact-detail" style={{display: 'inline-block'}}><span id="f-zl"><i className="fab fa-twitter"></i></span></p>
        <p className="contact-detail"><span id="f-sdt"><i style={{transform: 'rotate(90deg)'}} className="fas fa-phone"></i></span>1-877-737-1432</p>
        <p className="contact-detail"><span id="f-email"><i className="fas fa-envelope"></i></span>contact.d2shop@gmail.com</p>
      </div>
    );
  }
}

class AddressFooter extends React.Component {
  render () {
      return (
          <div className="address-footer">
              <span id="address-title">Store locations</span>
              <div>
                <p><i className="fas fa-map-marker-alt"></i> First store:</p> 
                <span>21756 California Street San Francisco</span></div>
              <div>
              <p><i className="fas fa-map-marker-alt"></i> Second store:</p> <span>84244 Corte Madera Town Center, Corte Madera, California</span>
              </div>
          </div>
      );
  }
}

class SupportFooter extends React.Component {
  render () {
    return (
      <div className="support-footer">
          <p>Customer service</p>
          <Link to="/help/warranty-policy?ar=-MTo5sIXXtXpD-BUan1H">Warranty policy</Link>
          <Link to="/help/returns--exchanges?ar=-MToJ2OKKGuHVVJG3E2j">Returns & exchanges</Link>
          <Link to="/help/online-ordering?ar=-MToJ_6oEyu4ZiwU0JKR">Online ordering</Link>
          <Link to="/help/installment-buying?ar=-MToKGFCVOj5Uj3rFpwZ">Installment buying</Link>
      </div>
    );
  }
}

class Footer extends React.Component {
  render () {
    return (
        <div className="footer">
            {this.props.children}
        </div>
    );
  }
}

export {Footer, SupportFooter, AddressFooter, ContactFooter};