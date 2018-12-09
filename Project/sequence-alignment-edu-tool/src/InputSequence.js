import React, { Component } from 'react';
import './App.css';

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


  
export default InputSequence;