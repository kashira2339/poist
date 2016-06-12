import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import interact from 'interact.js';
import { dragmove, resizemove } from '../listener';
import { findDOMNode } from 'react-dom';
import marked from 'marked';
import githubMarkdownCSS from 'github-markdown-css/github-markdown.css';

const poistClass    = 'poist';
const markdownClass = githubMarkdownCSS['markdown-body'];

export default class Poist extends Component {
  static get propTypes() {
    return {
      poist: PropTypes.object.isRequired,
      editPoist: PropTypes.func.isRequired,
      removePoist: PropTypes.func.isRequired,
      movePoist: PropTypes.func.isRequired,
      resizePoist: PropTypes.func.isRequired,
      togglePoistEditor: PropTypes.func.isRequired
    };
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    const dom = findDOMNode(this);
    interact(dom)
      .draggable({
        onmove: dragmove,
        onend: (event) => {
          const target = event.target,
                x      = (parseFloat(target.dataset.x) || 0) + event.dx,
                y      = (parseFloat(target.dataset.y) || 0) + event.dy;
          target.dataset.x = null;
          target.dataset.y = null;
          target.style.transform = null;
          this.handleMoved(
            Number(target.offsetLeft) + event.dx,
            Number(target.offsetTop ) + event.dy
          );
        }
      })
      .resizable({
        edges: { left: false, right: true, bottom: true, top: false }
      })
      .on('resizemove', resizemove)
      .on('resizeend', (event) => {
        const rect = event.target.getBoundingClientRect();
        this.handleResized(rect.width, rect.height);
      });
  }
  handleMoved(x, y) {
    this.props.movePoist(this.props.poist.id, x, y);
    this.props.save();
  }
  handleResized(w, h) {
    this.props.resizePoist(this.props.poist.id, w, h);
    this.props.save();
  }
  handleEdit(id, event) {
    this.props.editPoist(id, event.target.value);
    this.props.save();
  }
  handleClickEdit(id) {
    this.props.togglePoistEditor(id);
    this.props.save();
  }
  handleClickClose(id) {
    this.props.removePoist(id);
    this.props.save();
  }
  render() {
    const { poist } = this.props;
    const poistStyles = {
      top   : poist.y,
      left  : poist.x,
      width : poist.width,
      height: poist.height
    };
    const Editor = poist.showEditor ? 
        <Textarea
          className='poist__editor'
          value={ poist.value }
          onChange={event => this.handleEdit( poist.id, event) }>
        </Textarea> : null;
    const bodyClass = poist.showEditor ?
            `${markdownClass} poist__body poist__body--half` :
            `${markdownClass} poist__body`;
    return(
      <div style={ poistStyles } className={ poistClass }>
        <div className='poist__header'>
          <a className='poist__btn poist__btn--close' onClick={ this.handleClickClose.bind(this, poist.id) }>
            close
          </a>
          <a className='poist__btn poist__btn--edit' onClick={ this.handleClickEdit.bind(this, poist.id) }>
            toggle
          </a>
        </div>
        { Editor }
        <div className={ bodyClass } dangerouslySetInnerHTML={{__html: marked(poist.value) }}>
        </div>
      </div>
    );
  }
}

