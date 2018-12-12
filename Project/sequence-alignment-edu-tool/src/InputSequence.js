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
          AA:1,
          AT:-1,
          AC:-1,
          AG:-1,
          TA:-1,
          TT:1,
          TC:-1,
          TG:-1,
          CA:-1,
          CT:-1,
          CC:1,
          CG:-1,
          GA:-1,
          GT:-1,
          GC:-1,
          GG:1,
          GAP:-1
        }
      };
  }
  
  handlescore = (val,key,key1) =>{
    const{score_matrix} = this.state
    score_matrix[key.toUpperCase()] = parseInt(val)
    score_matrix[key1.toUpperCase()] = parseInt(val)
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
                      sequence1_str:e.target.value.toUpperCase(),
                      sequence1:["","",e.target.value.toUpperCase().split("")].flat()
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
                      sequence2_str:e.target.value.toUpperCase(),
                      sequence2:["",e.target.value.toUpperCase().split("")].flat()
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
          <td><input type="number" value = {this.state.score_matrix.AA}  min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"AA","AA")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.AT} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"at","ta")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.AC} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ac","ca")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.AG} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ag","ga")}} /></td>
          </tr>
          <tr>
          <th>T</th>
          <td><input type="number" value = {this.state.score_matrix.TA} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ta","at")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.TT} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tt","tt")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.TC} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tc","ct")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.TG} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"tg","gt")}} /></td>
          </tr>
          <tr>
          <th>C</th>
          <td><input type="number" value = {this.state.score_matrix.CA} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ca","ac")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.CT} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ct","tc")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.CC} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cc","cc")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.CG} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"cg","gc")}} /></td>
          </tr>
          <tr>
          <th>G</th>
          <td><input type="number" value = {this.state.score_matrix.GA} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"ga","ag")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.GT} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gt","tg")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.GC} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gc","cg")}} /></td>
          <td><input type="number" value = {this.state.score_matrix.GG} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"gg","gg")}} /></td>
          </tr>
          <tr>
          <th>GAP</th>
          <td></td>
          <td></td>
          <td></td>
          <td><input type="number" value = {this.state.score_matrix.GAP} min="-50" max="50" onChange={(e) => { this.handlescore(e.target.value,"GAP")}} /></td>
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