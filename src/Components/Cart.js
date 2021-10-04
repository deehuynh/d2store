import React, { useEffect, useState, useReducer, useContext} from 'react';
import {useStateValue} from './StateProvider';
import {Link} from 'react-router-dom';

function CartBtn () {
  const [cart, dispatch] = useStateValue();

  let total = 0;

  cart.forEach((item)=>{
    total += item.quantily;
  });

  return (
    <Link to='/cart' className="cart-btn">
      <i className="fas fa-shopping-cart"></i><span>Cart</span>
      {cart.length !== 0 ? <div className='notify-cart'>{total}</div> : ''}
    </Link>
  );
}

function Cart () {
  const [cart, dispatch] = useStateValue();

  const data = [];
  let display;
  let display2;
  if (!cart || cart.length === 0) {
    display = {display: 'block'};
    display2 = {display: 'none'}
  }

  let total = 0;

  cart && cart.forEach((item, index)=>{
      total += Number(item.price) * item.quantily;
      data.push(
        <div key={index} className='cart-pr'>
            <div className='cart-img'>
              <img src={item.image} />
            </div>
  
            <div className='cart-name'>
              <p>{item.name}</p>
              <span>${item.price}</span>
              <div className='cart-bar'>
                <div className='cart-remove' onClick={()=>{dispatch({type: 'REMOVE', id: item.id})}}><i className="far fa-times-circle"></i> Delete</div>
                <div className='cart-quantily'>
                  <div className='minus' onClick={()=>{dispatch({type: 'DECREASE', id: item.id})}}>-</div>
                  <div className='order-number'>{item.quantily}</div>
                  <div className='plus' onClick={()=>{dispatch({type: 'INCREASE', id: item.id})}}>+</div>
                </div>
                <div className='clear-fix'></div>
              </div>
            </div>
        </div>
      );
  });
  
  return (
    <div className='cart-content'>
      <h4>Your cart</h4>
      <div style={display} className='cart-error'>
        <p><i className="fas fa-cart-plus"></i> Your cart is empty</p>
        <span>Next step: add a device to your cart</span>
      </div>
      {data}
      <div style={display2} className='order-total'>
        <p>Order total <span>${Math.round((total + Number.EPSILON) * 100) / 100}</span></p>
      </div>
    </div>
  );
}

export {CartBtn, Cart};