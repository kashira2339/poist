import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import interact from 'interact.js';
import { dragmove, resizemove } from '../listener';
import { findDOMNode } from 'react-dom';
import marked from 'marked';
import githubMarkdownCSS from 'github-markdown-css/github-markdown.css';
import icono from 'icono/dist/icono.min.css';
// import PoistBody from './PoistBody';
// import PoistEditor from './PoistEditor';

const btnClass = 'poist__btn poist__btn--icono';
const poistClass    = `poist ${githubMarkdownCSS['markdown-body']}`;
const closeBtnClass = `${btnClass} poist__btn--close ${icono['icono-trash']}`;
const editBtnClass  = `${btnClass} poist__btn--edit ${icono['icono-rename']}`;

export default class Poist extends Component {
  componentDidMount() {
    const dom = findDOMNode(this);
    interact(dom)
      .draggable({
        onmove: dragmove,
        onend: (event) => {
          const target = event.target,
                x      = (parseFloat(target.dataset.x) || 0) + event.dx,
                y      = (parseFloat(target.dataset.y) || 0) + event.dy;
          this.moved(x, y);
        }
      })
      .resizable({
        edges: { left: false, right: true, bottom: true, top: false }
      })
      .on('resizemove', resizemove)
      .on('resizeend', (event) => {
        let w      = event.x0,
            h      = event.y0;
        this.resized(w, h);
      });
  }
  moved(x, y) {
    this.props.move(this.props.poist.id, x, y);
  }
  resized(w, h) {
    this.props.resize(this.props.poist.id, w, h);
  }
  handleChange(event) {
    this.props.onChange(this.props.poist.id, event.target.value);
  }
  toggleEditor() {
    this.props.toggleEditor(this.props.poist.id);
  }
  render() {
    const poistStyles = {
      top   : this.props.poist.y,
      left  : (this.props.poist.showEditor ? this.props.poist.x*2 : this.props.poist.x),
      width : this.props.poist.width,
      height: this.props.poist.height
    };
    const Editor = this.props.poist.showEditor ? 
        <Textarea
          className='poist__editor'
          value={ this.props.poist.value }
          onChange={ this.handleChange.bind(this) }>
        </Textarea> : null;
    const bodyClass = this.props.poist.showEditor ?
            'poist__body poist__body--half' :
            'poist__body';
    return(
      <div className={ poistClass } styles="{ poistStyles }">
        <div className='poist__header'>
          <a>
            <i className={ closeBtnClass }></i>
          </a>
          <a onClick={ this.toggleEditor.bind(this)}>
            <i className={ editBtnClass }></i>
          </a>
        </div>
        { Editor }
        <div className={ bodyClass } dangerouslySetInnerHTML={{__html: marked(this.props.poist.value) }}>
        </div>
      </div>
    );
  }
}
