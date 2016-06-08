import React, { Component } from 'react';

export default class PoistEditor extends Component {
  render() {
    return(
      <textarea className='poist__edit'>
        { this.props.value }
      </textarea>
    );
  }
}
