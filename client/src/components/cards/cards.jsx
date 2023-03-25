import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import './Cards.module.css'
import DNASpinner from '../../common/dnaSpinner';
const Cards = ({data : {world_total}}) => {
    if(!world_total){
        return <DNASpinner/>;
    }
    return(
    <div className="pb-5">
        <Grid container spacing={3} justify="space-between">
            <Grid item component={Card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={Number(world_total?.total_cases?.replaceAll(",", ""))} duration={2.5} separator=","/>
                    </Typography>
                    <Typography color="textSecondary">{new Date(world_total?.statistic_taken_at).toDateString()}</Typography>
                    <Typography variant="body2">Number Of Active Cases Of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5">
                    <CountUp start={0} end={Number(world_total?.total_recovered?.replaceAll(",", ""))} duration={2.5} separator=","/>
                    </Typography>
                    <Typography color="textSecondary">{new Date(world_total?.statistic_taken_at).toDateString()}</Typography>
                    <Typography variant="body2">Number Of Recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5">
                    <CountUp start={0}  end={Number(world_total?.total_deaths?.replaceAll(",", ""))} duration={2.5} separator=","/>
                    </Typography>
                    <Typography color="textSecondary">{new Date(world_total?.statistic_taken_at).toDateString()}</Typography>
                    <Typography variant="body2">Number Of Deaths Caused by COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
    </div>
    )
}

export default Cards;