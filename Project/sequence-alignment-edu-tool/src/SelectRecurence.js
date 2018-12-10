import React, { Component } from 'react';
import glocal_rec from './Global.png';
import fitting_rec from './Fitting.png';
import local_rec from './Local.png';
import './App.css';

class SelectRecurence extends Component {
    constructor(props) {
      super(props);
      this.state = {
        correct_1: false,     
        correct_2: false,     
        correct_3: false   
      };
  }
  
    handleSelect = (selected_Alignment) =>{
      const{Alignment,submit_recurrence} = this.props
  
      if (selected_Alignment === Alignment){
        if(Alignment === "Global Alignment"){
          this.setState({
            correct_1: true,     
            correct_2: false,     
            correct_3: false   
          })
        }
        else if(Alignment === "Fitting Alignment"){
          this.setState({
            correct_1: false,     
            correct_2: true,     
            correct_3: false   
          })
        }
        else if(Alignment === "Local Alignment"){
          this.setState({
            correct_1: false,     
            correct_2: false,     
            correct_3: true   
          })
        }
        alert("Awesome! You are correct! Now you can click the Next button to proceed!")
        submit_recurrence()
  
      }
  
      else{
        alert(`The recurrence you chose is not ${Alignment}, click on the question mark if you need more info.`)
      }
    }
    render() {
      const{Alignment} = this.props
  
  
      return (
        <div className="App">
          <h3>Step1: Choose The Correct Recurrence For </h3>
          <h2> {Alignment}  </h2>
          <div className = "divider_1">
  
          <div className = "select_window" backgroud>
          <button onClick = {() => {this.handleSelect("Global Alignment")}}> Select </button>
          <img src={glocal_rec} width="500" height="120" />
          <h1 className = {this.state.correct_1 ? "green_smile" : ""} >: )</h1>
          </div>
  
          <div className = "select_window">
          <button onClick = {() => {this.handleSelect("Fitting Alignment")}}> Select </button>
          <img src={fitting_rec} width="500" height="150" />
          <h1 className = {this.state.correct_2 ? "green_smile" : ""} >: )</h1>
          </div>
  
          <div className = "select_window">
          <button onClick = {() => {this.handleSelect("Local Alignment")}}> Select </button>
          <img src={local_rec} width="500" height="150" />
          <h1 className = {this.state.correct_3 ? "green_smile" : ""} >: )</h1>
          </div>
          </div>
      
       
  
        </div>
      );
    }
  }

export default SelectRecurence;