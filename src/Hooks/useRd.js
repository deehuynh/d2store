import React, {useState, useEffect} from 'react';

const handleAction = (state, action) => {
    let id1 = document.getElementById('sort-item-1');
    let id2 = document.getElementById('sort-item-2');
    let class1 = document.getElementsByClassName("filter-prices-a");
    let class2 = document.getElementsByClassName("accessory");
    let class3 = document.getElementsByClassName("brand-box");
    let classLength3 = class3.length;
    let classLength2 = class2.length;
    let classLength = class1.length;

    const acsrt = [];
    const acsr = [];
    const brand = [];
    switch (action.type) {
      case 'INIT_DATA':
        return action.payload;
      case 'BRAND' :
        id1.style.color = '#404040';
        id2.style.color = '#404040';

        for (let i = 0; i < classLength; i++) {
          class1[i].style.fontWeight = '400';
        }
        
        for (let i = 0; i < classLength3; i++) {
          if (action.brand.id === i) {
            class3[i].style.border = '1px solid rgba(0, 204, 255)';
          } else {
            class3[i].style.border = '1px solid rgba(0,0,0, 0.065)';
          }
        }
        action.cloneState.forEach((item)=>{
          if (action.brand.name === item.brand) {
            brand.push(item);
          }
        });
        return brand;
      case 'ACSRT':
        id1.style.color = '#404040';
        id2.style.color = '#404040';

        for (let i = 0; i < classLength; i++) {
          class1[i].style.fontWeight = '400';
        }
  
        for (let i = 0; i < classLength2; i++) {
          if (action.acsrt.id === i) {
            class2[i].style.border = '1px solid rgba(0, 204, 255)';
            class2[i].style.color = ' rgb(0, 204, 255) ';
          } else {
            class2[i].style.border = '1px solid rgba(0, 0, 0, 0.065)';
            class2[i].style.color = '#505050';
          }
        }
        action.cloneState.forEach((item)=>{
          if (action.acsrt.name === item.type) {
            acsrt.push(item);
          }
        });
        return acsrt;
      case 'PRICE':
        id1.style.color = '#404040';
        id2.style.color = '#404040';
        
        const data = [];
        let pL = action.price.value.length;
        let pT = action.price.type;
        if (pL === 1 && pT === 'under') {
          for (let i = 0; i < classLength; i++) {
            if (action.price.id === i) {
              class1[i].style.fontWeight = '700';
            } else {
              class1[i].style.fontWeight = '400';
            }
          }
          action.cloneState.forEach((item)=>{
            if (Number(item.price) < action.price.value[0]) {
              if (action.prOfBrand !== 'none') {
                if (item.brand === action.prOfBrand) {
                  acsr.push(item);
                }
              } else {
                data.push(item);
              }
            }
          });
          
          if (acsr.length !== 0) {
            return acsr;
          }
  
          return data;
  
        }
  
        if (pL === 1 && pT === 'over') {
          for (let i = 0; i < classLength; i++) {
            if (action.price.id === i) {
              class1[i].style.fontWeight = '700';
            } else {
              class1[i].style.fontWeight = '400';
            }
          }
          action.cloneState.forEach((item)=>{
            if (Number(item.price) > action.price.value[0]) {
              if (action.prOfBrand !== 'none') {
                if (item.brand === action.prOfBrand) {
                  acsr.push(item);
                }
              } else {
                data.push(item);
              }
            }
          });
          if (acsr.length !== 0) {
            return acsr;
          }
  
          return data;
        }
  
        if (pL === 2 && pT === 'limit') {
          for (let i = 0; i < classLength; i++) {
            if (action.price.id === i) {
              class1[i].style.fontWeight = '700';
            } else {
              class1[i].style.fontWeight = '400';
            }
          }
          action.cloneState.forEach((item)=>{
            if (Number(item.price) > action.price.value[0] && Number(item.price) < action.price.value[1]) {
              if (action.prOfBrand !== 'none') {
                if (item.brand === action.prOfBrand) {
                  acsr.push(item);
                }
              } else {
                data.push(item);
              }
            }
          });
          if (acsr.length !== 0) {
            return acsr;
          }
  
          return data;
        }
      case 'LOWTOHIGH':
        id1.style.color = '#0077ff';
        id2.style.color = '#404040';
        let arr = [...state];
        let swap = false;
        let tmp;
        for (let i = 0; i < arr.length - 1; i++) {
          swap = false;
          for (let j = i + 1; j < arr.length; j++) {
            if (Number(arr[i].price) > Number(arr[j].price)) {
              tmp = arr[i];
              arr[i] = arr[j]
              arr[j] = tmp;
              swap = true;
            }
          }
          if (!swap) {
            return arr;
          }
        };
        return arr;
      case 'HIGHTOLOW':
        id1.style.color = '#404040';
        id2.style.color = '#0077ff';
        let arr1 = [...state];
        let swap1 = false;
        let tmp1;
        for (let i = 0; i < arr1.length - 1; i++) {
          swap1 = false;
          for (let j = i + 1; j < arr1.length; j++) {
            if (Number(arr1[i].price) < Number(arr1[j].price)) {
              tmp1 = arr1[i];
              arr1[i] = arr1[j]
              arr1[j] = tmp1;
              swap1 = true;
            }
          }
          if (!swap1) {
            return arr1;
          }
        };
        return arr1;
      default:
        throw new Error();
    }
}

export default handleAction;