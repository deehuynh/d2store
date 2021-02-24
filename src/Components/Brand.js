import React, {useState, useEffect} from 'react';
import {BrandBar, FilterPrices, CustomBar, NoDataFound} from './Smartphone';
import {HighlightProductFrame} from './Home';
import usePrOfBrand from '../Hooks/usePrOfBrand';
import SeeMore from '../Components/SeeMoreBTN';
import useQuery from '../Hooks/useQuery';
import {
    useParams, useRouteMatch
} from 'react-router-dom';

export default function Brand (props) {

    const {name} = useParams();

    let query = useQuery();

    let type = query.get("of");

    let newType = type[0].toUpperCase() + type.slice(1);

    const [
      cloneAllPr, pr, handleSeeMore, limit, setPrConditional, lowToHigh,
      highToLow, unlock
    ] = usePrOfBrand(type, name);

    return (
        <>
          <BrandBar brands={props.brands} categoryDefault={newType} />
          <FilterPrices
            prices={props.price} type={type}
            setPrConditional={setPrConditional}
          />
          <CustomBar lowToHigh={lowToHigh} highToLow={highToLow} />
          <NoDataFound unlock={unlock} />
          <HighlightProductFrame detail={true} products={pr} hide='hide' baseUrl='smartphone' />
          {
            cloneAllPr.length > limit ?
            <SeeMore handleSeeMore={handleSeeMore} /> :
            null
          }
        </>
    );
}