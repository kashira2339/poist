import interact from 'interact.js';
import marked   from 'marked';
import { dragmove, resizemove } from './listener.js';

export default class Poist {
  constructor() {
    let _container  = document.createElement('div'),
        _header     = document.createElement('div'),
        _body       = document.createElement('pre'),
        _closeBtn   = document.createElement('a'),
        _bodyEditor = document.createElement('textarea');

    _container.classList.add('poist-container');
    _container.classList.add('clear-fix');
    _container.appendChild(_header);
    _container.appendChild(_body);

    _body.appendChild(_bodyEditor);

    interact(_container)
      .draggable({ onmove: dragmove })
      .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
      }).on('resizemove', resizemove);
    
    _closeBtn.classList.add('close-btn');
    _closeBtn.innerText = '×';
    _closeBtn.addEventListener('click', function() {
        _container.parentNode.removeChild(_container);
    });
    
    _header.classList.add('poist-header');
    _header.appendChild(_closeBtn);
    
    document.body.appendChild(_container);

    this.container = _container;
  }
}

class PrimaryPoist extends Poist{
}

class SuccessPoist extends Poist{
}

class WorningPoist extends Poist{
}

class DangerPoist extends Poist{
}

