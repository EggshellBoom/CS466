import React, { Component } from 'react';
import glocal_rec from './Global.png';
import fitting_rec from './Fitting.png';
import local_rec from './Local.png';
import './App.css';

const Recurrence = ({Alignment}) =>{
    if(Alignment === "Global Alignment")
      return (<img className = "recurrence" src={glocal_rec} width="500" height="120" />)
    else if(Alignment === "Fitting Alignment")
      return (<img className = "recurrence" src={fitting_rec} width="500" height="150" />)
    else if(Alignment === "Local Alignment")
      return (<img className = "recurrence" src={local_rec} width="500" height="150" />)
    else
      return(<div/>)
  }

export default Recurrence;