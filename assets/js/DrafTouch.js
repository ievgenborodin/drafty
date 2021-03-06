import $ from 'jquery';
import { sideBar, topBar, bottomControl } from './src/layout';
import { setCanvasSize, clrscr } from './src/common';
import { brushEvents, sizeEvents, colorEvents, eraserEvents, extras, sliderEvents }from './src/events';


class DrafTouch {
  
  constructor(rootElement) {
    this.rootElement = rootElement;
  }
  
  render() {

  	// define html 
    let html = `
      <div id="app" class="manual-mode">

        <div class="drawing-area">
          <span id="eraser"></span>
          <canvas id="canvas">Canvas is not supported</canvas>
        </div>
        
        ${topBar()}          

        <div class="sidebar-wrap" id="sidebar">
          ${sideBar()}
        </div>
        
        ${bottomControl()}

      </div>
    `;

    this.rootElement.innerHTML = html;
    
    $(function(){

      var canvas = $('#canvas'),

      ui = {
        canvas: canvas,
        app: $('#app'),
        context: canvas[0].getContext('2d'),
        eraser: $('#eraser'),
        currentColor: $('#current-color'),
        colorHolder: $('#color-holder'),
        colorPointer: $('#color-pointer'),
        sizeHolder: $('#size-holder'),
        sizePointer: $('#size-pointer'),
        saveBtn: $('#save-btn'),
        newPageBtn: $('#new-page-btn'),
        sideBarEl: $('#sidebar'),
        slider: $('#bottom-slider'),
        sliderWrap: $('#bottom-control-wrap'),
        buttons: $('.round-button:not(#current-color-wrap)')
      },

      settings = {
        pages: [],
        currentPage: 0,
        
        coloring: false,
        erasing: false,
        sizing: false,
        drawing: false,
        manualMode: false,
        isSlider: false,

        color: '#59ff00', 
        brushSize: 7, 
        
        loc0: {}, loc: {}, locPrev: {}, 
        locSize: {}
      };

      // init size pointer position
      let bb = ui.sizeHolder[0].getBoundingClientRect();
      ui.sizePointer.css({bottom: `${~~(bb.height * settings.brushSize / 20)}px`});

      window.mousedown = 0;

      // set canvas size 
      setCanvasSize(ui, settings);
      $(window).resize(e => { setCanvasSize(ui, settings) }); 
      window.onorientationchange = function () {
        setCanvasSize(ui, settings);
      }
      ui.context.lineCap = "round";

      // set events
      brushEvents(ui, settings);
      sizeEvents(ui, settings);
      colorEvents(ui, settings);
      eraserEvents(ui, settings);
      extras(ui, settings);
      sliderEvents(ui, settings);

      // remove sidebar scroll event
      $('#sidebar').scroll(e=>{e.preventDefault(); e.stopPropagation(); return false; });

      // add white background
      clrscr(ui, settings);

      // save button
      ui.saveBtn.on('click', e => {
        $.post("etc/save.php", {
            data: ui.canvas[0].toDataURL("image/png")
        }, function (file) {
            window.location.href =  "etc/download.php?path=" + file
        });
      });
    });
  }
}

export default DrafTouch;