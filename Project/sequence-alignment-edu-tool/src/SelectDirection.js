import React, { Component } from 'react';
import './App.css';
import Recurrence from './Recurrence.js'
import DirectionAnim from './DirectionAnim.js'


class SelectDirection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        idx:Math.floor(Math.random()*5)
      };
  }
  
  handleSelect = (direction) =>{
      if(direction === "Right Down" || direction === "Down Right"){
          alert("Great, you got it correct! For dynamic programming, you should always start from the base case and go out the opposite direction as the recursion ")
          this.props.submit_direction()
        }

      else{
          alert("You are not correct. Click the question mark to see more info")
      }

  }
   
    render() {
      const{Alignment,sequence1,sequence2,DownRight,RightDown,UpLeft,LeftUp,RightUp,UpRight,DownLeft,LeftDown} = this.props
      const{dp_table} = this.state
  
   
  
      const LeftDown_table = LeftDown.map((row, x) => 
      <tr>
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {LeftDown[x][y]} max = {LeftDown.length * LeftDown[0].length}/>
       </td>
        )}
      </tr>
    );
  
  
      const DownLeft_table = DownLeft.map((row, x) => 
      <tr>
         
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {DownLeft[x][y]} max = {DownLeft.length * DownLeft[0].length}/>
       </td>
        )}
      </tr>
    );
  
      const UpRight_table = UpRight.map((row, x) => 
      <tr>
         
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {UpRight[x][y]} max = {UpRight.length * UpRight[0].length}/>
       </td>
        )}
      </tr>
    );
  
      const RightUp_table = RightUp.map((row, x) => 
      <tr>
         
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {RightUp[x][y]} max = {RightUp.length * RightUp[0].length}/>
       </td>
        )}
      </tr>
    );
  
      const LeftUp_table = LeftUp.map((row, x) => 
      <tr>
         
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {LeftUp[x][y]} max = {LeftUp.length * LeftUp[0].length}/>
       </td>
        )}
      </tr>
    );
     
      const DownRight_table = DownRight.map((row, x) => 
        <tr>
           
          {row.map((cell,y)=>
          <td>
          <DirectionAnim val = {DownRight[x][y]} max = {DownRight.length * DownRight[0].length}/>
         </td>
          )}
        </tr>
      );
  
      const RightDown_table = RightDown.map((row, x) => 
      <tr>
         
        {row.map((cell,y)=>
        <td>
        <DirectionAnim val = {RightDown[x][y]} max = {RightDown.length * RightDown[0].length}/>
       </td>
        )}
      </tr>
    );
  
    const UpLeft_table = UpLeft.map((row, x) => 
    <tr>
       
      {row.map((cell,y)=>
      <td>
      <DirectionAnim val = {UpLeft[x][y]} max = {UpLeft.length * UpLeft[0].length}/>
     </td>
      )}
    </tr>
    );
  
    var table_list = [UpLeft_table,LeftUp_table,RightUp_table,UpRight_table,DownLeft_table,LeftDown_table]
    
    
      return (
        <div className="App">
          <h3>Step3: Select the direction to fill out the table</h3>
          <h2> {Alignment}</h2>
          <h5>Consult the recurrence and the base case to find the flow to fill the table.</h5>
          <Recurrence Alignment = {Alignment}/>
          <div className = "divider">
         
  
  
  
          <div className = "divider_1">
          <table className = "directionTable">
            {RightDown_table}
          </table>
          <button onClick = {() => this.handleSelect("Right Down")}>Select</button>
          </div>
  
          <div className = "divider_1">
          <table className = "directionTable">
            {table_list[this.state.idx]}
          </table>
          <button onClick = {() => this.handleSelect("wrong")} >Select</button>
          </div>
  
  
          <div className = "divider_1">
          <table className = "directionTable">
            {DownRight_table}
          </table>
          <button onClick = {() => this.handleSelect("Down Right")}  >Select</button>
          </div>
  
      
          </div>
  
        </div>
      
       
  
        
      );
    }
  }

export default SelectDirection;