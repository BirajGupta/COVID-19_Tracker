import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const stateurl = 'https://api.covid19india.org';

export const fetchdata = async (country) => {
    let changeableurl = url; 

    if(country){
        changeableurl = `${url}/countries/${country}` 
        
    }

    try{
        const { data : {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableurl)
        
        return {confirmed, recovered, deaths, lastUpdate}
        
    
    }
    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths : dailyData.deaths.total,
                date: dailyData.reportDate,
        }));
        
        return modifiedData;
    }
    catch{

    }
} 

export const countries = async () => {
    try{
        const { data : {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch(error){

    }
}

export const states = async () => {
    try{
        const {data : {statewise}} = await axios.get(`${stateurl}/data.json`);
        return(statewise);
    }
    catch {

    }
}