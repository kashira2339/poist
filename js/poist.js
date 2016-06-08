import interact from 'interact.js';
import marked   from 'marked';
import { dragmove, resizemove } from './listener';

const element = document.createElement('div');

interact(element)
  .draggable({ onmove: dragmove })
  .resizable({
    edges: { left: false, right: true, bottom: true, top: false },
    restrict: {
      elementRect: { left: 1, right: 1, top: 1, bottom: 1 }
    }
  }).on('resizemove', resizemove);

