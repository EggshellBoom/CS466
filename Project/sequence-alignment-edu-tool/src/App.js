import React, { Component } from 'react';
import glocal_rec from './Global.png';
import fitting_rec from './Fitting.png';
import local_rec from './Local.png';
import InputSequence from './InputSequence.js'
import SelectRecurence from './SelectRecurence.js'
import InitializeTable from './InitializeTable.js'
import SelectDirection from './SelectDirection.js'
import FinishTable from './FinishTable.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alignment : null,
      sequence1 : [],
      sequence2 : [],
      dp_table:[],
      dp_table_global:[],
      dp_table_fitting:[],
      dp_table_local:[],
      DownRight:[],
      RightDown:[],
      UpLeft:[],
      LeftUp:[],
      RightUp:[],
      UpRight:[],
      DownLeft:[],
      LeftDown:[],
      score_matrix : null,
      current_step:0,
      allowed_step:50,
    };
}
  MapDirections = () =>{
    const dp_table = Array(5).fill(null).map(()=>Array(4).fill(null));
    let DownRight = JSON.parse(JSON.stringify(dp_table));
    let RightDown = JSON.parse(JSON.stringify(dp_table));
    let UpLeft = JSON.parse(JSON.stringify(dp_table));
    let LeftUp = JSON.parse(JSON.stringify(dp_table));
    let RightUp = JSON.parse(JSON.stringify(dp_table));
    let UpRight = JSON.parse(JSON.stringify(dp_table));
    let DownLeft = JSON.parse(JSON.stringify(dp_table));
    let LeftDown = JSON.parse(JSON.stringify(dp_table));
    var i,j
    var n = 0
    for(j = 0; j<RightDown.length; j ++ ){
      for(i=0; i<RightDown[0].length; i++){
        RightDown[j][i] = n
        n += 1
      }}
    n= 0
    for(i = 0; i<DownRight[0].length; i ++ ){
      for(j=0; j<DownRight.length; j++){
        DownRight[j][i] = n
        n += 1
      }}
    n= 0
    for(i = UpLeft[0].length-1; i>=0; i -- ){
      for(j=UpLeft.length-1; j>=0; j--){
        UpLeft[j][i] = n
        n += 1
      }}
    n= 0
    for(j=LeftUp.length-1; j>=0; j--){
      for( i = LeftUp[0].length-1; i>=0; i -- ){
        LeftUp[j][i] = n
        n += 1
      }}
    n=0
    for(j=LeftUp.length-1; j>=0; j--){
      for(i=0; i<RightUp[0].length; i++){
        RightUp[j][i] = n
        n += 1
      }} 
    n=0
    for(i=0; i<UpRight[0].length; i++){
      for(j=UpRight.length-1; j>=0; j-- ){
        UpRight[j][i] = n
        n += 1
      }} 
    n=0
    for(i = DownLeft[0].length-1; i>=0; i --){
      for(j=0; j<DownLeft.length; j++ ){
        DownLeft[j][i] = n
        n += 1
      }} 
    n=0
    for(j=0; j<LeftDown.length; j++ ){
      for(i = LeftDown[0].length-1; i>=0; i --){
        LeftDown[j][i] = n
        n += 1
      }} 
    console.log(DownRight,RightDown,UpLeft,LeftUp,RightUp,UpRight,DownLeft,LeftDown)
    this.setState({
      DownRight,RightDown,UpLeft,LeftUp,RightUp,UpRight,DownLeft,LeftDown
    })
    
  }


  GlobalAlignment = (dp_table,score_matrix,sequence1,sequence2) =>{
    // deep copy
    let global_dp_table = JSON.parse(JSON.stringify(dp_table));
    var i,j
    for(j = 0; j<global_dp_table.length; j ++ ){
      for(i=0; i<global_dp_table[j].length; i++){
        if(i === 0 && j === 0){
          global_dp_table[j][i] = 0
        }
        //deletion
        if(i > 0){
          if(global_dp_table[j][i] == null)
            global_dp_table[j][i] =  global_dp_table[j][i-1] + score_matrix["gap"]
          else if(global_dp_table[j][i] < global_dp_table[j][i-1] + score_matrix["gap"])
            global_dp_table[j][i] =  global_dp_table[j][i-1] + score_matrix["gap"]
          
        } 

        if(j >0){
          if(global_dp_table[j][i] == null)
            global_dp_table[j][i] =  global_dp_table[j-1][i] + score_matrix["gap"]
          else if (global_dp_table[j][i] < global_dp_table[j-1][i] + score_matrix["gap"])
            global_dp_table[j][i] =  global_dp_table[j-1][i] + score_matrix["gap"]
          
        }

        if(i>0 && j>0){
          if(global_dp_table[j][i] < global_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]])
            
            global_dp_table[j][i] =  global_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]]
        }
      }
    }
    console.log(global_dp_table)
    this.setState({
      dp_table_global:global_dp_table
    })
  }

  FittingAlignment = (dp_table,score_matrix,sequence1,sequence2) =>{
    // deep copy
    let fitting_dp_table = JSON.parse(JSON.stringify(dp_table));
    var i,j
    for(j = 0; j<fitting_dp_table.length; j ++ ){
      for(i=0; i<fitting_dp_table[j].length; i++){
        if(j === 0){
          fitting_dp_table[j][i] = 0
        }
        //deletion
        if(i>0 && j>0){
          if(fitting_dp_table[j][i] == null)
            fitting_dp_table[j][i] =  fitting_dp_table[j][i-1] + score_matrix["gap"]
          else if(fitting_dp_table[j][i] < fitting_dp_table[j][i-1] + score_matrix["gap"])
            fitting_dp_table[j][i] =  fitting_dp_table[j][i-1] + score_matrix["gap"]
          
        } 

        if(j>0){
          if(fitting_dp_table[j][i] == null)
            fitting_dp_table[j][i] =  fitting_dp_table[j-1][i] + score_matrix["gap"]
          else if (fitting_dp_table[j][i] < fitting_dp_table[j-1][i] + score_matrix["gap"])
            fitting_dp_table[j][i] =  fitting_dp_table[j-1][i] + score_matrix["gap"]
          
        }

        if(i>0 && j>0){
          if(fitting_dp_table[j][i] < fitting_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]])
            
            fitting_dp_table[j][i] =  fitting_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]]
        }
      }
    }
    console.log(fitting_dp_table)
    this.setState({
      dp_table_fitting:fitting_dp_table
    })
  }

  LocalAlignment = (dp_table,score_matrix,sequence1,sequence2) =>{
    // deep copy
    let local_dp_table = JSON.parse(JSON.stringify(dp_table));
    var i,j
    for(j = 0; j<local_dp_table.length; j ++ ){
      for(i=0; i<local_dp_table[j].length; i++){
        local_dp_table[j][i] = 0
        
        //deletion
        if(i > 0){
          if(local_dp_table[j][i] == null)
            local_dp_table[j][i] =  local_dp_table[j][i-1] + score_matrix["gap"]
          else if(local_dp_table[j][i] < local_dp_table[j][i-1] + score_matrix["gap"])
            local_dp_table[j][i] =  local_dp_table[j][i-1] + score_matrix["gap"]
          
        } 

        if(i>0 && j>0){
          if(local_dp_table[j][i] == null)
            local_dp_table[j][i] =  local_dp_table[j-1][i] + score_matrix["gap"]
          else if (local_dp_table[j][i] < local_dp_table[j-1][i] + score_matrix["gap"])
            local_dp_table[j][i] =  local_dp_table[j-1][i] + score_matrix["gap"]
          
        }

        if(i>0 && j>0){
          if(local_dp_table[j][i] < local_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]])
            
            local_dp_table[j][i] =  local_dp_table[j-1][i-1] + score_matrix[sequence1[i+1]+sequence2[j]]
        }
      }
    }
    console.log(local_dp_table)
    this.setState({
      dp_table_local:local_dp_table
    })
  }


  handleNext = () =>{
    const{current_step,allowed_step} = this.state
    if(allowed_step > current_step){
      const next_step = current_step + 1
      this.setState({
        current_step:next_step
      })
    }
  }

  handlePrev = () =>{
    const{current_step} = this.state
    if(current_step > 0){
      const next_step = current_step - 1
      this.setState({
        current_step:next_step
      })
    }
  }

  submit_seqence = (sequence1,sequence2,score_matrix,Alignment) =>{
    console.log(sequence1,sequence2,score_matrix,Alignment)
    const{allowed_step} = this.state
    var next_alloed_step = allowed_step
    var dp_table = Array(sequence2.length).fill(null).map(()=>Array(sequence1.length-1).fill(null));
    console.log(dp_table)
    if(allowed_step < 1){
      next_alloed_step = 1
    }
    this.GlobalAlignment(dp_table,score_matrix,sequence1,sequence2)
    this.FittingAlignment(dp_table,score_matrix,sequence1,sequence2)
    this.LocalAlignment(dp_table,score_matrix,sequence1,sequence2)
    this.MapDirections(dp_table)
    this.setState({
      sequence1:sequence1,
      sequence2:sequence2,
      score_matrix:score_matrix,
      Alignment:Alignment,
      allowed_step:next_alloed_step,
      dp_table:dp_table
    })
    alert("Sequence Inputs Submitted! Please click Next button to proceed!")
  }

  submit_recurrence = () =>{
    const{allowed_step} = this.state
    var next_alloed_step = allowed_step
    if(allowed_step < 2){
      next_alloed_step = 2
    }
    this.setState({
      allowed_step:next_alloed_step
    })
  }

  submit_initialization = () =>{
    const{allowed_step} = this.state
    var next_alloed_step = allowed_step
    if(allowed_step < 3){
      next_alloed_step = 3
    }
    this.setState({
      allowed_step:next_alloed_step
    })
  }

  submit_direction = () =>{
    const{allowed_step} = this.state
    var next_alloed_step = allowed_step
    if(allowed_step < 4){
      next_alloed_step = 4
    }
    this.setState({
      allowed_step:next_alloed_step
    })
  }


  submit_finish = () =>{
    const{allowed_step} = this.state
    var next_alloed_step = allowed_step
    if(allowed_step < 5){
      next_alloed_step = 5
    }
    this.setState({
      allowed_step:next_alloed_step
    })
  }
  render() {
    const{Alignment,sequence1,sequence2,score_matrix,current_step,allowed_step,
      dp_table,dp_table_fitting,dp_table_global,dp_table_local,DownRight,RightDown,UpLeft,LeftUp,RightUp,UpRight,DownLeft,LeftDown
    } = this.state
    return (
      <div className="App">
        <header className="App-header">
        
        <button disabled = {current_step > 0 ? false:true} onClick = {this.handlePrev}>Back</button>

       

        <section className={ current_step === 0 ? '' : 'hidden'} >
        <InputSequence submit_seqence = {this.submit_seqence}/>
        </section>

        
          
        <section className={ current_step === 1 ? '' : 'hidden'} >
        <SelectRecurence Alignment = {Alignment} submit_recurrence = {this.submit_recurrence} />        
        </section>

        <section className={ current_step === 2 ? '' : 'hidden'} >
        <InitializeTable Alignment = {Alignment} 
        dp_table = {dp_table} submit_recurrence = {this.submit_recurrence} 
        sequence1 = {sequence1} sequence2 = {sequence2} 
        dp_table_global = {dp_table_global} dp_table_fitting = {dp_table_fitting} dp_table_local = {dp_table_local}
        score_matrix = {score_matrix} submit_initialization = {this.submit_initialization} />        
        </section>

        <section className={ current_step === 3 ? '' : 'hidden'} >
        <SelectDirection Alignment = {Alignment} 
        dp_table = {dp_table} submit_recurrence = {this.submit_recurrence} 
        sequence1 = {sequence1} sequence2 = {sequence2}
        DownRight = {DownRight} RightDown = {RightDown} UpLeft= {UpLeft}  LeftUp= {LeftUp}
         RightUp= {RightUp} UpRight= {UpRight} DownLeft= {DownLeft} LeftDown= {LeftDown}
         submit_direction = {this.submit_direction}
         />        
        </section>

        <section className={ current_step === 4 ? '' : 'hidden'} >
        <FinishTable Alignment = {Alignment} 
        dp_table = {dp_table} submit_recurrence = {this.submit_recurrence} 
        sequence1 = {sequence1} sequence2 = {sequence2} 
        dp_table_global = {dp_table_global} dp_table_fitting = {dp_table_fitting} dp_table_local = {dp_table_local}
        score_matrix = {score_matrix} submit_finish = {this.submit_finish}  />        
        </section>

        
  
        <button disabled = {current_step < allowed_step ? false:true} onClick = {this.handleNext}>Next</button>





        </header>
        
      </div>
    );
  }
}

















export default App;
