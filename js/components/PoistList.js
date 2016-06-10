import React, { Component } from 'react';
import Poist from './Poist';

export default class PoistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poists: [
        { 
          id: 1,
          value: 'hogehoge',
          showEditor: false,
          x: 10,
          y: 10,
          width: 240,
          height: 160
        },
        { 
          id: 2,
          value: 'fugafuga',
          showEditor: false,
          x: 10,
          y: 10,
          width: 240,
          height: 160
        }
      ]
    };
  }
  move(id, x, y) {
    this.setState({
      poists: this.state.poists.map((poist) => {
        if (poist.id === id) {
          poist.x = x;
          poist.y = y;
          console.log(poist);
        }
        return poist;
      })
    });
  }
  resize(id, w, h) {
    this.setState({
      poists: this.state.poists.map((poist) => {
        if (poist.id === id) {
          poist.width = w;
          poist.height = h;
          console.log(poist);
        }
        return poist;
      })
    });
  }
  addPoist() {
    const newPoists = this.state.poists;
    newPoists.push({ id: 3, value: 'foobar' });
    this.setState(newPoists);
  }
  onChange(id, value) {
    this.setState({
      poists: this.state.poists.map((poist) => {
        if (poist.id === id) {
          poist.value = value;
        }
        return poist;
      })
    });
  }
  toggleEditor(id) {
    this.setState({
      poists: this.state.poists.map((poist) => {
        if (poist.id === id) {
          poist.showEditor = !poist.showEditor;
        }
        return poist;
      })
    });
  }
  removePoist(id) {
    this.setState({
      poists: this.state.poists.filter((poist) => poist.id !== id)
    });
  }
  render() {
    let poists = this.state.poists.map((poist) => {
      return <Poist
               poist={ poist }
               move={this.move.bind(this)}
               resize={this.resize.bind(this)}
               onChange={ this.onChange.bind(this) }
               toggleEditor={ this.toggleEditor.bind(this) }
               removePoist={ this.removePoist.bind(this) } />
    });
    return(
      <div className='poistList'>
        { poists }
      </div>
    );
  }
}
