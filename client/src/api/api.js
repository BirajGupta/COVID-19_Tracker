import axios from 'axios';

const url = 'https://corona-virus-world-and-india-data.p.rapidapi.com';
const geographyUrl = 'https://country-list5.p.rapidapi.com'
const config = {
    headers: {
        'X-RapidAPI-Key': '1ab0a7f31dmshf655b7d9d210a1dp1c5bbbjsn7e16dd153613',
        'X-RapidAPI-Host': 'corona-virus-world-and-india-data.p.rapidapi.com'
      }
  };
const configGeography = {
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '1ab0a7f31dmshf655b7d9d210a1dp1c5bbbjsn7e16dd153613',
        'X-RapidAPI-Host': 'country-list5.p.rapidapi.com'
      },
  };

function delay(time) {
return new Promise(resolve => setTimeout(resolve, time));
}

export const fetchdataCountryWise = async () => {
    
    try{
        let res = null
        res = delay(1000).then(async () => {
            let result = await axios.get(`${url}/api`, config)
            console.log(result, 'api call')
            return result.data
        });
        return res
    }
    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const data = await axios.get(`${url}/api_india_timeline`,config);
        const modifiedData = data?.data?.map((dailyData) => ({
                confirmed: dailyData.dailyconfirmed,
                deaths : dailyData.dailydeceased,
                date: dailyData.date,
        }));
        
        return modifiedData;
    }
    catch(error){
        console.log(error);
    }
} 

export const indiaStateWiseData = async () => {
    try{
        let res = null
        res = delay(3000).then(async () => {
            let result = await axios.get(`${url}/api_india`, config);
            console.log(result, 'indiastate wise')
            return result.data
        })
        return res
    }
    catch(error){
        console.log(error);
    }
}

export const countries = async () => {
    try{
        const { data : {country}} = await axios.get(`${geographyUrl}/countrylist`,configGeography);
        return country
    }
    catch(error){
        console.log(error);
    }
}

export const states = async () => {
    try{
        const {data : {state}} = await axios.post(`${geographyUrl}/statelist/`, {"countryid":99}, configGeography);
        return(state);
    }
    catch (error){

    }
}