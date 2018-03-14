import $ from 'jquery';
import { sideBar, topBar } from './src/layout';
import { setCanvasSize } from './src/common';
import { brushEvents, sizeEvents, colorEvents }from './src/events';

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
        bwHolder: $('#blackwhite-holder'),
        colorHolder: $('#color-holder'),
        colorPointer: $('#color-pointer'),
        sizeHolder: $('#size-holder'),
        sizePointer: $('#size-pointer'),
        drawing: false,
        sizing: false,
        coloring: false
      },

      session = {
        color: '#f00', 
        brushSize: 5, 
        loc0: {}, loc: {}, locPrev: {},
        locSize: {},
        locColor: {}
      };

      // init size pointer position
      let bb = core.sizeHolder[0].getBoundingClientRect();
      core.sizePointer.css({bottom: `${~~(bb.height * session.brushSize / 20)}px`});

      window.mousedown = 0;

      // set canvas size 
      setCanvasSize(core.canvas);

      // set events
      brushEvents(core, session);
      sizeEvents(core, session);
      colorEvents(core, session);

    });
  }
}

export default DrafTouch;