import React, { Component } from 'react';
import './App.css';


class ScoreMatrix extends Component {
    constructor(props) {
      super(props);
      this.state = {
        idx:Math.floor(Math.random()*5)
      };
  }
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
          <td><input type="number" value = {score_matrix.aa}  min="-50" max="50" readonly   /></td>
          <td><input type="number" value = {score_matrix.at} min="-50" max="50" readonly  /></td>
          <td><input type="number" value = {score_matrix.ac} min="-50" max="50" readonly   /></td>
          <td><input type="number" value = {score_matrix.ag} min="-50" max="50" readonly  /></td>
          </tr>
          <tr>
          <th>T</th>
          <td><input type="number" value = {score_matrix.ta} min="-50" max="50" readonly   /></td>
          <td><input type="number" value = {score_matrix.tt} min="-50" max="50" readonly   /></td>
          <td><input type="number" value = {score_matrix.tc} min="-50" max="50" readonly   /></td>
          <td><input type="number" value = {score_matrix.tg} min="-50" max="50" readonly  /></td>
          </tr>
          <tr>
          <th>C</th>
          <td><input type="number" value = {score_matrix.ca} min="-50" max="50" readonly  /></td>
          <td><input type="number" value = {score_matrix.ct} min="-50" max="50" readonly  /></td>
          <td><input type="number" value = {score_matrix.cc} min="-50" max="50" readonly  /></td>
          <td><input type="number" value = {score_matrix.cg} min="-50" max="50" readonly  /></td>
          </tr>
          <tr>
          <th>G</th>
          <td><input type="number" value = {score_matrix.ga} min="-50" max="50" readonly /></td>
          <td><input type="number" value = {score_matrix.gt} min="-50" max="50" readonly /></td>
          <td><input type="number" value = {score_matrix.gc} min="-50" max="50" readonly  /></td>
          <td><input type="number" value = {score_matrix.gg} min="-50" max="50" readonly   /></td>
          </tr>
          <tr>
          <th>Gap</th>
          <td></td>
          <td></td>
          <td></td>
          <td><input type="number" value = {score_matrix.gap} min="-50" max="50" readonly /></td>
          </tr>
         
          </table>
);
}

export default ScoreMatrix;