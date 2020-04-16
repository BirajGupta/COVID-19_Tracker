import React, { useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {countries} from '../../api/api';

const Countrypicker = ({ handlecountrychange }) => {

    const [fetchedcountries, setfetchedcountries] = useState([]);

    useEffect(()=>{
        const fetchcountries = async () => {
             setfetchedcountries(await countries());
        }

    fetchcountries();
    },[setfetchedcountries]);

    console.log(fetchedcountries);

    return(
    <div className="pb-4">
    <FormControl>
        <NativeSelect defaultValue="" onChange={(e) => handlecountrychange(e.target.value)}>
            <option value="global">Pick a Country</option>
            {fetchedcountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>
    </FormControl>
    </div>
    )
}

export default Countrypicker;