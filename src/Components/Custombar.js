import React from 'react';

export default function CustomBar (props) {

    function toggle () {
      const sortList = document.getElementById('sort-list');
      if (sortList.style.display !== "block") {
        sortList.style.display = "block";
      } else {
        sortList.style.display = "none";
      }
    }
    return (
        <div id="custom-bar" onClick={()=>{toggle()}}>
          <span>Sort by</span>
          <div id="sort-list">
            <p id='sort-item-1' className="sort-item" onClick={()=>{props.lowToHigh()}}>Price low to high</p>
            <p id='sort-item-2' className="sort-item" onClick={()=>{props.highToLow()}}>Price high to low</p>
          </div>
        </div>
    );
}