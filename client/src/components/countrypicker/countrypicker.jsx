import React, { useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {countries} from '../../api/api';
import {states} from '../../api/api';

const Countrypicker = ({ country, handlecountrychange, stchange }) => {

    const [fetchedcountries, setfetchedcountries] = useState([]);

    const [fetchedstates, setfetchedstates] = useState([])

    useEffect(()=>{
        const fetchcountries = async () => {
             setfetchedcountries(await countries());
        }

    fetchcountries();
    },[setfetchedcountries]);

    useEffect(()=>{
        const fetchstates = async () => {
             setfetchedstates(await states());
        }

    fetchstates();
    },[setfetchedstates]);

    console.log('Fetched countries', fetchedcountries, 'fetched states', fetchedstates)
    return(
    <div className="pb-4 d-flex justify-content-between">
    <FormControl>
        <NativeSelect defaultValue="" onChange={(e) => handlecountrychange(e.target.value)}>
            <option value="global">Pick a Country</option>
            {fetchedcountries?.map((country,i) => <option key={i} value={country.countryname}>{country.countryname}</option>)}
        </NativeSelect>
    </FormControl>
    <FormControl>
        <NativeSelect disabled={country?.country_name === 'India' ? 0 : 1} defaultValue="" onChange={(e) => stchange(e.target.value)}>
            <option value="global">Pick an Indian State</option>
            {fetchedstates?.map((state,i) => <option key={i} value={state.statename}>{state.statename}</option>)}
        </NativeSelect>
        <p style={{color : '#0003', fontSize:"11px"}}>*Enabled only when selected country is India</p>
    </FormControl>
    </div>
    )
}

export default Countrypicker;