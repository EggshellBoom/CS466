
import React, { Component } from 'react';
import './App.css';
import Recurrence from './Recurrence.js'
import { TimelineMax } from "gsap/all";


class BacktraceAnim extends Component {
    

    render(){
      return( 
        <div className="box">
        <div className = {this.props.clickable ? "yellow":""}> <div className = {this.props.clicked ? "green":""}>{this.props.val} </div> </div>
        </div>);
    }
  }


class BackTrace extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dp_table:[],
        BackTrace:[],
        clicked:[],
        clickable:[],
        empty:[],
        first_click:true,
        last_clicked:null,
        first_clicked:null
      };
  }
  
  static getDerivedStateFromProps(props, state){
   if(props.dp_table !== state.dp_table){
     let clicked = Array(props.dp_table.length).fill(null).map(()=>Array(props.dp_table[0].length).fill(null));
     let BackTrace = Array(props.dp_table.length).fill(null).map(()=>Array(props.dp_table[0].length).fill(null));
     let clickable = Array(props.dp_table.length).fill(null).map(()=>Array(props.dp_table[0].length).fill(null));
     let empty = Array(props.dp_table.length).fill(null).map(()=>Array(props.dp_table[0].length).fill(null));
     return {dp_table:props.dp_table,
             clicked:clicked,
             BackTrace:BackTrace,
             clickable:clickable,
             empty:empty,
    };
   }
  }
  
    componentDidMount() {
      const{dp_table} = this.props
      this.setState({
        dp_table:dp_table
      })
    }

    handleRestart = () =>{
        const{empty} = this.state
        this.setState({
             clicked:JSON.parse(JSON.stringify(empty)),
             BackTrace:JSON.parse(JSON.stringify(empty)),
             clickable:JSON.parse(JSON.stringify(empty)),
             first_click:true,
             last_clicked:null
        })
    }
  
    handleClick = (x,y)=>{
      console.log(x,y)
      const{first_click,last_clicked,first_clicked} = this.state
      if(first_click){
        this.setState({
            first_clicked:[x,y]
        })
      }
      if (this.state.clickable[x][y] || first_click){
      var clicked = this.state.clicked
      var clickable = this.state.clickable
      var BackTrace = this.state.BackTrace
      clicked[x][y] = true
      if(last_clicked){
        BackTrace[last_clicked[0]][last_clicked[1]] = [x,y]
        if(last_clicked[0] >= 1)
           clickable[last_clicked[0]-1][last_clicked[1]] = false
        if(last_clicked[1] >= 1)
           clickable[last_clicked[0]][last_clicked[1]-1] = false
       if(last_clicked[0]>=1 && last_clicked[1]>=1)
           clickable[last_clicked[0]-1][last_clicked[1]-1] = false
       }
      if(x >= 1)
        clickable[x-1][y] = true
      if(y >= 1)
        clickable[x][y-1] = true
      if(x>=1 && y>=1)
        clickable[x-1][y-1] = true
      
      this.setState({
        clicked:clicked,
        clickable:clickable,
        first_click:false,
        last_clicked:[x,y]
      })
     }
    }
  
    check = () =>{
      const{Alignment,backtrace_fitting,backtrace_global,backtrace_local,dp_table} = this.props
      const{BackTrace,clicked,first_clicked,last_clicked} = this.state
      var i,j
      if(Alignment === "Global Alignment"){
        for(j = 0; j<BackTrace.length; j ++ ){
          for(i=0; i<BackTrace[j].length; i++){

            if( BackTrace[j][i] !== null && !backtrace_global[j][i].some(array1 => array1.length === BackTrace[j][i].length && array1.every(function(value, index) { return value === BackTrace[j][i][index]}))){
              alert("Your table is not correct,click the question mark for more info!")
              console.log(backtrace_global[j][i],BackTrace[j][i])
              return false
            }

            if( i===0 && j===0 && !clicked[j][i]){
              alert("Your table is not correct,click the question mark for more info!")
              return false
            }

            
            if( i===BackTrace[j].length-1 && j===BackTrace.length-1 && !clicked[j][i]){
                alert("Your table is not correct,click the question mark for more info!")
                return false
              }

          }
        }
        alert("Awesome! You got it correct! Now you can click Next button to proceed")
        return true
      }
  
      if(Alignment === "Fitting Alignment"){
        var flag = false
        var max = -100
        var max_i,max_j
        for(j = 0; j<BackTrace.length; j ++ ){
            for(i=0; i<BackTrace[j].length; i++){
  
              if( BackTrace[j][i] !== null && !backtrace_fitting[j][i].some(array1 => array1.length === BackTrace[j][i].length && array1.every(function(value, index) { return value === BackTrace[j][i][index]}))){
                alert("Your table is not correct,click the question mark for more info!")
                console.log(backtrace_fitting[j][i],BackTrace[j][i])
                return false
              }
  
              if( j===0 && clicked[j][i]){
                flag = true
              }
  
              
              if( j===BackTrace.length-1 ){
                  if(dp_table[j][i] > max){
                      max = dp_table[j][i]
                  }
                }
  
            }
          }
          if(flag && dp_table[first_clicked[0]][first_clicked[1]] === max){
            alert("Awesome! You got it correct! Now you can click Next button to proceed")
            return true
          }
          else{
            alert("Your table is not correct,click the question mark for more info!")
            return false
          }
      }
  
      if(Alignment === "Local Alignment"){
         flag = false
         max = -100
        for(j = 0; j<BackTrace.length; j ++ ){
            for(i=0; i<BackTrace[j].length; i++){
  
              if( BackTrace[j][i] !== null && !backtrace_local[j][i].some(array1 => array1.length === BackTrace[j][i].length && array1.every(function(value, index) { return value === BackTrace[j][i][index]}))){
                alert("Your table is not correct,click the question mark for more info!")
                console.log(backtrace_local[j][i],BackTrace[j][i])
                return false
              }
  
              if(dp_table[j][i] > max){
                      max = dp_table[j][i]
              }
  
            }
          }
          if(dp_table[last_clicked[0]][last_clicked[1]] === 0 && dp_table[first_clicked[0]][first_clicked[1]] === max){
            alert("Awesome! You got it correct! Now you can click Next button to proceed")
            return true
          }
          else{
            alert("Your table is not correct,click the question mark for more info!")
            return false
          }
      }
    }
    
    handleSubmit = () =>{
        if(this.check())
            this.props.submit_backtrace()
    }
  
    
   
    render() {
      const{Alignment,sequence1,sequence2} = this.props
      const{dp_table,clickable,clicked} = this.state
  
      const title_list =sequence1.flat()
      const subtable_title = title_list.map((sq1)=>
        <th>{sq1}</th>
      );
  
    
      
  
      const table = dp_table.map((row, x) => 
        <tr>
          <th>{sequence2[x]}</th>
          {row.map((cell,y)=>
          <td onClick = {() => this.handleClick(x,y)}><BacktraceAnim clicked = {clicked[x][y]} clickable = {clickable[x][y]} val = {dp_table[x][y]}
                /></td>
          )}
  
        </tr>
  
  
      );
  
      return (
        <div className="App">
          <h3>Step5: Perdorm BackTrace on the dp table</h3>
          <h2> {Alignment}</h2>
          <h5>First click the final score of the alignment, then click the yellow area to backtrace step by step</h5>
          <div className = "divider_1">
          <Recurrence Alignment = {Alignment}/>
         <div className = "divider">
          <table>
            <tr>
            {subtable_title}
            </tr>
            {table}
          </table>
           
          </div>
          <button onClick = {this.handleRestart}>Restart</button>
          <button onClick = {this.handleSubmit}>Submit</button>
          </div>
  
        </div>
      
       
  
        
      );
    }
  }

export default BackTrace;