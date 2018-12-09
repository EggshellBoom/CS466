import React, { Component } from 'react';
import { Fraction, toTex } from 'algebra.js';
import { Node, Context } from 'react-mathjax2';
import glocal_rec from './Global.png';
import fitting_rec from './Fitting.png';
import local_rec from './Local.png';
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
      score_matrix : null,
      current_step:0,
      allowed_step:0,
    };
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

  render() {
    const{Alignment,sequence1,sequence2,score_matrix,current_step,allowed_step,dp_table,dp_table_fitting,dp_table_global,dp_table_local} = this.state
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
  
        <button disabled = {current_step < allowed_step ? false:true} onClick = {this.handleNext}>Next</button>
        </header>
        
      </div>
    );
  }
}

const Recurrence = ({Alignment}) =>{
  if(Alignment === "Global Alignment")
    return (<img className = "recurrence" src={glocal_rec} width="500" height="120" />)
  else if(Alignment === "Fitting Alignment")
    return (<img className = "recurrence" src={fitting_rec} width="500" height="120" />)
  else if(Alignment === "Local Alignment")
    return (<img className = "recurrence" src={local_rec} width="500" height="120" />)
  else
    return(<div/>)
}


class InputSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alignment:"Global Alignment",
      sequence1 : [],
      sequence2 : [],
      sequence1_str : "",
      sequence2_str : "",
      score_matrix: {
        aa:1,
        at:-1,
        ac:-1,
        ag:-1,
        ta:-1,
        tt:1,
        tc:-1,
        tg:-1,
        ca:-1,
        ct:-1,
        cc:1,
        cg:-1,
        ga:-1,
        gt:-1,
        gc:-1,
        gg:1,
        gap:-1
      }
    };
}

handlescore = (val,key,key1) =>{
  const{score_matrix} = this.state
  score_matrix[key] = parseInt(val)
  score_matrix[key1] = parseInt(val)
  this.setState({
    score_matrix:score_matrix
  })
}


  render() {

    const {submit_seqence} = this.props
    const DNARegex = "[CAGTcagt]+"
   
    return (
      <div className="App">
        <h2>Alignment Method, Sequence & Score Matrix </h2>

        <form className = "input-form" onSubmit = {(event) => { 
          console.log(event.target.value); event.preventDefault(); 
          submit_seqence(this.state.sequence1,
            this.state.sequence2,this.state.score_matrix,this.state.Alignment)
          }  }>
        
        <div className = "divider">

         <select  onChange={(e) => {this.setState({Alignment:e.target.value})}}>
          <option>Global Alignment</option>
          <option>Fitting Alignment</option>
          <option>Local Alignment</option>
        </select>

        <div className = "divider_1">
        Sequence 1
        <input required  
                title="DNA string, please only input CAGT"
                pattern={DNARegex}  
                value={this.state.sequence1_str} 
                onChange={(e) => {
                   this.setState({
                    sequence1_str:e.target.value,
                    sequence1:["","",e.target.value.split("")].flat()
                   })
                }} 
             />
        <br/>
        Sequence 2          
        <input required  
                title="DNA string, please only input CAGT"
                pattern={DNARegex}  
                value={this.state.sequence2_str} 
                onChange={(e) => {
                   this.setState({
                    sequence2_str:e.target.value,
                    sequence2:["",e.target.value.split("")].flat()
                   })
                }} 
             />
        </div>
       
        
        <table>
        <tr>
        <th></th>
        <th>A</th>
        <th>T</th>
        <th>C</th>
        <th>G</th>
        </tr>
        <tr>
        <th>A</th>
        <td><input type="number" value = {this.state.score_matrix.aa}  min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"aa","aa")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.at} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"at","ta")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ac} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ac","ca")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ag} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ag","ga")}} /></td>
        </tr>
        <tr>
        <th>T</th>
        <td><input type="number" value = {this.state.score_matrix.ta} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ta","at")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tt} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tt","tt")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tc","ct")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tg","gt")}} /></td>
        </tr>
        <tr>
        <th>C</th>
        <td><input type="number" value = {this.state.score_matrix.ca} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ca","ac")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ct} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ct","tc")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.cc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cc","cc")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.cg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cg","gc")}} /></td>
        </tr>
        <tr>
        <th>G</th>
        <td><input type="number" value = {this.state.score_matrix.ga} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ga","ag")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gt} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gt","tg")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gc","cg")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gg","gg")}} /></td>
        </tr>
        <tr>
        <th>Gap</th>
        <td></td>
        <td></td>
        <td></td>
        <td><input type="number" value = {this.state.score_matrix.gap} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gap")}} /></td>
        </tr>
       
        </table>
        
       

        </div>
        
       

         <input type = "submit" className = "submit-button"/>
        </form>
    
     

      </div>
    );
  }
}


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
        <h1 className = {this.state.correct_1 ? "green" : ""} >: )</h1>
        </div>

        <div className = "select_window">
        <button onClick = {() => {this.handleSelect("Fitting Alignment")}}> Select </button>
        <img src={fitting_rec} width="500" height="150" />
        <h1 className = {this.state.correct_2 ? "green" : ""} >: )</h1>
        </div>

        <div className = "select_window">
        <button onClick = {() => {this.handleSelect("Local Alignment")}}> Select </button>
        <img src={local_rec} width="500" height="150" />
        <h1 className = {this.state.correct_3 ? "green" : ""} >: )</h1>
        </div>
        </div>
    
     

      </div>
    );
  }
}


class InitializeTable extends Component {
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
        min="-99" max="99" disabled = {x === 0 || y === 0 ? false:true} required/></td>
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

export default App;
