import React from 'react';
import './App.module.css';
import Cards from './components/cards/cards';
import Charts from './components/charts/charts';
import Countrypicker from './components/countrypicker/countrypicker';
import {fetchdataCountryWise, indiaStateWiseData} from './api/api'
import corona from './image.png';
import DNASpinner from './common/dnaSpinner';
export default class App extends React.Component{

  state={
    data: null,
    indiaStateWiseData: null,
    country:null,
    statewise:null
  }

  async componentDidMount(){
    const fetchedData = await fetchdataCountryWise();
    const state_wise_india = await indiaStateWiseData()
    console.log(fetchedData, state_wise_india, "&&")
    this.setState({data : fetchedData, indiaStateWiseData : state_wise_india.state_wise});
  }

  handlecountrychange = async (country) => {

    let found = this.state.data?.countries_stat?.filter(count => count?.country_name?.toLowerCase() === country.toLowerCase())[0]

    if(found && country.toLowerCase() !== 'india') this.setState({country : found, statewise : null})
    else if(found) this.setState({country : found})
    else alert('No Data Available for this location!')
  }

  stchange = async (state) => {

    let found = this.state.indiaStateWiseData[state]
    if(found) this.setState({statewise : found})
    else alert('No Data Available for this location!')

  }

  
  render(){
    const { data, country , statewise} = this.state;
    console.log(country, statewise, 'country, statewise');
    return(
      <div className="container">
        <img src={corona} alt="COVID-19" className="pt-4 pb-5"/>
        <div style={{minHeight : 200, position : "relative"}}>
        {data ? <Cards data ={ data }/> : <DNASpinner/>}
        </div>
        <Countrypicker country={country} handlecountrychange={this.handlecountrychange} stchange={this.stchange}/>
        <div style={{minHeight : 300, position : "relative"}}>
        {data ? <Charts data={data} country={country} statewise={statewise}/> : <DNASpinner/>}
        </div>
      </div>
    )
  }
}