import $ from 'jquery';
import { sideBar, topBar } from './src/layout';
import { setCanvasSize } from './src/common';
import { brushEvents, sizeEvents, colorEvents, eraserEvents }from './src/events';

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
        eraser: $('#eraser'),
        currentColor: $('#current-color'),
        colorHolder: $('#color-holder'),
        colorPointer: $('#color-pointer'),
        sizeHolder: $('#size-holder'),
        sizePointer: $('#size-pointer'),
        saveBtn: $('#save-btn'),
        drawing: false,
        sizing: false,
        coloring: false,
        erasing: false,
        pages: [],
        currentPage: 0
      },

      session = {
        tempColor: '',
        color: '#59ff00', 
        brushSize: 5, 
        loc0: {}, loc: {}, locPrev: {},
        locSize: {}
      };

      // init size pointer position
      let bb = core.sizeHolder[0].getBoundingClientRect();
      core.sizePointer.css({bottom: `${~~(bb.height * session.brushSize / 20)}px`});

      window.mousedown = 0;

      // set canvas size 
      setCanvasSize(core);
      $(window).resize(e => { setCanvasSize(core) }); 

      // set events
      brushEvents(core, session);
      sizeEvents(core, session);
      colorEvents(core, session);
      eraserEvents(core, session);

      core.saveBtn.on('click', e => {
        $.post("/draftouch/etc/save.php", {
            data: core.canvas[0].toDataURL("image/png")
        }, function (file) {
            window.location.href =  "/draftouch/etc/download.php?path=" + file
        });
      });
    });
  }
}

export default DrafTouch;