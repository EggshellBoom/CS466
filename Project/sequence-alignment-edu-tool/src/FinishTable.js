
import React, { Component } from 'react';
import './App.css';
import Recurrence from './Recurrence.js'

class FinishTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dp_table:[]
      };
  }
  
  static getDerivedStateFromProps(props, state){
   if(props.dp_table !== state.dp_table){
     return {dp_table:props.dp_table};
   }
  }
  
    componentDidMount() {
      const{dp_table} = this.props
      this.setState({
        dp_table:dp_table
      })
    }
  
    handleTable = (val,x,y)=>{
      var new_table = this.state.dp_table
      new_table[x][y] = parseInt(val)
      this.setState({
        dp_table:new_table
      })
    }
  
    check = () =>{
      const{Alignment,dp_table_global,dp_table_local,dp_table_fitting} = this.props
      const{dp_table} = this.state
      var i,j
      if(Alignment === "Global Alignment"){
        for(j = 0; j<dp_table.length; j ++ ){
          for(i=0; i<dp_table[j].length; i++){
            if(dp_table[j][i] !== null && dp_table[j][i] !== dp_table_global[j][i]){
              alert("Your initialization is not correct,click the question mark for more info!")
              return false
            }
          }
        }
        alert("Awesome! You got it correct! Now you can click Next button to proceed")
        return true
      }
  
      if(Alignment === "Fitting Alignment"){
        for(j = 0; j<dp_table.length; j ++ ){
          for(i=0; i<dp_table[j].length; i++){
            if(dp_table[j][i] !== null && dp_table[j][i] !== dp_table_fitting[j][i]){
              alert("Your initialization is not correct,click the question mark for more info!")
              return false
            }
          }
        }
        alert("Awesome! You got it correct! Now you can click Next button to proceed")
        return true
      }
  
      if(Alignment === "Local Alignment"){
        for(j = 0; j<dp_table.length; j ++ ){
          for(i=0; i<dp_table[j].length; i++){
            if(dp_table[j][i] !== null && dp_table[j][i] !== dp_table_local[j][i]){
              alert("Your initialization is not correct,click the question mark for more info!")
              return false
            }
          }
        }
        alert("Awesome! You got it correct! Now you can click Next button to proceed")
        return true
      }
    }
  
   
    render() {
      const{Alignment,sequence1,sequence2} = this.props
      const{dp_table} = this.state
  
      const title_list =sequence1.flat()
      const subtable_title = title_list.map((sq1)=>
        <th>{sq1}</th>
      );
  
    
      
  
      const table = dp_table.map((row, x) => 
        <tr>
          <th>{sequence2[x]}</th>
          {row.map((cell,y)=>
          <td><input type="number"
          value = {dp_table[x][y]} 
          onChange={(e) => { this.handleTable(e.target.value,x,y)}}
          min="-99" max="99"  required/></td>
          )}
  
        </tr>
  
  
      );
  
      return (
        <div className="App">
          <h3>Step2: Initialize the DP table for</h3>
          <h2> {Alignment}</h2>
          <h5>Consult the base case and the eadge cases from the recurrence and correspond the values to the table.</h5>
          <div className = "divider_1">
          <Recurrence Alignment = {Alignment}/>
          <form onSubmit = {(event) => { 
            console.log(event.target.value);
            event.preventDefault(); 
            if(this.check())
              this.props.submit_initialization()
             }}>
          <table>
            <tr>
            {subtable_title}
            </tr>
            {table}
          </table>
          <input type = "submit" className = "submit-button"/>
          </form>
          </div>
  
        </div>
      
       
  
        
      );
    }
  }

export default FinishTable;