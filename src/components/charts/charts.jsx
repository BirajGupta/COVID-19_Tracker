import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/api';
import {Line, Bar } from 'react-chartjs-2';

const Charts = ( {data :{confirmed , recovered, deaths}, country}) => {
    const [dailyData, setdailyData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setdailyData(await fetchDailyData());
        } 

    

    fetchApi();
    },[setdailyData]); 
    
    const barchart = 
            confirmed ? 
                <Bar
                     data={{
                         labels : ['Infected', 'Recovered', 'Deaths'],
                         datasets: [{
                             label: 'People',
                             backgroundColor: ['rgba(255,0,0,0.5)','rgba(0,255,0,0.5)','rgba(0,0,255,0.5)'],
                             data:[confirmed.value, recovered.value, deaths.value]
                         }]
                     }}
                     options={{
                        title: {display: true, text:`Current State in ${country}`}
                     }}
                    />
                : null

    const lineChart =
        dailyData.length ? (
        <Line
          data={{
              labels: dailyData.map(({date}) => date),
              datasets: [{
                  data : dailyData.map(({ confirmed }) => confirmed),
                  label: 'infected',
                  borderColor: '#3333ff',
                  fill: true,
              },{
                data : dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                fill: true, 
              }],
          }}
          />) : null
    

    return(
    <div className="container pb-4">
        {country ? barchart : lineChart}
    </div>
    )
}

export default Charts; 