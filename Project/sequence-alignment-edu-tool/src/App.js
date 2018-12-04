import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alignment : null,
      sequence1 : [],
      sequence2 : [],
      score_matrix : null
    };
}

  submit_seqence = (sequence1,sequence2,score_matrix,Alignment) =>{
    console.log(sequence1,sequence2,score_matrix,Alignment)
    this.setState({
      sequence1:sequence1,
      sequence2:sequence2,
      score_matrix:score_matrix,
      Alignment:Alignment
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button>Back</button>
         <InputSequence submit_seqence = {this.submit_seqence}/>
        <button>Next</button>
        </header>
        
      </div>
    );
  }
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
        aa:0,
        at:0,
        ac:0,
        ag:0,
        ta:0,
        tt:0,
        tc:0,
        tg:0,
        ca:0,
        ct:0,
        cc:0,
        cg:0,
        ga:0,
        gt:0,
        gc:0,
        gg:0,
      }
    };
}

handlescore = (val,key) =>{
  const{score_matrix} = this.state
  score_matrix[key] = parseInt(val)
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

        <form className = "input-form" onSubmit = {(event) => { console.log(event.target.value); event.preventDefault()}}>
        
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
                    sequence1:e.target.value.split("")
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
                    sequence2:e.target.value.split("")
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
        <td><input type="number" value = {this.state.score_matrix.aa}  min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"aa")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.at} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"at")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ac} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ac")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ag} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ag")}} /></td>
        </tr>
        <tr>
        <th>T</th>
        <td><input type="number" value = {this.state.score_matrix.ta} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ta")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tt} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tt")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tc")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.tg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tg")}} /></td>
        </tr>
        <tr>
        <th>C</th>
        <td><input type="number" value = {this.state.score_matrix.ca} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ca")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.ct} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ct")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.cc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cc")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.cg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cg")}} /></td>
        </tr>
        <tr>
        <th>G</th>
        <td><input type="number" value = {this.state.score_matrix.ga} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ga")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gt} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gt")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gc} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gc")}} /></td>
        <td><input type="number" value = {this.state.score_matrix.gg} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gg")}} /></td>
        </tr>
       
        </table>
        
       

        </div>
        
       

         <input type = "submit" className = "submit-button" onClick = {()=>{submit_seqence(this.state.sequence1,
          this.state.sequence2,this.state.score_matrix,this.state.Alignment)}}/>
        </form>
    
     

      </div>
    );
  }
}

export default App;
