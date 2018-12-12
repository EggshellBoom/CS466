import React, { Component } from 'react';
import './App.css';


class BacktraceAnim extends Component {
    

    render(){
      return( 
        <div className="box">
        <div className = {this.props.clickable ? "yellow":""}> <div className = {this.props.clicked ? "green":""}>{this.props.val} </div> </div>
        </div>);
    }
  }

export default  BacktraceAnim