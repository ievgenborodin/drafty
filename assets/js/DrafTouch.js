import $ from 'jquery';
import { sideBar, topBar } from './src/layout';
import { setCanvasSize } from './src/common';
import { downEvent, moveEvent, upEvent }from './src/events';

class DrafTouch {
  
  constructor(rootElement) {
    this.rootElement = rootElement;
  }
  
  render() {

  	// define html 
    let html = `
      <div class="draftouch-wrap">
        <div>
          <span id="eraser"></span>
          
          ${topBar()} 
          
          ${sideBar()} 
        
          <canvas id="canvas">Canvas is not supported</canvas>
        </div>
      </div>
    `;

    this.rootElement.innerHTML = html;
    
    $(function(){

      var sessions = [],
          canvas = $('#canvas'),

      core = {
        canvas: canvas,
        context: canvas[0].getContext('2d'),
        draw: false
      },

      session = {
        color: '#f00', 
        brushSize: 1, 
        loc0: {},
        loc: {},  
        locPrev: {}
      };

      window.mousedown = 0;

      // set canvas size 
      setCanvasSize(core.canvas);

      // set brush events
      downEvent(core, session);
      moveEvent(core, session);
      upEvent(core, session);

    });
  }
}

export default DrafTouch;