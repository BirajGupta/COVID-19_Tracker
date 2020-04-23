import React from 'react';
import './App.module.css';
import Cards from './components/cards/cards';
import Charts from './components/charts/charts';
import Countrypicker from './components/countrypicker/countrypicker';
import {fetchdata} from './api/api'
import corona from './image.png';
import {states} from './api/api';

export default class App extends React.Component{

  state={
    data: {},
    country:'',
    statewise:{}
  }

  async componentDidMount(){
    const fetchedData = await fetchdata();
    this.setState({data : fetchedData});
    
  }

  handlecountrychange = async (country) => {
    const fetchedData = await fetchdata(country);

    this.setState({data : fetchedData, country : country, statewise:{}})
  }

  stchange = async (name) => {
    const statedata = await states();
    for(var i=0;i<statedata.length;i++){
      if(statedata[i].state === name){
        this.setState({statewise : statedata[i]})
      }
    }
    console.log("function is called");

  }

  
  render(){
    const { data, country , statewise} = this.state;

    return(
      <div className="container">
        <img src={corona} alt="COVID-19" className="pt-4 pb-5"/>
        <Cards data ={ data }/>
        <Countrypicker handlecountrychange={this.handlecountrychange} stchange={this.stchange}/>
        <Charts data={data} country={country} statewise={statewise}/>
      </div>
    )
  }
}