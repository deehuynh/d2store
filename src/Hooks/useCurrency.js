import React, {useState, useEffect} from 'react';

function useCurrency (price) {
    let currency = Number(price);
    return currency.toLocaleString(
        'en-US',
        {style:'currency', currency:'USD'}
    );
}

export default useCurrency;