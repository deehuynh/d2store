import React from 'react';

function SeeMore (props) {
    return (
        <div className='see-more-btn'>
            <button type='button' onClick={props.handleSeeMore}>See more</button>
        </div>
    );
}

export default SeeMore;