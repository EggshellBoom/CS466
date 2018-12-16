
import React, { Component } from 'react';
import { TimelineMax } from "gsap";
import './App.css';
import Recurrence from './Recurrence.js'
import BacktraceAnim from "./BacktraceAnim.js"

class FinalAlignment extends Component {
    constructor(props) {
      super(props);
      this.myElement = null;
      // reference to the animation
      this.myTween = null;
      this.state = {
          Alignment1:Array(50).fill(""),
          Alignment2:Array(50).fill(""),
          finished:false
         
      };
  }

  componentDidMount(){
    // use the node ref to create the animation
    this.myTween = new TimelineMax({repeat:-1})
    .from(this.myElement, 2, {rotation:"+=360"})
    .to(this.myElement, 2, {fontSize:100})

  }

  handleAlign = (val,x,y)=>{
      const{Alignment1,Alignment2} = this.state
      var new_alignment
      if(x===0){
        new_alignment = Alignment1
        new_alignment[y] = val
        this.setState({
            Alignment1:new_alignment
        })
      }

      if(x===1){
        new_alignment = Alignment2
        new_alignment[y] = val
        this.setState({
            Alignment2:new_alignment
        })
      }

  }

  seqencecheck(sequence1,sequence2){
    var i
    var j 
    console.log(sequence1,sequence2)
    for(i = 0; i<sequence1.length; i++){

      if(sequence1[i] !== sequence2[i]){
        console.log(sequence1[i],sequence2[j])
        return false
      }
    
       
      }

      return true

    }
   
  



  check = () =>{
    const{ans_Alignment1,ans_Alignment2} = this.props
    const{Alignment1,Alignment2} = this.state
    
    if(this.seqencecheck(ans_Alignment1,Alignment1) && this.seqencecheck(ans_Alignment2,Alignment2)){
     
      alert("Congrats!!!!")
      return true
    }

    if(this.seqencecheck(ans_Alignment1,Alignment2) && this.seqencecheck(ans_Alignment2,Alignment1)){
      
      alert("Congrats!!!!")
      return true
    }

    alert("Wrong!")
    return false




  }


  handleSubmit = () =>{
    if(this.check()){
      // this.props.submitFinal()
      console.log("checked")
      this.setState({
        finished:true
      })
    }

  }

  
   
    render() {
      const{Alignment,ans_Alignment1,sequence1,sequence2} = this.props
      const{dp_table,clicked} = this.props
  
      const title_list =sequence1.flat()
      const subtable_title = title_list.map((sq1)=>
        <th>{sq1}</th>
      );


      const AlignmentTable = ans_Alignment1.map((cell,idx)=>
        <div className = "Alignment">
        <select  onChange={(e) => {this.handleAlign(e.target.value,0,idx)}}>
        <option>  </option>
        <option> C </option>
        <option> A </option>
        <option> G </option>
        <option> T </option>
        <option>---</option>
        </select>

        <select  onChange={(e) => {this.handleAlign(e.target.value,1,idx)}}>
        <option>  </option>
        <option> C </option>
        <option> A </option>
        <option> G </option>
        <option> T </option>
        <option>---</option>
        </select>
        </div>
      )
  
    
      
  
      const table = clicked.map((row, x) => 
        <tr>
          <th>{sequence2[x]}</th>
          {row.map((cell,y)=>
          <td><BacktraceAnim clicked = {clicked[x][y]} val = {dp_table[x][y]}/></td>
          )}
  
        </tr>
  
  
      );
  
      return (
        <div className="App">
         <div  className= {this.state.finished ? "":"hidden"} ref={div => this.myElement = div} > <h1>Great Work!!</h1>  </div>
         <div  className= {!this.state.finished ? "":"hidden"}>
          <h3>Step6: Final Alignment</h3>
          <h2> {Alignment}</h2>
          <h5>Give the final Alignment according to the BackTrace</h5>
          <div className = "divider_1">
          <div className = "divider">
          <Recurrence Alignment = {Alignment}/>
         
          </div>
         <div className = "Alignmentdivider_1">   
          <table>
            <tr>
            {subtable_title}
            </tr>
            {table}
          </table>
            <div>
            <div className = "Alignmentdivider">   
            {AlignmentTable}
            </div>
            <button onClick = {this.handleSubmit}>Submit</button>
            </div>
          </div>
          <div>

          </div>
        
          </div>
          </div>
  
        </div>
      
       
  
        
      );
    }
  }

export default FinalAlignment;