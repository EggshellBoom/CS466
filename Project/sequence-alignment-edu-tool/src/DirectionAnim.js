import { TimelineMax } from "gsap/all";
import React, { Component } from 'react';
import './App.css';

class DirectionAnim extends Component {
    constructor(props){
      super(props);
      // reference to the DOM node
      this.myElement = null;
      // reference to the animation
      this.myTween = null;
    }
  
    componentDidMount(){
      var val = this.props.val/5
      var max = this.props.max/5
      // use the node ref to create the animation
      this.myTween = new TimelineMax({ repeat:-1})
      .from(this.myElement, val, {})
      .to(this.myElement, 0.2, { color: "red" }) 
      .to(this.myElement, max-val, {}) 
      .to(this.myElement, 0.2, { color: "white" }) 
  
    }
  
    render(){
      return( 
        <div className="box">
        {/* <button  onClick={() => this.myTween.play()}> Play </button> */}
        <div ref={div => this.myElement = div} > {this.props.val}  </div>
        </div>);
    }
  }

export default DirectionAnim;