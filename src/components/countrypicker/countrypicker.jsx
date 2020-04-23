import React, { useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {countries} from '../../api/api';
import {states} from '../../api/api';

const Countrypicker = ({ handlecountrychange, stchange }) => {

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


    return(
    <div className="pb-4">
    <FormControl>
        <NativeSelect defaultValue="" onChange={(e) => handlecountrychange(e.target.value)}>
            <option value="global">Pick a Country</option>
            {fetchedcountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>
    </FormControl>
    <FormControl>
        <NativeSelect defaultValue="" onChange={(e) => stchange(e.target.value)}>
            <option value="global">Pick an Indian State</option>
            {fetchedstates.map((state,i) => <option key={i} value={state.state}>{state.state}</option>)}
        </NativeSelect>
    </FormControl>
    </div>
    )
}

export default Countrypicker;