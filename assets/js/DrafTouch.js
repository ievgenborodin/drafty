import $ from 'jquery';
import { sideBar, topBar } from './src/layout';

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

      var canvas = $('#canvas'),
          context = canvas[0].getContext('2d'),
          draw = false,
          color = '#f00', size=1, loc, loc0,

      Dot = function (x, y) {
        this.x = x;
        this.y = y;
      };

      window.mousedown = 0;

      // set canvas size 
      canvas.attr('width', window.innerWidth + 'px').attr('height', window.innerHeight + 'px');

      /*  /////    WINDOW TO CANVAS ///// */
      let wtc = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return { x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
      };

      /*  ////   DOWN     /// */ 
      canvas.on('touchstart', function(e) { 
        e.preventDefault(e); 
         loc0 = wtc(canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 

        downEvents();
       });
       canvas.on('mousedown', function(e) {   
        e.preventDefault(e); 
         loc0 = wtc(canvas[0],e.clientX,e.clientY); 
          
         downEvents();
       });

       function downEvents() {
        draw = true;
        context.strokeStyle = color;
        context.fillStyle = color;
        
        context.fillRect(loc0.x - size/2, loc0.y - size/2, size, size); 
        //for(var dot in this.dots){
        //    context.fillRect(dot.x - this.size/2, dot.y - this.size/2, this.size, this.size); 
        //}
       }

       /*  ////   MOVE     /// */ 
        canvas.on('touchmove', function(e) { 
          e.preventDefault(e); 
           loc = wtc(canvas[0],e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY); 
            
          moveEvents();
         });
         canvas.on('mousemove', function(e) {   
          e.preventDefault(e); 
           loc = wtc(canvas[0],e.clientX,e.clientY);
            
           moveEvents();
         });

         function moveEvents(){
            if (draw){
              context.fillRect(loc.x - size/2, loc.y - size/2, size, size); 
                //acts[acts.length-1].dots.push(new Dot(loc.x, loc.y));
            }  
        }

        /*  ////   UP     /// */ 
        canvas.on('touchend', function(e) { 
          e.preventDefault(e);
           
          upEvents();
        });

        canvas.on('mouseup', function(e) {  
          e.preventDefault(e);
              
           upEvents();
        });

        function upEvents(){
            draw = false;
            loc = {};
            loc0 = {};
        }
    });
  }
}

export default DrafTouch;