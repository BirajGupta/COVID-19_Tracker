import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/api';
import {Line, Bar } from 'react-chartjs-2';
import './charts.module.css'
import { Dna } from 'react-loader-spinner'

const Charts = ( {data :{world_total}, country, statewise}) => {
    const [dailyData, setdailyData] = useState([])

    const fetchApi = async () => {
        setdailyData(await fetchDailyData());
    } 
    console.log("daily", dailyData)
    useEffect(() => {
        setTimeout(() =>{
            fetchApi();
        }, 2000)
    },[setdailyData]); 
    
    const barchart1 = 
            statewise ? 
            <Bar
                     data={{
                         labels : ['Active', 'confirmed', 'Deaths', 'Recovered'],
                         datasets: [{
                             label: 'People',
                             backgroundColor: ['rgba(200,100,5,0.5)','rgba(180,255,0,0.5)','rgba(255,0,86,0.5)','rgba(50,50,255,0.5)'],
                             data:[statewise.active, statewise.confirmed, statewise.deaths, statewise.recovered]
                         }]
                     }}
                     options={{
                        title: {display: true, text:`Current State in ${statewise.state}`}
                     }}
                    />
                
            : country ? 
                <Bar
                     data={{
                         labels : ['Active Cases', 'Recovered', 'Deaths'],
                         datasets: [{
                             label: 'People',
                             backgroundColor: ['rgba(255,0,0,0.5)','rgba(0,255,0,0.5)','rgba(0,0,255,0.5)'],
                             data:[Number(country?.active_cases.replaceAll(',','')), Number(country?.total_recovered.replaceAll(',','')), Number(country?.deaths.replaceAll(',',''))]
                         }]
                     }}
                     options={{
                        title: {display: true, text:`Current State in ${country?.country_name}`}
                     }}
                    />
                : null



    const lineChart =
        dailyData?.length ? (
        <Line
          data={{
              labels: dailyData?.map(({date}) => date),
              datasets: [{
                  data : dailyData?.map(({ confirmed }) => confirmed),
                  label: 'Infected',
                  borderColor: '#3333ff',
                  fill: true,
              },{
                data : dailyData?.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                fill: true, 
              }],
          }}
          />) : null
    

    return(
    <div className="container pb-4">
        {country ? barchart1 : lineChart}
    </div>
    )
}

export default Charts; 