import React from 'react';
import './App.module.css';
import Cards from './components/cards/cards';
import Charts from './components/charts/charts';
import Countrypicker from './components/countrypicker/countrypicker';
import {fetchdata} from './api/api'
import corona from './image.png';

export default class App extends React.Component{

  state={
    data: {},
    country:''
  }

  async componentDidMount(){
    const fetchedData = await fetchdata(); 
    this.setState({data : fetchedData});
  }

  handlecountrychange = async (country) => {
    const fetchedData = await fetchdata(country);

    this.setState({data : fetchedData, country : country})
  }

  
  render(){
    const { data, country } = this.state;

    return(
      <div className="container">
        <img src={corona} alt="COVID-19" className="pt-4 pb-5"/>
        <Cards data ={ data }/>
        <Countrypicker handlecountrychange={this.handlecountrychange}/>
        <Charts data={data} country={country}/>
      </div>
    )
  }
}