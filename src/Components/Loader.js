import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from 'react-loader-spinner';

export default function Loader (props) {
    return (
        <div className='loader-spinner'>
            <Spinner type="ThreeDots" color="#00BFFF" height={40} width={40} timeout={30000} />
        </div>
    );
}