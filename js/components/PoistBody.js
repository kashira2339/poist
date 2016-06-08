import React, { Component } from 'react';
import marked from 'marked';

export default class PoistBody extends Component {
  getContent() {
    return marked(this.props.text);
  }
  render() {
    return(
        <div className='poist__body' dangerouslySetInnerHTML={{__html: this.getContent()}}>
      </div>
    );
  }
}



